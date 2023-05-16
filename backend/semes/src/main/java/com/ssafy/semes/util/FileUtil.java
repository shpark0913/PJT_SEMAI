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
	static String pwd = System.getProperty("user.dir");
	static String ROOT = pwd.equals(File.separator) ?
		new File(pwd).getPath().concat("dataset") :
		new File(new File(pwd).getParent()).getParent().concat(File.separator).concat("dataset");
	static public void init(String baseDir) {
		mkdir(ROOT);
		String base = getBasePath(baseDir);
		mkdir(base);
		Directory[] subDirs = Directory.getSubDirectories();
		for (Directory dir:
			subDirs) {
			mkdir(base.concat(File.separator).concat(dir.getPath()));
		}
	}
	static public String getBasePath(String dir){
		return ROOT.concat(File.separator).concat(dir);
	}
	static public String getFilePath(String baseDir,String subDir, String filename){
		return ROOT.concat(File.separator)
			.concat(baseDir).concat(File.separator)
			.concat(subDir).concat(File.separator)
			.concat(filename);
	}
	static public void mkdir(String dir){
		File folder = new File(dir);
		if (!folder.exists()) {
			folder.mkdirs();
		}
	}
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
