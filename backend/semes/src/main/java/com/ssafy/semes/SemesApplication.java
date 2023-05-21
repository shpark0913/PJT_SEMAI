package com.ssafy.semes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

import com.ssafy.semes.common.Directory;
import com.ssafy.semes.util.FileUtil;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class SemesApplication {
	public static void main(String[] args) {
		// 파일 저장 위한 폴더 초기화
		FileUtil.init(Directory.BASE.getPath());
		FileUtil.init(Directory.ARCHIVE.getPath());

		SpringApplication.run(SemesApplication.class, args);
	}
}
