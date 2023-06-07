package com.ssafy.semes.wheelcheck.model.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.semes.common.Directory;
import com.ssafy.semes.common.WheelPosition;
import com.ssafy.semes.image.model.ImageEntity;
import com.ssafy.semes.image.model.repository.ImageRepository;
import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;
import com.ssafy.semes.util.FileNameUtil;
import com.ssafy.semes.util.FileUtil;
import com.ssafy.semes.wheelcheck.model.WheelCheckEntity;
import com.ssafy.semes.wheelcheck.model.WheelCheckResultDto;
import com.ssafy.semes.wheelcheck.model.repository.WheelCheckRepository;

import lombok.RequiredArgsConstructor;
@Service
@Transactional
@RequiredArgsConstructor
@PropertySource("classpath:config.properties")
public class WheelCheckServiceImpl implements WheelCheckService {
	@Autowired
	WheelCheckRepository wheelCheckRepository;
	@Autowired
	ImageRepository imageRepository;
	@Value("${Ai-Api-Server-Ip}")
	private String ip;

	/**
	 * {@summary 개별 바퀴 검사 진행}
	 * 바퀴 원본 이미지를 저장 후 AI 서버를 통해 진단하고
	 * 그 결과를 저장한다.
	 * @param file 검사를 진행할 이미지 파일
	 * @param fileNameUtil 바퀴 이미지 파일 이름을 결정할 OHT 기반 파일 이름
	 * @param wheelPosition 바퀴 위치
	 * @param ohtCheck 현재 진행중임 OHT 검사 객체
	 * @return 생성된 바퀴 검사 객체
	 */
	public WheelCheckEntity checkWheel(MultipartFile file, FileNameUtil fileNameUtil, WheelPosition wheelPosition, OHTCheckEntity ohtCheck) throws
			IOException,
			InterruptedException {
		//바퀴 파일 생성
		fileNameUtil.setWheelPositionVal(wheelPosition.getVal());
		String savedFileName = FileUtil.createFile(Directory.BASE.getPath(),Directory.WHEEL_ORIGIN.getPath(),fileNameUtil.getFilename(),file);

		//바퀴 이미지로 요청
		WheelCheckResultDto result = WheelCheckResultDto.fromWheelImage(savedFileName,ip);
		if(result.getStatus() == 400){
			throw new IOException("잘못된 파일 명입니다.");
		}
		if(result.getData() == null ){
			throw new InterruptedException("Data가 없습니다.");
		}

		return saveResult(result,wheelPosition, ohtCheck);
	}

	@Transactional
	public WheelCheckEntity saveResult(WheelCheckResultDto wheelCheckResult,WheelPosition wheelPosition, OHTCheckEntity ohtCheck) throws
			IOException {

		if(wheelCheckResult.getData().getMarkedImage().equals("")){
			throw new IOException("마킹 이미지가 존재하지 않습니다.");
		}
		//마킹 이미지 저장
		String markedImagePath = wheelCheckResult.getData().getMarkedImage().split("/")[1];
		ImageEntity markedImage = imageRepository.save(ImageEntity.builder()
				.fileDir(Directory.WHEEL_RESULT.getPath())
				.originName(markedImagePath)
				.saveName(markedImagePath)
				.status(1)
				.build());

		//각 볼트 이미지 데이터 저장 및 결과 카운트
		String[] bolts = wheelCheckResult.getData().getBolts();
		int[] boltResults = saveBoltResults(bolts);

		//양불판정
		int checkResult = boltResults[1] > 0 || boltResults[2] >0 || boltResults[3] >0 ? 0 : 1;

		//결과 저장
		WheelCheckEntity wheelCheck = WheelCheckEntity.builder()
				.ohtCheck(ohtCheck)
				.image(markedImage)
				.checkResult(checkResult)
				.wheelPosition(wheelPosition.name())
				.boltGoodCount(boltResults[0])
				.boltOutCount(boltResults[1])
				.boltLoseCount(boltResults[2])
				.unclassifiedCount(boltResults[3])
				.build();
		return wheelCheckRepository.save(wheelCheck);
	}

	public int[] saveBoltResults(String[] bolts){
		int[] res = new int[4];

		for (String bolt:
				bolts) {
			//bolt 이미지 저장
			String[] path = bolt.split("/");
			imageRepository.save(ImageEntity.builder().fileDir(path[0]).originName(path[1]).saveName(path[1]).status(1).build());
			if(path[0].equals(Directory.BOLT_NORMAL.getPath())){
				res[0]++;
			}else if(path[0].equals(Directory.BOLT_LOST.getPath())){
				res[1]++;
			}else if(path[0].equals(Directory.BOLT_BREAK.getPath())){
				res[2]++;
			}else if(path[0].equals(Directory.BOLT_AMBIGUE.getPath())){
				res[3]++;
			}
		}
		return res;
	}

}
