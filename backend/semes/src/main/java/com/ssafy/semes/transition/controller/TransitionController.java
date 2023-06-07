package com.ssafy.semes.transition.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.semes.common.ErrorCode;
import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.common.dto.ApiResponse;
import com.ssafy.semes.image.model.ImageListResponseDto;
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

    @GetMapping
    public ApiResponse<?> findAllBolt(){
        log.info("ImageController getImages start");
        List<ImageListResponseDto> responseDtoImages = transitionService.findAll(false);
        List<ImageListResponseDto> responseDtoTrain = transitionService.findAll(true);

        List<List<ImageListResponseDto>> response = new ArrayList<>();
        response.add(responseDtoImages);
        response.add(responseDtoTrain);
        return 	ApiResponse.success(SuccessCode.READ_IMG_LIST,response);

    }
    @DeleteMapping
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
    @PatchMapping("")
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
    @PostMapping("/train")
    public ApiResponse<?> moveBoltToTrainSet(@RequestBody TransitionFileIdsDto requestDto){
        log.info("TransitionController moveBoltToTrainSet start");
        try {
            transitionService.moveToTrainFiles(requestDto);
        }catch (IOException e){
            log.info("TransitionController moveBoltToTrainSet error");
            e.printStackTrace();
            return ApiResponse.error(ErrorCode.FILE_NOT_FOUND);
        }
        return ApiResponse.success(SuccessCode.UPDATE_IMG,"볼트 학습 이미지 선택 성공.");
    }
    @GetMapping("/learning")
    public ApiResponse<?> startTrain(@RequestParam("lr") String lr,
        @RequestParam("momentum") String momentum ,
        @RequestParam("batch") String batch ,
        @RequestParam("epoch") String epoch
        ){
        log.info("TransitionController startTrain start");
        log.info("TransitionController startTrain params "+"lr:"+lr+",momentum:"+momentum+",batch:"+batch+",epoch:"+epoch);

        Map<String,String> res = transitionService.startTrain(lr, momentum, batch, epoch);

        if(res.get("changed").equals("true")){
            return ApiResponse.success(SuccessCode.COMPLETE_LEARNING_CHANGED,res);
        }else{
            return ApiResponse.success(SuccessCode.COMPLETE_LEARNING_NOT_CHANGED,res);
        }
    }

}
