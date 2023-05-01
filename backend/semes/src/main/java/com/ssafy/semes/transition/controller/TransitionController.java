package com.ssafy.semes.transition.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.semes.common.ErrorCode;
import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.common.dto.ApiResponse;
import com.ssafy.semes.image.model.ImageListResponseDto;
import com.ssafy.semes.image.model.ImageResponseDto;
import com.ssafy.semes.transition.model.TransitionFileIdsDto;
import com.ssafy.semes.transition.model.TransitionUpdateRequestDto;
import com.ssafy.semes.transition.model.service.TransitionService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/transition")
@Slf4j
public class TransitionController {
    @Autowired
    private TransitionService transitionService;

    @GetMapping("/temp")
    public ApiResponse<?> findAllBolt(){
        log.info("ImageController getImages start");
        List<ImageListResponseDto> responseDto = transitionService.findAll();
        return 	ApiResponse.success(SuccessCode.CREATE_FILE,responseDto);

    }
    @DeleteMapping("/temp")
    public ApiResponse<?> deleteBolt(@RequestBody TransitionFileIdsDto requestDto){
        log.info("TransitionController deleteBolt start");
        try {
            transitionService.deleteFiles(requestDto);
        }catch (IOException e){
            log.info("TransitionController deleteBolt error");
            e.printStackTrace();
            return ApiResponse.error(ErrorCode.FILE_NOT_FOUND);
        }
        return ApiResponse.success(SuccessCode.DELETE_IMG,"볼트 이미지를 삭제 했습니다.");
    }
    @PatchMapping("/temp")
    public ApiResponse<?> updateBolt(@RequestBody TransitionUpdateRequestDto requestDto){
        log.info("TransitionController updateBolt start");
        try {
            transitionService.moveFiles(requestDto);
        }catch (IOException e){
            log.info("TransitionController updateBolt error");
            e.printStackTrace();
            return ApiResponse.error(ErrorCode.FILE_NOT_FOUND);
        }

        return ApiResponse.success(SuccessCode.UPDATE_IMG,"볼트 이동 성공");
    }
    @PostMapping("/temp/train")
    public ApiResponse<?> moveBoltToTrainSet(@RequestBody TransitionFileIdsDto requestDto){
        log.info("TransitionController moveBoltToTrainSet start");
        try {
            transitionService.moveToTrainFiles(requestDto);
        }catch (IOException e){
            log.info("TransitionController moveBoltToTrainSet error");
            e.printStackTrace();
            return ApiResponse.error(ErrorCode.FILE_NOT_FOUND);
        }
        return ApiResponse.success(SuccessCode.DELETE_IMG,"볼트 이미지를 삭제 했습니다.");
    }
    @GetMapping()
    public ApiResponse<?> findAllBoltDummy(){
        log.info("ImageController findAllBoltDummy start");

        ImageResponseDto img1 = ImageResponseDto.builder().fileId(0L).imgUrl("/BOLT_NORMAL/1.png").build();
        ImageResponseDto img2 = ImageResponseDto.builder().fileId(1L).imgUrl("/BOLT_NORMAL/1.png").build();
        List<ImageResponseDto> images = new ArrayList<>();
        images.add(img1);
        images.add(img2);


        ImageResponseDto img3 = ImageResponseDto.builder().fileId(0L).imgUrl("/BOLT_LOST/1.png").build();
        ImageResponseDto img4 = ImageResponseDto.builder().fileId(1L).imgUrl("/BOLT_LOST/1.png").build();
        List<ImageResponseDto> images2 = new ArrayList<>();
        images2.add(img3);
        images2.add(img4);

        ImageListResponseDto imageList1 = ImageListResponseDto.builder().status(1).images(images).build();
        ImageListResponseDto imageList2 = ImageListResponseDto.builder().status(2).images(images2).build();
        List<ImageListResponseDto> response = new ArrayList<>();
        response.add(imageList1);
        response.add(imageList2);
        return ApiResponse.success(SuccessCode.READ_IMG_LIST,response);

    }
    @DeleteMapping
    public ApiResponse<?> deleteBoltDummy(@RequestBody TransitionFileIdsDto requestDto){
        log.info("TransitionController deleteBoltDummy start");
        StringBuilder sb = new StringBuilder();
        for (Long id:
            requestDto.getFileIds()) {
            sb.append(id).append(",");
        }
        sb.append("볼트 삭제 성공");
        return ApiResponse.success(SuccessCode.DELETE_IMG,sb.toString());
    }
    @PatchMapping
    public ApiResponse<?> updateBoltDummy(@RequestBody TransitionUpdateRequestDto requestDto){
        log.info("TransitionController updateBoltDummy start");
        StringBuilder sb = new StringBuilder();
        for (Long id:
            requestDto.getFileIds()) {
            sb.append(id).append(",");
        }
        sb.append("볼트 이동 성공");
        return ApiResponse.success(SuccessCode.UPDATE_IMG,sb.toString());
    }
    @PostMapping("/train")
    public ApiResponse<?> moveBoltToTrainSetDummy(@RequestBody TransitionFileIdsDto requestDto){
        log.info("TransitionController moveBoltToTrainSet start");
        StringBuilder sb = new StringBuilder();
        for (Long id:
            requestDto.getFileIds()) {
            sb.append(id).append(",");
        }
        sb.append("학습 데이터셋으로 이동 성공");
        return ApiResponse.success(SuccessCode.UPDATE_IMG,sb.toString());
    }
}
