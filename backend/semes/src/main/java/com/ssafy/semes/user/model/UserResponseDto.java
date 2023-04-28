package com.ssafy.semes.user.model;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserResponseDto {
    private String accesstoken;
    private String userName;
}
