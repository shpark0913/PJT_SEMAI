package com.ssafy.semes.image.model;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ImageListResponseDto {
	private int status;
	private List<ImageResponseDto> images;
}
