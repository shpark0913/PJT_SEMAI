package com.ssafy.semes.dashboard.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProcessStatusDto {
	private boolean isProceeding;
	private boolean[] isWheelsProceeding;
	private String ohtSn;

	public void wheelComplete(int i){
		isWheelsProceeding[i] = true;
	}
}
