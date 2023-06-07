package com.ssafy.semes.common;

import java.io.File;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum Directory {
	BASE("semes_bolt"),ARCHIVE("semes_bin"),TRAIN("semes_transfer".concat(File.separator).concat("train")),

	WHEEL_ORIGIN("WHEEL_ORIGIN"),WHEEL_RESULT("WHEEL_RESULT"),
	DETECTION_NORMAL("DETECTION_NORMAL"),DETECTION_PROBLEM("DETECTION_PROBLEM"),DETECTION_RESULT("DETECTION_RESULT"),
	BOLT_NORMAL("BOLT_NORMAL"),BOLT_LOST("BOLT_LOST"),BOLT_LOOSE("BOLT_LOOSE"),BOLT_AMBIGUE("BOLT_AMBIGUE"),BOLT_BREAK("BOLT_BREAK");

	private final String path;
	//볼트 모든 클래스
	public static Directory[] getBoltDirectories(){
		return new Directory[]{Directory.BOLT_NORMAL,Directory.BOLT_LOST,Directory.BOLT_LOOSE,Directory.BOLT_AMBIGUE,Directory.BOLT_BREAK};
	}
	//볼트 클래스 실제 사용
	public static Directory[] getBoltListDirectories(){
		return new Directory[]{Directory.BOLT_NORMAL,Directory.BOLT_LOST,Directory.BOLT_BREAK};
	}
	//기본 하위 폴더 구조
	public static Directory[] getSubDirectories(){
		return new Directory[]{Directory.BOLT_NORMAL,Directory.BOLT_LOST,Directory.BOLT_LOOSE,Directory.BOLT_AMBIGUE,Directory.BOLT_BREAK
			,Directory.WHEEL_ORIGIN,Directory.WHEEL_RESULT,Directory.DETECTION_NORMAL,Directory.DETECTION_PROBLEM,Directory.DETECTION_RESULT};
	}
	//볼트 이미지 상태별 저장 폴더이름(일반, 삭제, 학습용)
	public static Directory[] getBaseDirectories(){
		return new Directory[]{Directory.ARCHIVE,Directory.BASE,Directory.TRAIN};
	}
}
