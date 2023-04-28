package com.ssafy.semes.common;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum Directory {
	BASE("semes_bolt"),ARCHIVE("semes_bin"),TRAIN("semes_transfer"),

	WHEEL_ORIGIN("WHEEL_ORIGIN"),WHEEL_RESULT("WHEEL_RESULT"),
	DETECTION_NORMAL("DETECTION_NORMAL"),DETECTION_PROBLEM("DETECTION_PROBLEM"),
	BOLT_NORMAL("BOLT_NORMAL"),BOLT_LOST("BOLT_LOST"),BOLT_LOOSE("BOLT_LOOSE"),BOLT_AMBIGUE("BOLT_AMBIGUE"),BOLT_BREAK("BOLT_BREAK");

	private final String path;
	public static Directory[] getBoltDirectories(){
		return new Directory[]{Directory.BOLT_NORMAL,Directory.BOLT_LOST,Directory.BOLT_LOOSE,Directory.BOLT_AMBIGUE,Directory.BOLT_BREAK};
	}
}
