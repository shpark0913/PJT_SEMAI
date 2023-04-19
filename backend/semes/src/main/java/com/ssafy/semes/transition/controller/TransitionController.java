package com.ssafy.semes.transition.controller;

import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.common.dto.ApiResponse;
import com.ssafy.semes.transition.model.service.TransitionService;
import com.ssafy.semes.transition.model.TransitionUpdateRequestVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/{type}")
    public ApiResponse<?> findBolt(@PathVariable String type){

        return ApiResponse.success(SuccessCode.READ_IMG,"볼트 조회 성공");
    }
    @DeleteMapping
    public ApiResponse<?> deleteBolt(@RequestBody int[] fileIds){

        return ApiResponse.success(SuccessCode.READ_IMG,"볼트 삭제 성공");
    }
    @PutMapping
    public ApiResponse<?> updateBolt(@RequestBody TransitionUpdateRequestVo files){

        return ApiResponse.success(SuccessCode.READ_IMG,"볼트 이동 성공");
    }

}
