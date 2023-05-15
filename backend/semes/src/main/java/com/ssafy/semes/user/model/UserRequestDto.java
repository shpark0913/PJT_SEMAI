package com.ssafy.semes.user.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserRequestDto {
    /** 사용자 아이디 */
    private String userId;
    /** 사용자 비밀번호 */
    private String userPwd;
}
