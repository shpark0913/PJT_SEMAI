package com.ssafy.semes.user.controller;


import com.ssafy.semes.common.ErrorCode;
import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.common.dto.ApiResponse;
import com.ssafy.semes.user.model.UserEntity;
import com.ssafy.semes.user.model.UserRequestDto;
import com.ssafy.semes.user.model.UserResponseDto;
import com.ssafy.semes.user.model.service.UserSerivce;
import com.ssafy.semes.util.JwtUtil;
import com.ssafy.semes.util.SocketClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.Socket;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    @Autowired
    private UserSerivce userSerivce;
    private JwtUtil jwtUtil = new JwtUtil();

    /**
     * <p>{@summary 사용자 아이디 비밀번호를 입력 받아 유저 정보를 반환함.}<p/>
     * 예외 처리 및 예외 메시지 수정 필요
     * @param userRequestDto
     * @return UserResponseDto
     */
    @PostMapping()
    public ApiResponse<?> login(@RequestBody UserRequestDto userRequestDto){
        log.info("UserController login start");
        try{
            UserEntity user =userSerivce.findUser(userRequestDto);
            return ApiResponse.success(SuccessCode.READ_USER_LOGIN,
                    UserResponseDto.builder().userName(user.getUserName()).accesstoken(jwtUtil.createAccessToken("role",user.getUserRole())).build()
            );
        }catch (Exception e){
            return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
        }

    }
}
