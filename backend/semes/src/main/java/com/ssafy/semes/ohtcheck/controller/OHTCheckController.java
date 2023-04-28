package com.ssafy.semes.ohtcheck.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.semes.common.ErrorCode;
import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.common.WheelPosition;
import com.ssafy.semes.common.dto.ApiResponse;
import com.ssafy.semes.dashboard.model.ProcessStatusDto;
import com.ssafy.semes.dashboard.model.SseEmitters;
import com.ssafy.semes.image.model.service.ImageService;
import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;
import com.ssafy.semes.ohtcheck.model.service.OHTCheckService;
import com.ssafy.semes.util.FileNameUtil;
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

	@PostMapping("/{ohtSn}")
	public ApiResponse<?> checkOht(@PathVariable String ohtSn, MultipartFile[] files){
		log.info("OHTCheckController checkOht start");
		//OHT 검사기록 생성
		OHTCheckEntity ohtCheck;
		try {
			ohtCheck = ohtCheckService.createOhtCheck(ohtSn);
		}catch (Exception e){
			e.printStackTrace();
			log.info("OHTCheckController checkOht error INVALID_OHT_SERIAL_NO");
			return ApiResponse.error(ErrorCode.INVALID_OHT_SERIAL_NO);
		}

		FileNameUtil ohtFileName = new FileNameUtil(ohtSn);

		ProcessStatusDto processStatusDto = ProcessStatusDto.builder()
			.ohtSn(ohtSn)
			.isProceeding(true)
			.isWheelsProceeding(new boolean[4]).build();

		//바퀴 별 처리
		for (int i=0;i<4;i++) {
			MultipartFile file = files[i];
			try {
				wheelCheckService.checkWheel(file,ohtFileName, WheelPosition.values()[i],ohtCheck);

			} catch (IOException | InterruptedException e) {
				log.info("OHTCheckController checkOht error checkWheel");
				throw new RuntimeException(e);
			}
			// 끝날 때마다 검사상태 SSE로 보내주기
			processStatusDto.wheelComplete(i);
			sseEmitters.showProcessStatus(processStatusDto);
		}
		ohtCheckService.updateOhtCheckEndDate(ohtCheck);
		return ApiResponse.success(SuccessCode.CHECK_OHT_COMPLETE);
	}
}
