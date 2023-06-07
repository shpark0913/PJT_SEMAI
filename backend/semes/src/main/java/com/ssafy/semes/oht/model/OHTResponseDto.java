package com.ssafy.semes.oht.model;

import java.util.List;

import com.ssafy.semes.dashboard.model.OHTCheckResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@AllArgsConstructor
@Setter
@Getter
public class OHTResponseDto {
	public String serialNumber;
	public List<OHTCheckResponseDto> ohtChecks;
}
