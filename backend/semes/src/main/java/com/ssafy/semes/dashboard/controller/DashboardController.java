package com.ssafy.semes.dashboard.controller;


import com.ssafy.semes.dashboard.model.DashboardMainResponseDto;
import com.ssafy.semes.dashboard.model.OHTCheckResponseDto;
import com.ssafy.semes.dashboard.model.SseEmitters;
import com.ssafy.semes.dashboard.model.service.DashboardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
        List<OHTCheckResponseDto> list = null;
        try {
            list = dashboardService.findAllCheck();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
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
    @GetMapping(value = "/main/{oht-check-id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> showMain(@PathVariable("oht-check-id")long ohtCheckId){
        log.info("DashBoard Main Start");
        List<DashboardMainResponseDto> list= null;
        try {
            list = dashboardService.findAllMain(ohtCheckId);
            log.info("DashboardMainResponseDtos : " + list);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
        sseEmitters.showMain(list);
        return ResponseEntity.ok().build();
    }

}
