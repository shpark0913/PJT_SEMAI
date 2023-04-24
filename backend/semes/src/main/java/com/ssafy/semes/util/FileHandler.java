package com.ssafy.semes.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import javax.xml.bind.DatatypeConverter;

import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class FileHandler {
	static String BASE_PATH = "C:" + File.separator + "dataset" + File.separator;
	static boolean baseChecked = false;

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
		String ext = inputFile.getOriginalFilename().split(".")[1];
		String dest = sb.append(filename).append('.').append(ext).toString();

		File file = new File(dest);
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
			return false;
		}
	}

	static public String getUniqueFileName(String originName) {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String formattedTime = new SimpleDateFormat("yyyy-MM-dd hh:m:ss").format(timestamp);

		MessageDigest md = null;
		try {
			md = MessageDigest.getInstance("SHA-256");
		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		}

		String uniqueString = originName + formattedTime;
		byte[] digest = md.digest(originName.getBytes(StandardCharsets.UTF_8));
		String sha256 = DatatypeConverter.printHexBinary(digest).toLowerCase();

		return sha256;
	}

	static public void initBasePath() {
		File file = new File(BASE_PATH);
		if (!file.exists()) {
			baseChecked = file.mkdirs();
			return;
		}
		baseChecked = true;
		return;
	}

}
