package com.ssafy.semes.transition.model.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.semes.common.Directory;
import com.ssafy.semes.image.model.ImageEntity;
import com.ssafy.semes.image.model.ImageListResponseDto;
import com.ssafy.semes.image.model.ImageResponseDto;
import com.ssafy.semes.image.model.repository.ImageRepository;

@Service
public class TransitionServiceImpl implements  TransitionService {
	@Autowired
	ImageRepository imageRepository;
	static Directory[] dir = new Directory[]{Directory.BOLT_NORMAL,Directory.BOLT_LOST,Directory.BOLT_BROKEN,Directory.BOLT_AMBIGUE};

	@Override
	public List<ImageListResponseDto> findAll(){

		List<ImageListResponseDto> list = new ArrayList<>();

		String path;

		for (int i = 0; i < 4; i++) {
			path = dir[i].getPath();
			List<ImageEntity> images =  imageRepository.findByFileDir(path);

			List<ImageResponseDto> imageResponseDtoList =
				images.stream().map(m ->
					 ImageResponseDto.builder()
						.fileId(m.getFileId())
						.imgUrl(m.getFileDir()+ File.separator+m.getSaveName())
						.originName(m.getOriginName()).build()
				).collect(
					Collectors.toList());

			list.add(ImageListResponseDto.builder()
				.images(imageResponseDtoList)
				.status(i)
				.build());
		}

		return list;
	}
}
