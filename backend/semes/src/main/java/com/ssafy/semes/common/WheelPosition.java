package com.ssafy.semes.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum WheelPosition{
	FL(0,3),FR(1,4),RL(2,5),RR(3,6);

	private final int idx;
	private final int val;
}