package com.ssafy.semes.image.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.semes.image.model.service.ImageService;

@RestController
@RequestMapping("/image")
public class ImageController {
	@Autowired
	ImageService imageService;
}
