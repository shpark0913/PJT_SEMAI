package com.ssafy.semes.transition.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TransitionDeleteRequestDto {
	private Long[] fileIds;
}
