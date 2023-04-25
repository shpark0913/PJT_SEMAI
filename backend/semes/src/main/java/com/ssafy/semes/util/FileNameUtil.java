package com.ssafy.semes.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FileNameUtil {
	private String ohtBaseName;
	private int wheelPosition = -1;
	static private String[] positions = new String[]{"FL","FR","RL","RR"};

	public FileNameUtil(String ohtSn){
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HHmmss");
		String formattedDateTime = now.format(formatter);

		ohtBaseName = new String(formattedDateTime).concat("_").concat(ohtSn);
	};
	public String getFilename() {
		StringBuilder filename = new StringBuilder(ohtBaseName);
		if(wheelPosition > -1){
			filename.append("_").append(positions[wheelPosition]);
		}
		return filename.toString();
	}

}
