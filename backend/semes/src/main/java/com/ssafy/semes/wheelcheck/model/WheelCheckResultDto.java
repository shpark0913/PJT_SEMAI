package com.ssafy.semes.wheelcheck.model;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
@Slf4j
@JsonIgnoreProperties(ignoreUnknown = true)
public class WheelCheckResultDto {
	private int status;
	private boolean success;
	@Builder.Default
	private boolean ng = false;
	@Builder.Default
	private String detail = "";

	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Data{
		@Builder.Default
		String markedImage = "";

		String[] bolts;

		public String getMarkedImage() {
			return markedImage;
		}

		public String[] getBolts() {
			return bolts;
		}

		@Override
		public String toString() {
			return "Data{" +
					"markedImage='" + markedImage + '\'' +
					", bolts=" + Arrays.toString(bolts) +
					'}';
		}
	}

	@Builder.Default
	private Data data = new Data();

	public static WheelCheckResultDto fromJson(String json) throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.readValue(json, WheelCheckResultDto.class);
	}

	public static WheelCheckResultDto fromHttpResponse(HttpResponse<String> response) throws IOException {
		String json = response.body();
		return fromJson(json);
	}
	/**
	 * {@summary 개별 바퀴 검사 요청}
	 * 바퀴 파일 이름으로 바퀴 진단 요청
	 * @param url AI 서버 API URL
	 * @return 바퀴 검사 결과를 담은 DTO
	 */
	public static WheelCheckResultDto fromHttpGetRequest(String url) throws IOException, InterruptedException {
		HttpClient httpClient = HttpClient.newHttpClient();
		HttpRequest httpRequest = HttpRequest.newBuilder()
				.uri(URI.create(url))
				.GET()
				.build();
		HttpResponse<String> httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
		return fromHttpResponse(httpResponse);
	}


	/**
	 * {@summary 개별 바퀴 검사 요청 URL 생성}
	 * 바퀴 파일 이름으로 바퀴 진단 요청 URL 생성
	 * @param originFilePath 검사 진행할 파일 경로
	 * @param ip AI 서버 주소
	 * @return 바퀴 검사 결과를 담은 DTO
	 */
	public static WheelCheckResultDto fromWheelImage(String originFilePath,String ip) throws IOException, InterruptedException {
		String encodedFilePath = URLEncoder.encode(originFilePath, "UTF-8");
		String url = "http://"+ip+":8000/infer?filePath=" + encodedFilePath+"&binary=True";// 추후 수정
		return  fromHttpGetRequest(url);
	}

	@Override
	public String toString() {
		return "WheelCheckResultDto{" +
				"markedImage='" + data.markedImage + '\'' +
				", bolts=" + Arrays.toString(data.bolts) +
				'}';
	}
}
