package com.ssafy.semes.common;
import static com.ssafy.semes.common.StatusCode.INTERNAL_SERVER;
import static com.ssafy.semes.common.StatusCode.BAD_REQUEST;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum ErrorCode {

    // 400 Bad Request

    // 404 NOT FOUND

    // 500 Internal Server Exception
    INTERNAL_SERVER_EXCEPTION(INTERNAL_SERVER, "예상치 못한 서버 에러가 발생하였습니다."), NOT_TOKEN(INTERNAL_SERVER, "토큰 없음"),
    INVALID_OHT_SERIAL_NO(BAD_REQUEST,"유효하지 않은 OHT 시리얼 번호 입니다."),FILE_NOT_FOUND(BAD_REQUEST,"유효하지 않은 파일 이름입니다.")
    ,JPA_NOT_FIND(INTERNAL_SERVER,"DB에서 조회되지 않습니다. 파라미터를 정확하게 입력하세요."),AI_SERVER_CONNECTION_ERROR(INTERNAL_SERVER,"AI 모델 서버를 찾을 수 없습니다.")
    ;

    private final StatusCode statusCode;
    private final String message;

    public int getStatus() {
        return statusCode.getStatus();
    }

}
