package com.ssafy.semes.image.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder

public class ImageResponseDto {
	private long fileId;
	private String imgUrl;
	private String originName;
}
