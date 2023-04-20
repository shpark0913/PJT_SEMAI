package com.ssafy.semes.report.controller;

import com.ssafy.semes.common.ErrorCode;
import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.common.dto.ApiResponse;
import com.ssafy.semes.report.model.ReportListResponseDto;
import com.ssafy.semes.report.model.service.ReportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/report")
@Slf4j
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping("/list")
    private ApiResponse<?> findReport(Pageable pageable, @RequestParam String mode){
        log.info("Report FindReport Start");
        try {
            return ApiResponse.success(SuccessCode.REAT_BOARD_LIST,reportService.findReport(pageable));

        }catch (Exception e){
            log.error("Report FindReport Error");
            return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
        }
    }
}
