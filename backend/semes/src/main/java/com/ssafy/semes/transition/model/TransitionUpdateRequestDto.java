package com.ssafy.semes.transition.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TransitionUpdateRequestDto {

	private Long[] fileIds;
	private int preType;
	private int nextType;

}
