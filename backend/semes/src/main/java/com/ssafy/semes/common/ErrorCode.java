package com.ssafy.semes.common;
import static com.ssafy.semes.common.StatusCode.INTERNAL_SERVER;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum ErrorCode {

    // 400 Bad Request

    // 404 NOT FOUND

    // 500 Internal Server Exception
    INTERNAL_SERVER_EXCEPTION(INTERNAL_SERVER, "예상치 못한 서버 에러가 발생하였습니다."), NOT_TOKEN(INTERNAL_SERVER, "토큰 없음");

    private final StatusCode statusCode;
    private final String message;

    public int getStatus() {
        return statusCode.getStatus();
    }

}
