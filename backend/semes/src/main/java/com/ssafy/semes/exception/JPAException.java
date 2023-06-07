package com.ssafy.semes.exception;

public class JPAException extends RuntimeException {
    private static final long serialVersionUID = -2238030302650813813L;

    public JPAException() {
        super("DB에서 조회되지 않습니다. 파라미터를 정확하게 입력하세요.");
    }
}

