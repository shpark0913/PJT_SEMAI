package com.ssafy.semes.transition.model;

import java.util.List;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransitionUpdateRequestVo {
	private List<TransitionUpdateRequestDto> data;
}
