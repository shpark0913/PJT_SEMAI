package com.ssafy.semes.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class FileUtil {
	static String BASE_PATH = new StringBuilder(new File( new File(System.getProperty("user.dir")).getParent()).getParent())
		.append(File.separator).append("semes_bolts").append(File.separator).toString();
	static String[] position = new String[]{"FL","FR","RL","RL"};

	static public String create(String dir, String filename, MultipartFile inputFile) throws IOException {
		StringBuilder sb = new StringBuilder(BASE_PATH);
		// directory 검사
		String path = sb.append(dir).append(File.separator).toString();
		File folder = new File(path);
		if (!folder.exists()) {
			folder.mkdirs();
		}
		//file 생성
		sb = new StringBuilder(path);
		String ext = getFileExtension(inputFile);
		String dest = sb.append(filename).append('.').append(ext).toString();

		File file = new File(dest);
		System.out.println(dest);
		if (!file.exists()) {
			file.createNewFile();
		}

		//새파일 이동
		inputFile.transferTo(file);

		return dest;
	}

	static public boolean delete(String dir, String fileName) throws FileNotFoundException {
		File file = new File(BASE_PATH + File.separator + dir + File.separator + fileName);

		if (file.exists()) {
			if (file.delete()) {
				return true;
			} else {
				return false;
			}
		} else {
			FileNotFoundException e = new FileNotFoundException("파일이 존재하지 않습니다.");
			throw e;
		}
	}

	static public String getWheelFileName(String ohtSn) {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HHmmss");
		String formattedDateTime = now.format(formatter);

		return new StringBuilder(formattedDateTime).append("_").append(ohtSn).toString();
	}
	static public String getWheelFileNameWithPos(String baseName,int pos){
		return new StringBuilder(baseName).append("_").append(position[pos]).toString();
	}
	static public String getFileExtension(MultipartFile file) {
		String originalFileName = file.getOriginalFilename();
		int dotIndex = originalFileName.lastIndexOf('.');
		if (dotIndex > 0) {
			return originalFileName.substring(dotIndex + 1);
		} else {
			return "";
		}
	}
}
