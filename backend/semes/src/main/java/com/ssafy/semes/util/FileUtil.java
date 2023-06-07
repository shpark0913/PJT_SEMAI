package com.ssafy.semes.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.semes.common.Directory;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class FileUtil{
	//서버 루트 디렉토리 경로
	static String pwd = System.getProperty("user.dir");
	//서버 배포 환경(OS)에 따른 기본 경로
	static String ROOT = pwd.equals(File.separator) ?
		new File(pwd).getPath().concat("dataset") :
		new File(new File(pwd).getParent()).getParent().concat(File.separator).concat("dataset");

	/**
	 * {@summary 원하는 위치에 볼트 클래스별 디렉토리 생성}
	 * 전달받은 이름의 폴더를 생성
	 * 하위 폴더로 볼트 클래스별 폴더 생성
	 * @param baseDir 하위 폴더 구조를 생성할 폴더의 이름
	 */
	static public void init(String baseDir) {
		mkdir(ROOT);
		String base = getBasePath(baseDir);
		mkdir(base);
		//볼트 클래스별 폴더이름 불러오가
		Directory[] subDirs = Directory.getSubDirectories();
		for (Directory dir:
			subDirs) {
			mkdir(base.concat(File.separator).concat(dir.getPath()));
		}
	}
	static public String getBasePath(String dir){
		return ROOT.concat(File.separator).concat(dir);
	}
	/**
	 * {@summary 파일 이름과 status에 따른 파일 위치}
	 * @param baseDir 파일이 저장된 상위 폴더
	 * @param subDir 파일이 저장된 하위 폴더
	 * @param filename 저장된 파일 이름
	 * @return 파일 경로
	 */
	static public String getFilePath(String baseDir,String subDir, String filename){
		return ROOT.concat(File.separator)
			.concat(baseDir).concat(File.separator)
			.concat(subDir).concat(File.separator)
			.concat(filename);
	}
	static public void mkdir(String dir){
		//폴더가 존재하지 않으면 새로 만들기
		File folder = new File(dir);
		if (!folder.exists()) {
			folder.mkdirs();
		}
	}
	/**
	 * {@summary 파일 생성}
	 * 원하는 위치에 이미지 파일을 저장한다.
	 * @param baseDir 이미지 관리 상태 (일반, 삭제, 학습용)에 따른 폴더 이름
	 * @param subDir 파일 저장할 하위 폴더 이름
	 * @param fileName 저장할 파일 이름
	 * @param file 저장할 파일 객체
	 * @return 저장된 파일 경로
	 */
	static public String createFile(String baseDir,String subDir, String fileName, MultipartFile file) throws IOException {
		String ext = getFileExtension(file);
		File dest = new File(getFilePath(baseDir,subDir,fileName.concat(".").concat(ext)));
		if (!dest.exists()) {
			try{

				dest.createNewFile();
			}catch (IOException e){
				log.error("Try to create ".concat(dest.getPath()));
				throw e;
			}
		}
		file.transferTo(dest);
		return dest.getName();
	}
	/**
	 * {@summary 파일 이동}
	 * 파일의 위치를 원하는 위치로 이동시킨다.
	 * @param baseDir 파일의 이전 상위 폴더
	 * @param subDir 파일의 이전 하위 폴더
	 * @param nextBaseDir 파일 이동 시키고자 하는 상위 폴더
	 * @param nextSubDir 파일 이동 시키고자 하는 하위 폴더
	 * @param fileName 이동시키려고하는 파일 이름
	 */
	static public void moveFile(String baseDir,String subDir, String nextBaseDir,String nextSubDir, String fileName)throws IOException {

			File file =new File(getFilePath(baseDir,subDir,fileName));
			File dest =new File(getFilePath(nextBaseDir, nextSubDir, fileName));

			if (file.exists()) {
				Path filePath = Paths.get(file.getPath());
				Path filePathToMove = Paths.get(dest.getPath());
				Files.move(filePath, filePathToMove);

			} else {
				throw new FileNotFoundException("파일이 존재하지 않습니다. file: "+file.getPath()+" dest: "+dest.getPath());
			}
	}
	/**
	 * {@summary 파일 확장자}
	 * MultipartFile 객체의 확장자를 반환한다.
	 * @param file 확장자를 알고 싶은 파일 객체
	 * @return 파일 확장자
	 */

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
