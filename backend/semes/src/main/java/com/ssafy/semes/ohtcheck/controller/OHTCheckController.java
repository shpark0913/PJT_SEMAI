package com.ssafy.semes.ohtcheck.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.ssafy.semes.common.ErrorCode;
import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.common.WheelPosition;
import com.ssafy.semes.common.dto.ApiResponse;
import com.ssafy.semes.dashboard.controller.DashboardController;
import com.ssafy.semes.dashboard.model.ProcessStatusDto;
import com.ssafy.semes.dashboard.model.SseEmitters;
import com.ssafy.semes.image.model.service.ImageService;
import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;
import com.ssafy.semes.ohtcheck.model.service.OHTCheckService;
import com.ssafy.semes.report.model.AnomalyEntity;
import com.ssafy.semes.report.model.AnomalyWheelDTO;
import com.ssafy.semes.report.model.ReportListResponseDto;
import com.ssafy.semes.report.model.repository.AnomalyRepository;
import com.ssafy.semes.report.model.service.ReportService;
import com.ssafy.semes.util.FileNameUtil;
import com.ssafy.semes.util.SlackController;
import com.ssafy.semes.wheelcheck.model.WheelCheckEntity;
import com.ssafy.semes.wheelcheck.model.service.WheelCheckService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("ohtcheck")
@Slf4j
public class OHTCheckController {
	@Autowired
	OHTCheckService ohtCheckService;
	@Autowired
	ImageService imageService;
	@Autowired
	WheelCheckService wheelCheckService;
	@Autowired
	SseEmitters sseEmitters;
	@Autowired
	SlackController slackController;
	@Autowired
	ReportService reportService;
	@Autowired
	AnomalyRepository anomalyRepository;

	@Value("${Ai-Api-Server-Ip}")
	private String ip;

	/**
	 * {@summary OHT 검사 시작 API}
	 * OHT 휠 이미지 4장을 입력 받아 AI 서버를 통해 진단한다.
	 * 각 바퀴에 대한 검사가 끝날 때마다 Serve Side Event 를 전달한다.
	 * 전체 검사가 완료 됐을 때 검사 기록에 end date를 저장한다.
	 * @param ohtSn 검사를 진행할 OHT의 시리얼 넘버,
	 * @param files 검사를 진행할 바퀴 이미지(전후방,좌우 바퀴 4개)
	 * @return OHT S/N, OHT ID 정보반환
	 */
	@PostMapping("/{ohtSn}")
	public ApiResponse<?> checkOht(@PathVariable String ohtSn, MultipartFile[] files){
		log.info("OHTCheckController checkOht start");
		System.out.println(files[0].toString());
		//OHT 검사기록 생성
		OHTCheckEntity ohtCheck;
		try {
			ohtCheck = ohtCheckService.createOhtCheck(ohtSn);
		}catch (Exception e){
			//OHT Serial No 가 존재 하지 않을때 예외
			e.printStackTrace();
			slackController.errorSend("OHTCheckController checkOht error INVALID_OHT_SERIAL_NO : "+e.getMessage());
			log.info("OHTCheckController checkOht error INVALID_OHT_SERIAL_NO");
			return ApiResponse.error(ErrorCode.INVALID_OHT_SERIAL_NO);
		}

		//OHT 검사후 결과 저장을 위한 이미지 파일 이름 객체 생성
		FileNameUtil ohtFileName = new FileNameUtil(ohtSn);

		//OHT 검사 현황 : 바퀴별 검사 여부 전송위한 DTO
		ProcessStatusDto processStatusDto = ProcessStatusDto.builder()
				.ohtSn(ohtSn)
				.isProceeding(true)
				.isWheelsProceeding(new boolean[4]).build();

		List<AnomalyWheelDTO> wheelAgg = new ArrayList<>();
		List<AnomalyEntity> ano = new ArrayList<>();
		//바퀴 별 처리
		for (int i=0;i<4;i++) {
			MultipartFile file = files[i];
			try {
				//바퀴 검사 진행
				WheelCheckEntity wheelCheckEntity = wheelCheckService.checkWheel(file,ohtFileName, WheelPosition.values()[i],ohtCheck);
				ReportListResponseDto reportDetail  = reportService.findReportDetail(wheelCheckEntity.getWheelHistoryId());
				wheelAgg.add(AnomalyWheelDTO.builder()
						.wheel_id(reportDetail.getOhtSn())
						.lost(reportDetail.getTotalOutCount())
						.broken(reportDetail.getTotalLoseCount())
						.loose(reportDetail.getTotalLooseCount())
						.build());

				ano.add(AnomalyEntity.builder().ohtSn(reportDetail.getOhtSn())
						.wheelCheckId(reportDetail.getWheelCheckId())
						.totalLooseCount(reportDetail.getTotalLooseCount())
						.totalLoseCount(reportDetail.getTotalLoseCount())
						.totalGoodCount(reportDetail.getTotalGoodCount())
						.totalOutCount(reportDetail.getTotalOutCount())
						.wheelPosition(reportDetail.getWheelPosition())
						.build());
			}catch (ConnectException e){
				//
				log.info("OHTCheckController checkOht error AI server 오류");
				return ApiResponse.error(ErrorCode.AI_SERVER_CONNECTION_ERROR);
			} catch (IOException | InterruptedException e) {
				slackController.errorSend("OHTCheckController checkOht error checkWheel :"+e.getMessage());
				log.info("OHTCheckController checkOht error checkWheel");
				throw new RuntimeException(e);
			} catch (Exception e) {
				log.info("OHTCheckController checkOht error");
				throw new RuntimeException(e);
			}
			// 끝날 때마다 검사상태 SSE로 보내주기
			slackController.successSend(processStatusDto.getOhtSn()+"번 OHT "+i+"번 바퀴 검사 완료");
			processStatusDto.wheelComplete(i);
			DashboardController.nowNum = i;
			sseEmitters.showProcessStatus(processStatusDto);
		}
		String json = new Gson().toJson(wheelAgg);
		try {
			URL url = new URL("http://"+ip+":8000/anomaly");
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("POST");
			con.setRequestProperty("Content-Type","applicaiton/json;utf-8");
			con.setRequestProperty("Accept","application/json");
			con.setDoOutput(true);
			try(OutputStream os = con.getOutputStream()){
				byte[] input = json.getBytes("utf-8");
				os.write(input, 0, input.length);
			}
			try(BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(),"utf-8"))){
				StringBuilder response = new StringBuilder();
				String responseLine;
				while((responseLine = br.readLine()) != null){
					response.append(responseLine.trim());
				}
				Gson gson = new Gson();
				ApiResponse map;
				map = gson.fromJson(response.toString(),ApiResponse.class);
				StringTokenizer st = new StringTokenizer(map.getData().toString(),"{=, }");
				int temp;
				for(int i = 0 ; i < 4; i++){
					st.nextToken();
					temp =(int) Double.parseDouble(st.nextToken());
					ano.get(i).setAnomalyFlag((int) temp);
				}

				anomalyRepository.saveAll(ano);
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

		// 검사 종료 후 종료시간 엄데이트
		ohtCheckService.updateOhtCheckEndDate(ohtCheck);
		slackController.successSend(processStatusDto.getOhtSn()+"번 OHT 검사 종료");
		return ApiResponse.success(SuccessCode.CHECK_OHT_COMPLETE);
	}
}
