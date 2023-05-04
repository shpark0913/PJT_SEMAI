package com.ssafy.semes.transition.model;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Builder
@Slf4j
public class TransitionLearningResultDto {
	private int status;
	private boolean success;


	@Builder.Default
	private Map<String,String> data = new HashMap<>();

	public static TransitionLearningResultDto fromJson(String json) throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.readValue(json, TransitionLearningResultDto.class);
	}

	public static TransitionLearningResultDto fromHttpResponse(HttpResponse<String> response) throws IOException {
		String json = response.body();
		return fromJson(json);
	}

	public static TransitionLearningResultDto fromHttpGetRequest(String url) throws IOException, InterruptedException {
		HttpClient httpClient = HttpClient.newHttpClient();
		HttpRequest httpRequest = HttpRequest.newBuilder()
			.uri(URI.create(url))
			.GET()
			.build();
		HttpResponse<String> httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
		return fromHttpResponse(httpResponse);
	}
}
