package com.ssafy.semes.transition.controller;

import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.common.dto.ApiResponse;
import com.ssafy.semes.transition.model.service.TransitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transition")
public class TransitionController {
    @Autowired
    private TransitionService transitionService;

    @GetMapping("/{type}")
    public ApiResponse<?> findBolt(@PathVariable String type){

        return ApiResponse.success(SuccessCode.READ_IMG,"볼트 조회 성공");
    }
}
