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
		System.out.println("===========================================================");
		System.out.println(response.body());
		System.out.println("===========================================================");
		String json = response.body();
		return fromJson(json);
	}

	public static WheelCheckResultDto fromHttpGetRequest(String url) throws IOException, InterruptedException {
		HttpClient httpClient = HttpClient.newHttpClient();
		HttpRequest httpRequest = HttpRequest.newBuilder()
				.uri(URI.create(url))
				.GET()
				.build();
		HttpResponse<String> httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
		return fromHttpResponse(httpResponse);
	}

	public static WheelCheckResultDto fromWheelImage(String originFilePath) throws IOException, InterruptedException {
		String encodedFilePath = URLEncoder.encode(originFilePath, "UTF-8");
		String url = "http://semes.info:8000/infer?filePath=" + encodedFilePath+"&binary=False";// 추후 수정
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
