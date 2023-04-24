package com.ssafy.semes.ohtcheck.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.semes.common.ErrorCode;
import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.common.dto.ApiResponse;
import com.ssafy.semes.image.model.service.ImageService;
import com.ssafy.semes.ohtcheck.model.service.OHTCheckService;
import com.ssafy.semes.util.FileUtil;
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

	@PostMapping("/{ohtSn}")
	public ApiResponse<?> checkOht(@PathVariable String ohtSn, MultipartFile[] files, @RequestHeader("accesstoken") String accessToken ){
		log.info("OHTCheckController checkOht start");
		//OHT 검사기록 생성
		try {
			ohtCheckService.createOhtCheck(ohtSn);
		}catch (Exception e){
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INVALID_OHT_SERIAL_NO);
		}

		boolean normal = true;
		String baseName = FileUtil.getWheelFileName(ohtSn);
		//바퀴 별 처리

		for (int i=0;i<4;i++) {
			MultipartFile file = files[i];
			try {
				wheelCheckService.checkWheel(file,baseName,i);
			} catch (IOException e) {
				log.info("OHTCheckController checkOht wheelCheckService.checkWheel check error");
				throw new RuntimeException(e);
			}
			System.out.println(file.getOriginalFilename());
		}



		return ApiResponse.success(SuccessCode.CREATE_FILE);
	}
}
