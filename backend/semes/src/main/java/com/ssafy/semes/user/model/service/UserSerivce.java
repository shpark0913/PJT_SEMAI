package com.ssafy.semes.user.model.service;

import com.ssafy.semes.user.model.UserEntity;
import com.ssafy.semes.user.model.UserRequestDto;
import org.springframework.stereotype.Service;

@Service
public interface UserSerivce {
    UserEntity findUser(UserRequestDto userRequestDto) throws Exception ;
}
