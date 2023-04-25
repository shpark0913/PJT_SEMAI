package com.ssafy.semes.wheelcheck.model.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;
import com.ssafy.semes.util.FileNameUtil;
import com.ssafy.semes.wheelcheck.model.WheelCheckEntity;

public interface WheelCheckService {
	WheelCheckEntity checkWheel(MultipartFile file, FileNameUtil fileNameUtil,int wheelPosition, OHTCheckEntity ohtCheck) throws
		IOException,
		InterruptedException;
}
