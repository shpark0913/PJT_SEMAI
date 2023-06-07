package com.ssafy.semes.user.model.service;

import com.ssafy.semes.user.model.UserEntity;
import com.ssafy.semes.user.model.UserRequestDto;
import com.ssafy.semes.user.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserSerivce{
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserEntity findUser(UserRequestDto userRequestDto) throws Exception {
        // id, pwd를 통해 데이터 베이스에서 user정보 반환
        UserEntity user = userRepository.findByUserIdAndUserPwd(
                userRequestDto.getUserId(),
                userRequestDto.getUserPwd());
        return user;
    }
}
