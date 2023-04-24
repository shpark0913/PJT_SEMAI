package com.ssafy.semes.common;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum Directory {

	WHEEL_ORIGIN("WHEEL_ORIGIN"),WHEEL_RESULT("WHEEL_RESULT"),
	DETECTION_NORMAL("DETECTION_NORMAL"),DETECTION_PROBLEM("DETECTION_PROBLEM"),
	BOLT_NORMAL("BOLT_NORMAL"),BOLT_LOST("BOLT_LOST"),BOLT_BROKEN("BOLT_BROKEN"),BOLT_AMBIGUE("BOLT_AMBIGUE");

	private final String path;

}
