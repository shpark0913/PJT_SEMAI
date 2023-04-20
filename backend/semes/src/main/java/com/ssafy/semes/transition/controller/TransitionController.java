package com.ssafy.semes.transition.controller;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.common.dto.ApiResponse;
import com.ssafy.semes.image.model.ImageListResponseDto;
import com.ssafy.semes.image.model.ImageResponseDto;
import com.ssafy.semes.transition.model.TransitionDeleteRequestDto;
import com.ssafy.semes.transition.model.TransitionUpdateRequestDto;
import com.ssafy.semes.transition.model.service.TransitionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/transition")
@Slf4j
public class TransitionController {
    @Autowired
    private TransitionService transitionService;

    @GetMapping()
    public ApiResponse<?> findAllBolt(){
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
    public ApiResponse<?> deleteBolt(@RequestBody TransitionDeleteRequestDto dto){
        StringBuilder sb = new StringBuilder();
        for (int id:
             dto.getFileIds()) {
            sb.append(id).append(",");
        }
        sb.append("볼트 삭제 성공");
        return ApiResponse.success(SuccessCode.DELETE_IMG,sb.toString());
    }
    @PutMapping
    public ApiResponse<?> updateBolt(@RequestBody TransitionUpdateRequestDto files){

        return ApiResponse.success(SuccessCode.UPDATE_IMG,"볼트 이동 성공");
    }

}
