package com.ssafy.semes.oht.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.semes.common.dto.ApiResponse;

import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.oht.model.OHTEntity;
import com.ssafy.semes.oht.model.OHTRequestDto;
import com.ssafy.semes.oht.model.OHTResponseDto;
import com.ssafy.semes.oht.model.service.OHTService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/oht")
@Slf4j
public class OHTController {
	@Autowired
	OHTService ohtService;

	@GetMapping
	public ApiResponse<?> getAllOHT(){
		log.info("OHTController getAllOHT start");

		List<OHTResponseDto> ohts =ohtService.getAllOHT();

		return ApiResponse.success(SuccessCode.READ_OHT,ohts);
	}
	@GetMapping("/{ohtSN}")
	public ApiResponse<?> getByOHTSN(@PathVariable String ohtSN){
		OHTResponseDto oht =ohtService.getOHT(ohtSN);
		return ApiResponse.success(SuccessCode.READ_OHT,oht);
	}

	@PostMapping
	public ApiResponse<?> saveOHT(@RequestBody OHTRequestDto ohtRequest){
		OHTEntity savedOHT = ohtService.saveOHT(ohtRequest);
		return ApiResponse.success(SuccessCode.CREATE_OHT,savedOHT);
	}

}
