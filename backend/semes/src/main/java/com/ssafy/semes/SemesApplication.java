package com.ssafy.semes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class SemesApplication {
	public static void main(String[] args) {
		// try {
		// 	FileUtil.init(Directory.BASE.getPath());
		// 	FileUtil.init(Directory.ARCHIVE.getPath());
		// 	FileUtil.init(Directory.TRAIN.getPath());
		//
		// } catch (IOException e) {
		// 	throw new RuntimeException(e);
		// }

		SpringApplication.run(SemesApplication.class, args);
	}
}
