package com.ssafy.semes;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.common.dto.ApiResponse;
import com.ssafy.semes.dashboard.controller.DashboardController;
import com.ssafy.semes.ohtcheck.controller.OHTCheckController;
import com.ssafy.semes.user.controller.UserController;
import com.ssafy.semes.user.model.UserRequestDto;
import com.ssafy.semes.user.model.UserResponseDto;
import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import java.nio.file.Paths;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@SpringBootTest
class SemesApplicationTests {

	String accesstoken;


	@Autowired
	UserController userController;
	@Autowired
	DashboardController dashboardController;
	@Autowired
	OHTCheckController ohtCheckController;

	@BeforeEach
	void UserLogin() throws IOException {
		UserRequestDto user = UserRequestDto.builder().userId("admin").userPwd("ssafy!1234").build();
		ApiResponse temp =userController.login(user);
		UserResponseDto usertemp = (UserResponseDto) temp.getData();
		accesstoken = usertemp.getAccesstoken();
		assertEquals(temp.getMessage(),SuccessCode.READ_USER_LOGIN.getMessage());
		assertNotEquals(null,accesstoken);
	}

	@Test
	void  DashBoardTest() throws Exception {
		assertEquals(dashboardController.connect().getStatusCode(), HttpStatus.OK);
		assertEquals(dashboardController.showMain(228).getMessage(),SuccessCode.READ_DASHBOARD_MAIN.getMessage());
		MultipartFile [] multipartFiles = new MultipartFile [4];
		for(int i =1;i<=4;i++){
			String name = "files";
			String originalFileName = i+".jpg";
			File file = Paths.get(System.getProperty("user.dir"), "src/test/"+originalFileName).toFile();
			FileInputStream input = new FileInputStream(file);
			String contentType = "image/jpg";
			multipartFiles[i-1] = new MockMultipartFile(name,
					file.getName(), contentType, IOUtils.toByteArray(input));
		}
		ohtCheckController.checkOht("P4",multipartFiles);
	}

	@Test
	void  o3(){
		System.out.println("3");
	}

	@Test
	void  o2(){
		System.out.println("2");
	}


}
