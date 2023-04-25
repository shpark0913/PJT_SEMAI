package com.ssafy.semes.common;

import static com.ssafy.semes.common.StatusCode.SUCCESS;
import static com.ssafy.semes.common.StatusCode.CREATED;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum SuccessCode {

    /*
     * 등록/생성: CREATE, 조회: READ, 수정: UPDATE, 삭제/취소: DELETE
     */
    // 회원
    READ_BOLT(SUCCESS, "볼트 조회 성공"),READ_IMG_LIST(SUCCESS,"이미지 전체 조회 성공")
    ,DELETE_IMG(SUCCESS,"이미지 삭제 성공"),UPDATE_IMG(SUCCESS,"이미지 수정 성공")
    ,READ_OHT(CREATED,"OHT 조회 성공"),CREATE_OHT(CREATED,"OHT 생성 성공")
    ,READ_BOARD(SUCCESS,"대시보드 조회 성공"),READ_REPORT_LIST(SUCCESS,"보고서 조회 성공")
    ,CREATE_FILE(CREATED,"이미지 저장 성공"),DELETE_FILE(SUCCESS,"이미지 삭제 성공")
    ,READ_REPORT_DETAIL(SUCCESS,"보고서 상세 조회 성공"),READ_DASHBOARD_MAIN(SUCCESS,"대시보드 메인 조회 성공")
    ,CHECK_OHT_COMPLETE(SUCCESS,"OHT 검사 종료")
    ,READ_USER_LOGIN(SUCCESS,"유저 로그인 성공")



    ;

    private final StatusCode statusCode;
    private final String message;

    public int getStatus() {
        return statusCode.getStatus();
    }

}
