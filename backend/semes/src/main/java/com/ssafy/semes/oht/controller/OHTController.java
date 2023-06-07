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
	/**
	 * {@summary OHT 전체 목록조회}
	 * 등록된 모든 OHT 호기를 조회한다.
	 * @param
	 * @return OHT S/N, OHT ID 정보반환
	 */
	public ApiResponse<?> getAllOHT(){
		log.info("OHTController getAllOHT start");

		List<OHTResponseDto> ohts =ohtService.getAllOHT();

		return ApiResponse.success(SuccessCode.READ_OHT,ohts);
	}
	/**
	 * {@summary OHT 상세정보 조회}
	 * ohtSN로 OHT 호기를 조회한다.
	 * @param ohtSN 조회할 OHT의 시리얼 넘버
	 * @return OHT 정보반환
	 */
	@GetMapping("/{ohtSN}")
	public ApiResponse<?> getByOHTSN(@PathVariable String ohtSN){
		OHTResponseDto oht =ohtService.getOHT(ohtSN);
		return ApiResponse.success(SuccessCode.READ_OHT,oht);
	}
	/**
	 * {@summary OHT 등록}
	 * 새로운 OHT를 추가 등록한다.
	 * @param ohtRequest OHT 시리얼 넘버를 포함한 요청 바디
	 * @return OHT 등록 성공 여부
	 */

	@PostMapping
	public ApiResponse<?> saveOHT(@RequestBody OHTRequestDto ohtRequest){
		OHTEntity savedOHT = ohtService.saveOHT(ohtRequest);
		return ApiResponse.success(SuccessCode.CREATE_OHT,savedOHT);
	}

}
