package com.ssafy.semes.exception;

public class InvaildOHTSerialNo extends RuntimeException{
	private static final long serialVersionUID = 2145683086550861540L;

	public InvaildOHTSerialNo() {
		super("유효하지 않은 OHT 시리얼 번호 입니다.\n다시 시도해주세요.");
	}

}
