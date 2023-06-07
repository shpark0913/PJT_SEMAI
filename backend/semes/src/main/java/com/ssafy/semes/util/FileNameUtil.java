package com.ssafy.semes.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FileNameUtil {
	private String ohtBaseName;
	private int wheelPositionVal = -1;

	public FileNameUtil(String ohtSn){
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		String formattedDateTime = now.format(formatter);

		ohtBaseName = ohtSn.concat("_").concat(formattedDateTime);
	}
	public String getFilename() {
		StringBuilder filename = new StringBuilder(ohtBaseName);
		if(wheelPositionVal > -1){
			filename.append("_").append(wheelPositionVal);
		}
		return filename.toString();
	}

}
