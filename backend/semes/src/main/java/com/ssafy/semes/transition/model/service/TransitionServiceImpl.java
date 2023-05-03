package com.ssafy.semes.transition.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.semes.common.Directory;
import com.ssafy.semes.image.model.ImageEntity;
import com.ssafy.semes.image.model.ImageListResponseDto;
import com.ssafy.semes.image.model.ImageResponseDto;
import com.ssafy.semes.image.model.repository.ImageRepository;
import com.ssafy.semes.transition.model.TransitionFileIdsDto;
import com.ssafy.semes.transition.model.TransitionUpdateRequestDto;
import com.ssafy.semes.util.FileUtil;

@Service
public class TransitionServiceImpl implements  TransitionService {
	@Autowired
	ImageRepository imageRepository;

	@Override
	public List<ImageListResponseDto> findAll(){

		List<ImageListResponseDto> list = new ArrayList<>();

		String path;

		for (int i = 0; i < 4; i++) {
			path = Directory.getBoltDirectories()[i].getPath();
			List<ImageEntity> images =  imageRepository.findByFileDirAndStatus(path,1);

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

	@Override
	@Transactional
	public void moveFiles(TransitionUpdateRequestDto requestDto) throws IOException {
		Iterator<ImageEntity> iterator = getIteratorByFileIds(requestDto.getFileIds());
		//0-> BOLT_NORMAL,1->BOLT_LOST,2->BOLT_LOOSE,3->BOLT_AMBIGUE
		String nextDirectory = Directory.getBoltDirectories()[requestDto.getNextType()].getPath();

		while(iterator.hasNext()){
			ImageEntity image = iterator.next();
			FileUtil.moveFile(
				Directory.BASE.getPath(),image.getFileDir(),
				Directory.BASE.getPath(),nextDirectory,
				image.getSaveName()
			);
		}

		imageRepository.updateFileDirByFileIds(nextDirectory,requestDto.getFileIds());
	}

	@Override
	@Transactional
	public void deleteFiles(TransitionFileIdsDto requestDto) throws IOException {
		Iterator<ImageEntity> iterator = getIteratorByFileIds(requestDto.getFileIds());

		while(iterator.hasNext()){
			ImageEntity image = iterator.next();
			FileUtil.moveFile(
				Directory.BASE.getPath(),image.getFileDir(),
				Directory.ARCHIVE.getPath(),image.getFileDir(),
				image.getSaveName()
			);
		}

		imageRepository.updateStatusByFileIds(requestDto.getFileIds(),0);
	}
	@Override
	@Transactional
	public void moveToTrainFiles(TransitionFileIdsDto requestDto) throws IOException {
		Iterator<ImageEntity> iterator = getIteratorByFileIds(requestDto.getFileIds());

		while(iterator.hasNext()){
			ImageEntity image = iterator.next();
			FileUtil.moveFile(
				Directory.BASE.getPath(),image.getFileDir(),
				Directory.TRAIN.getPath(),image.getFileDir(),
				image.getSaveName()
			);
		}
		imageRepository.updateStatusByFileIds(requestDto.getFileIds(),2);
	}

	Iterator<ImageEntity> getIteratorByFileIds(Long[] fileIds){
		Iterable<Long> iterable = Arrays.asList(fileIds);

		List<ImageEntity> images = imageRepository.findAllById(iterable);
		return images.iterator();
	}

}
