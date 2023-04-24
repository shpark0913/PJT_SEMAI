package com.ssafy.semes.wheelcheck.model.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.semes.common.Directory;
import com.ssafy.semes.util.FileUtil;
import com.ssafy.semes.wheelcheck.model.WheelCheckResultDto;
import com.ssafy.semes.wheelcheck.model.repository.WheelCheckRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class WheelCheckServiceImpl implements WheelCheckService {
	@Autowired
	WheelCheckRepository wheelCheckRepository;
	public WheelCheckResultDto checkWheel(MultipartFile file, String baseName,int pos) throws IOException {
		String filename = FileUtil.getWheelFileNameWithPos(baseName,pos);
		String originFilePath = FileUtil.create(Directory.WHEEL_ORIGIN.getPath(),filename,file);

		System.out.println("WheelCheckServiceImpl checkWheel originFilePath"+originFilePath);


		return WheelCheckResultDto.builder().build();
	}
}
