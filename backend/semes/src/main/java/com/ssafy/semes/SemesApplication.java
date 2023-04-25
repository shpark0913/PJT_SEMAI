package com.ssafy.semes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SemesApplication {
	public static void main(String[] args) {
		SpringApplication.run(SemesApplication.class, args);
	}
}
