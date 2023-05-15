package com.ssafy.semes.user.model.service;

import com.ssafy.semes.user.model.UserEntity;
import com.ssafy.semes.user.model.UserRequestDto;
import org.springframework.stereotype.Service;

@Service
public interface UserSerivce {
    /**
     * <p>{@summary 사용자 아이디 비밀번호를 통해 데이터 베이스에서 유저 정보를 검색 후 반환함.}<p/>
     * @param userRequestDto <br>
     * userId 사용자 아이디  <br>
     * userPwd 사용자 비밀번호
     * @return UserResponseDto <br>
     * userName 사용자 이름  <br>
     * accesstoken 사용자 엑세스 토큰
     */
    UserEntity findUser(UserRequestDto userRequestDto) throws Exception ;
}
