package com.ssafy.semes.transition.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class TransitionUpdateRequestDto {
	private long fileId;
	private int preType;
	private int nextType;

}
