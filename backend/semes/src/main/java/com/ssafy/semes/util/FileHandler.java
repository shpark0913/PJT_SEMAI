package com.ssafy.semes.util;

import java.io.File;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class FileHandler {
	static String BASE_PATH="C:"+ File.separator+"dataset"+"";
	static public void create(String dir,MultipartFile newFile) throws IOException {
		// directory 검사
		File path = new File(dir+ File.separator+newFile.getOriginalFilename());
		newFile.transferTo(path);
	}
	static public void delete(String dir, String fileName){
		File file = new File(BASE_PATH+File.separator+dir+ File.separator+fileName);

		if( file.exists() ){
			if(file.delete()){
				log.info("파일삭제 성공");
			}else{
				log.info("파일삭제 실패");
			}
		}else{
			log.error("파일이 존재하지 않습니다.");
		}
	}

}
