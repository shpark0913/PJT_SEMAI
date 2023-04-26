package com.ssafy.semes.transition.model.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.semes.image.model.ImageListResponseDto;

@Service
public interface TransitionService {
	List<ImageListResponseDto> findAll();
}
