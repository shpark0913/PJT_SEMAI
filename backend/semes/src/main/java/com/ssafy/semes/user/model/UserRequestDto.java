package com.ssafy.semes.user.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserRequestDto {
    private String userId;
    private String userPwd;
}
