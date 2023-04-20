package com.ssafy.semes.transition.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransitionUpdateRequestVo {
	private long fileId;
	private int preType;
	private int nextType;
}
