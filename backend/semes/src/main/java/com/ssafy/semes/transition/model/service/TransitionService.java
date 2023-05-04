package com.ssafy.semes.transition.model.service;


import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.semes.image.model.ImageListResponseDto;
import com.ssafy.semes.transition.model.TransitionFileIdsDto;
import com.ssafy.semes.transition.model.TransitionUpdateRequestDto;

@Service
public interface TransitionService {
	List<ImageListResponseDto> findAll();

	void moveFiles(TransitionUpdateRequestDto requestDto) throws IOException;
	void deleteFiles(TransitionFileIdsDto requestDto) throws  IOException;
	void moveToTrainFiles(TransitionFileIdsDto requestDto) throws IOException;

	@Transactional
	void startTrain();
}
