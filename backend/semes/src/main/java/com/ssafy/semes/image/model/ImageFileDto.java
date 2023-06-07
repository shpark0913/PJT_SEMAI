package com.ssafy.semes.image.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageFileDto {
	private String uuid;
	private String fileName;
	private String contentType;
}
