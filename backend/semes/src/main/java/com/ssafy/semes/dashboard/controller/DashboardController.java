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
            SseEmitter emitter = new SseEmitter();
            sseEmitters.add(emitter);
            emitter.send(SseEmitter.event()
                    .name("dashboard")
                    .data(list));

            return ResponseEntity.ok(emitter);
        }catch (Exception e){
            log.error("DashBoard Error : " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
    @GetMapping(value = "/main/{oht-check-id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> showMain(@PathVariable("oht-check-id")long ohtCheckId){
        log.info("DashBoard ShowMain Start");
        List<DashboardMainResponseDto> list= null;
        try {
            list = dashboardService.findAllMain(ohtCheckId);
            log.info("DashboardMainResponseDtos : " + list);
            sseEmitters.showMain(list);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            log.error("DashBoard ShowMain Error : " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
