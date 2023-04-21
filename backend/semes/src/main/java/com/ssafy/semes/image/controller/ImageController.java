package com.ssafy.semes.image.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.common.dto.ApiResponse;
import com.ssafy.semes.image.model.service.ImageService;
import com.ssafy.semes.util.FileHandler;

@RestController
@RequestMapping("/image")
public class ImageController {
	@Autowired
	ImageService imageService;
	@PostMapping
	public ApiResponse<?> saveImage(@RequestParam MultipartFile image) throws IllegalAccessError,
		IOException {
		FileHandler.create("class1",image);
		return 	ApiResponse.success(SuccessCode.CREATE_FILE);
	}
	@DeleteMapping
	public ApiResponse<?> deleteImage(@RequestParam String filename) throws IllegalAccessError{
		FileHandler.delete("class1",filename);

		return 	ApiResponse.success(SuccessCode.CREATE_FILE);
	}
}
