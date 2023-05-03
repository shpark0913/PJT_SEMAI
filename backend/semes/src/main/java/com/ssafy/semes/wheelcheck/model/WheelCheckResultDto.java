package com.ssafy.semes.wheelcheck.model;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Arrays;

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
public class WheelCheckResultDto {
	private int status;
	private boolean success;
	private boolean ng;

	public static class Data{
		String markedImage;
		String[] bolts;

		public String getMarkedImage() {
			return markedImage;
		}

		public String[] getBolts() {
			return bolts;
		}
	}

	private Data data;

	public static WheelCheckResultDto fromJson(String json) throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.readValue(json, WheelCheckResultDto.class);
	}

	public static WheelCheckResultDto fromHttpResponse(HttpResponse<String> response) throws IOException {
		String json = response.body();
		log.info("fromHttpResponse json check :" + json);
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
		String url = "http://127.0.0.1:8000/infer?filePath=" + encodedFilePath;

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
