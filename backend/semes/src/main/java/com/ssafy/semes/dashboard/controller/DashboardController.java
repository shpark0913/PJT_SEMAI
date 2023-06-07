package com.ssafy.semes.dashboard.controller;


import com.ssafy.semes.common.ErrorCode;
import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.common.dto.ApiResponse;
import com.ssafy.semes.dashboard.model.DashboardMainResponseDto;
import com.ssafy.semes.dashboard.model.OHTCheckResponseDto;
import com.ssafy.semes.dashboard.model.ProcessStatusDto;
import com.ssafy.semes.dashboard.model.SseEmitters;
import com.ssafy.semes.dashboard.model.service.DashboardService;
import com.ssafy.semes.exception.JPAException;
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

    /** OHT 현재 검사 순서 <br>
     * OHTCheckController.checkOht에서  검사 순서 지정 <br>
     */
    public static int nowNum;
    public DashboardController(SseEmitters sseEmitters) {
        this.sseEmitters = sseEmitters;
    }

    /**
     * <p>{@summary SSE 사용을 위한 sseEmitters 반환 }<p/>
     * 대시보드 하단 OHT 검사 정보 SSE 전송 <br>
     * 대시보드 검사 현황 SSE 전송 <br>
     * @return sseEmitters
     */
    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect() {
        log.info("DashBoard Start");
        List<OHTCheckResponseDto> list = null;
        try {
            list = dashboardService.findAllCheck();
            OHTCheckResponseDto right = null;
            right = list.get(0);
            if(list.get(0).getOhtCheckEndDatetime() == null){
                list.remove(0);
            }

            //SSE 생성
            SseEmitter emitter = new SseEmitter(1*1000L);//SSE 유지 시간
            sseEmitters.add(emitter); // SSE를 서버에서 관리

            //대시보드 하단 OHT 검사 정보
            emitter.send(SseEmitter.event()
                    .name("dashboard")
                    .data(list)); // 오늘 날짜의 검사 결과 반환

            System.out.println(right.getOhtSn());

            //대시보드 검사 현황 업데이트 코드
            ProcessStatusDto processStatusDto = ProcessStatusDto.builder()
                    .ohtSn(right.getOhtSn())
                    .isProceeding(true)
                    .isWheelsProceeding(new boolean[4]).build();
            for(int i = 0 ; i<= DashboardController.nowNum;i++){
                processStatusDto.wheelComplete(i);
            }

            sseEmitters.showProcessStatus(processStatusDto);

            return ResponseEntity.ok(emitter);
        }catch (JPAException jpaException){
            log.error("DashBoard Error : " + jpaException.getMessage());
            throw new JPAException();
        }catch (Exception e){
            log.error("DashBoard Error : " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    /**
     * <p>{@summary 대시보드 왼쪽 상단 메인 페이지 반환}<p/>
     * ohtCheckId를 통해 OHT 검사 상세 정보 출력
     * @param ohtCheckId
     * @return DashboardMainResponseDto
     */
    @GetMapping("/main/{oht-check-id}")
    public ApiResponse<?> showMain(@PathVariable("oht-check-id")long ohtCheckId){
        log.info("DashBoard ShowMain Start");
        List<DashboardMainResponseDto> list= null;
        try {
            list = dashboardService.findAllMain(ohtCheckId);
            log.info("DashboardMainResponseDtos : " + list);
            return ApiResponse.success(SuccessCode.READ_DASHBOARD_MAIN,list);
        }catch (JPAException jpaException){
            log.error("DashBoard Error : " + jpaException.getMessage());
            return ApiResponse.error(ErrorCode.JPA_NOT_FIND);
        }catch (Exception e){
            log.error("DashBoard ShowMain Error : " + e.getMessage());
            return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
        }
    }
}
