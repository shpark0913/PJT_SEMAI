package com.ssafy.semes.util;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Controller
public class SlackController {
    @Async
    public void send(String text){
        Map<String, Object> payload = new HashMap<>();
        payload.put("username","ErrorBot");
        payload.put("text", text);
        payload.put("icon_url","https://cdn-icons-png.flaticon.com/512/5741/5741333.png");

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForObject("https://hooks.slack.com/services/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", payload, String.class);
    }
}
