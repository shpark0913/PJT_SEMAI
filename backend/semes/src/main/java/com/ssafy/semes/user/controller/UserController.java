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
public class UserController {

    @Autowired
    private UserSerivce userSerivce;
    private JwtUtil jwtUtil = new JwtUtil();
    @PostMapping()
    public ApiResponse<?> login(@RequestBody UserRequestDto userRequestDto){
        try{
            UserEntity user =userSerivce.findUser(userRequestDto);
            return ApiResponse.success(SuccessCode.READ_USER_LOGIN,
                    UserResponseDto.builder().userName(user.getUserName()).accesstoken(jwtUtil.createAccessToken("role",user.getUserRole())).build()
            );
        }catch (Exception e){
            return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
        }

    }

    @GetMapping("test")
    public ApiResponse<?> test() throws IOException {
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        return ApiResponse.success(SuccessCode.READ_DASHBOARD_MAIN);
    }
}
