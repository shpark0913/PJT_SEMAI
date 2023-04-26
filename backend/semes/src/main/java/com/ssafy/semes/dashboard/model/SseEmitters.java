package com.ssafy.semes.dashboard.model;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Component
@Slf4j
public class SseEmitters {

    private static final AtomicLong counter = new AtomicLong();

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public SseEmitter add(SseEmitter emitter) {
        this.emitters.add(emitter);
        log.info("new emitter added: {}", emitter);
        log.info("emitter list size: {}", emitters.size());
        log.info("emitter list: {}", emitters);
        emitter.onCompletion(() -> {
            log.info("onCompletion callback");
            this.emitters.remove(emitter);
        });
        emitter.onTimeout(() -> {
            log.info("onTimeout callback");
            emitter.complete();
        });

        return emitter;
    }

    public void showMain(List<DashboardMainResponseDto> dtos ){
        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("main")
                        .data(dtos));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }
    public void showProcessStatus(ProcessStatusDto dto){
        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event()
                    .name("state")
                    .data(dto));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

}