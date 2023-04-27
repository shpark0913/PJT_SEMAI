package com.ssafy.semes.transition.model.service;


import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.semes.image.model.ImageListResponseDto;
import com.ssafy.semes.transition.model.TransitionDeleteRequestDto;
import com.ssafy.semes.transition.model.TransitionUpdateRequestDto;

@Service
public interface TransitionService {
	List<ImageListResponseDto> findAll();

	void moveFiles(TransitionUpdateRequestDto requestDto) throws IOException;
	void deleteFiles(TransitionDeleteRequestDto requestDto) throws  IOException;
}
