package com.ssafy.semes.util;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Controller
public class SlackController {
    @Async
    public void errorSend(String text){
        Map<String, Object> payload = new HashMap<>();
        payload.put("username","ErrorBot");
        payload.put("text", text);
        payload.put("icon_url","https://cdn-icons-png.flaticon.com/512/5741/5741333.png");

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForObject("https://hooks.slack.com/services/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", payload, String.class);
    }
    @Async
    public void successSend(String text){
        Map<String, Object> payload = new HashMap<>();
        payload.put("username","SuccessBot");
        payload.put("text", text);
        payload.put("icon_url","https://image.utoimage.com/preview/cp920093/2020/10/202010004097_206.jpg");

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForObject("https://hooks.slack.com/services/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", payload, String.class);
    }
}
