package com.ssafy.semes.dashboard.controller;


import com.ssafy.semes.dashboard.model.OHTCheckResponseDto;
import com.ssafy.semes.dashboard.model.SseEmitters;
import com.ssafy.semes.dashboard.model.service.DashboardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
@Slf4j
public class DashboardController {
    private final SseEmitters sseEmitters;
    @Autowired
    private DashboardService dashboardService;

    public DashboardController(SseEmitters sseEmitters) {
        this.sseEmitters = sseEmitters;
    }
    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect() {
        log.info("DashBoard Start");
        List<OHTCheckResponseDto> list = dashboardService.findAllCheck();
        SseEmitter emitter = new SseEmitter();
        sseEmitters.add(emitter);
        try {
            emitter.send(SseEmitter.event()
                    .name("dashboard")
                    .data(list));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(emitter);
    }
    @GetMapping(value = "/main", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> showMain(){
        log.info("DashBoard Main Start");
        sseEmitters.showMain();
        return ResponseEntity.ok().build();
    }

}
