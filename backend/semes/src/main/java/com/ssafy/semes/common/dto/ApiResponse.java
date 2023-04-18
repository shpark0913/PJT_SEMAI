package com.ssafy.semes.common.dto;

import com.ssafy.semes.common.ErrorCode;
import com.ssafy.semes.common.StatusCode;
import com.ssafy.semes.common.SuccessCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ApiResponse<T> {

    private int status;
    private boolean success;
    private String message;
    private T data;

    public static <T> ApiResponse<T> success(SuccessCode successCode) {
        return new ApiResponse<>(StatusCode.SUCCESS.getStatus(), true, successCode.getMessage(), null);
    }

    public static <T> ApiResponse<T> success(SuccessCode successCode, T data) {
        return new ApiResponse<>(StatusCode.SUCCESS.getStatus(), true, successCode.getMessage(), data);
    }

    public static <T> ApiResponse<T> error(ErrorCode errorCode) {
        return new ApiResponse<>(errorCode.getStatusCode().getStatus(), false, errorCode.getMessage(), null);
    }

}
