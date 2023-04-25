package com.ssafy.semes.user.model.repository;


import com.ssafy.semes.user.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity,Long> {
    UserEntity findByUserIdAndUserPwd(String userId,String userPwd);
}
