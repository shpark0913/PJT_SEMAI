package com.ssafy.semes.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class FileUtil {
	static String BASE_PATH = new String(new File( new File(System.getProperty("user.dir")).getParent()).getParent())
		.concat(File.separator).concat("semes_bolt").concat(File.separator);

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
		if (!file.exists()) {
			file.createNewFile();
		}

		//새파일 이동
		inputFile.transferTo(file);

		return new String(dir).concat(File.separator).concat(filename).concat(".").concat(ext);
	}

	static public boolean delete(String dir, String fileName) throws FileNotFoundException {
		File file = new File(BASE_PATH + File.separator + dir + File.separator + fileName);
		if (file.exists() && file.delete()) {
			return true;
		} else {
			throw new FileNotFoundException("파일이 존재하지 않습니다.");
		}
	}
	static  public void moveFile(String fileName, String fromDir, String toDir ) throws IOException {

		File file = new File(BASE_PATH + File.separator + fromDir + File.separator + fileName);
		File folder = new File(BASE_PATH + File.separator + toDir+ File.separator + fileName);

		if (file.exists()) {
			Path filePath = Paths.get(file.getPath());
			Path filePathToMove = Paths.get(folder.getPath());
			Files.move(filePath, filePathToMove);

		} else {
			throw new FileNotFoundException("파일이 존재하지 않습니다.");
		}
	}

	static public String getFileExtension(MultipartFile file) {
		String originalFileName = file.getOriginalFilename();
		if(originalFileName==null) return "";
		int dotIndex = originalFileName.lastIndexOf('.');
		if (dotIndex > 0) {
			return originalFileName.substring(dotIndex + 1);
		} else {
			return "";
		}
	}

}
