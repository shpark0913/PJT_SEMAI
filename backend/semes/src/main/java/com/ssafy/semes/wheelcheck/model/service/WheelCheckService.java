package com.ssafy.semes.wheelcheck.model.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.semes.util.FileNameUtil;
import com.ssafy.semes.wheelcheck.model.WheelCheckResultDto;

public interface WheelCheckService {
	WheelCheckResultDto checkWheel(MultipartFile file, FileNameUtil fileNameUtil,int wheelPosition) throws IOException;
}
