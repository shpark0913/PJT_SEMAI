package com.ssafy.semes.oht.model.service;

import java.util.List;

import com.ssafy.semes.oht.model.OHTEntity;
import com.ssafy.semes.oht.model.OHTRequestDto;
import com.ssafy.semes.oht.model.OHTResponseDto;

public interface OHTService {
	public OHTEntity saveOHT(OHTRequestDto ohtRequestDto);
	public List<OHTResponseDto> getAllOHT();
	public OHTResponseDto getOHT(String ohtSN);

}
