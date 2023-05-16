package com.ssafy.semes.transition.model.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.semes.common.Directory;
import com.ssafy.semes.image.model.ImageEntity;
import com.ssafy.semes.image.model.ImageListResponseDto;
import com.ssafy.semes.image.model.ImageResponseDto;
import com.ssafy.semes.image.model.repository.ImageRepository;
import com.ssafy.semes.transition.model.TransitionConfig;
import com.ssafy.semes.transition.model.TransitionFileIdsDto;
import com.ssafy.semes.transition.model.TransitionLearningResultDto;
import com.ssafy.semes.transition.model.TransitionUpdateRequestDto;
import com.ssafy.semes.transition.model.repository.TransitionRepository;
import com.ssafy.semes.util.FileUtil;

@Service
@PropertySource("classpath:config.properties")
public class TransitionServiceImpl implements  TransitionService {
	@Autowired
	ImageRepository imageRepository;

	@Autowired
	TransitionRepository transitionRepository;

	@Value("${Ai-Api-Server-Ip}")
	private String ip;

	@Override
	public List<ImageListResponseDto> findAll(boolean isTrainSet){

		List<ImageListResponseDto> list = new ArrayList<>();

		String path;

		for (int i = 0; i < 3; i++) {
			path = Directory.getBoltListDirectories()[i].getPath();
			List<ImageEntity> images;
			if(isTrainSet){
				images= imageRepository.findTop100ByFileDirAndStatusOrderByFileIdDesc(path,2);
			}else{
				images= imageRepository.findTop100ByFileDirAndStatusOrderByFileIdDesc(path,1);
			}

			List<ImageResponseDto> imageResponseDtoList =
				images.stream().map(m ->
					 ImageResponseDto.builder()
						.fileId(m.getFileId())
						.imgUrl(m.markingUrl())
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
				Directory.getBaseDirectories()[image.getStatus()].getPath(),image.getFileDir(),
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

	@Override
	@Transactional
	public void startTrain(){
		//python에 전이학습 요청

		TransitionConfig tc = transitionRepository.findAll().get(0);
		System.out.println(tc);

		StringBuilder quertString = new StringBuilder("?");
		quertString.append("acc=").append(tc.getAccuracy()).append("&");
		quertString.append("loss=").append(tc.getLoss()).append("&");
		quertString.append("fscore=").append(tc.getFscore());

		try {
			TransitionLearningResultDto res = TransitionLearningResultDto.fromHttpGetRequest("http://"+ip+":8000/train".concat(quertString.toString()));
			System.out.println(res);
			if(res.getData().get("changed").equals("true")){
				tc.setAccuracy(Double.valueOf(res.getData().get("acc")));
				tc.setLoss(Double.valueOf(res.getData().get("loss")));
				tc.setFscore(Double.valueOf(res.getData().get("fscore")));
			}
		}catch (InterruptedException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

	}

	Iterator<ImageEntity> getIteratorByFileIds(Long[] fileIds){
		Iterable<Long> iterable = Arrays.asList(fileIds);

		List<ImageEntity> images = imageRepository.findAllById(iterable);
		return images.iterator();
	}


}
