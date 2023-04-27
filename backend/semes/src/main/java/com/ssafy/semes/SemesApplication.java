package com.ssafy.semes;

import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

import com.ssafy.semes.util.FileUtil;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class SemesApplication {
	public static void main(String[] args) {
		// try {
		// 	FileUtil.init();
		// } catch (IOException e) {
		// 	throw new RuntimeException(e);
		// }
		SpringApplication.run(SemesApplication.class, args);
	}
}
