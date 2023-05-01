package com.ssafy.semes.report.controller;

import com.ssafy.semes.common.ErrorCode;
import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.common.dto.ApiResponse;
import com.ssafy.semes.exception.JPAException;
import com.ssafy.semes.report.model.QuestionDto;
import com.ssafy.semes.report.model.service.ReportService;
import com.ssafy.semes.util.SlackController;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/report")
@Slf4j
public class ReportController {
    @Autowired
    private ReportService reportService;

    @Autowired
    private SlackController slackController;

    @GetMapping("/list")
    private ApiResponse<?> findReport(@RequestParam("ohtSn") String ohtSn
            , @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate, @RequestParam("time") String time
            ,@RequestParam("wheelPosition") String wheelPosition,@RequestParam("errorFlag") int errorFlag,@RequestParam("page") int page) {
        log.info("Report FindReport Start");
        try {
            return ApiResponse.success(SuccessCode.READ_REPORT_LIST, reportService.findReport(QuestionDto.builder()
                    .ohtSn(ohtSn).startDate(startDate).endDate(endDate).time(time).wheelPosition(wheelPosition).page(page).errorFlag(errorFlag)
                    .build()));
        }catch (JPAException jpaException){
            log.error("DashBoard Error : " + jpaException.getMessage());
            return ApiResponse.error(ErrorCode.JPA_NOT_FIND);
        } catch (Exception e) {
            log.error("Report FindReport Error : " + e.getMessage());
            return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
        }
    }

    @GetMapping("/detail/{wheelChcekId}")
    private ApiResponse<?> findReportDetail(@PathVariable("wheelChcekId") long wheelChcekId) {
        log.info("Report findReportDetail Start");
        try {
            return ApiResponse.success(SuccessCode.READ_REPORT_DETAIL, reportService.findReportDetail(wheelChcekId));
        }catch (JPAException jpaException){
            log.error("DashBoard Error : " + jpaException.getMessage());
            return ApiResponse.error(ErrorCode.JPA_NOT_FIND);
        } catch (Exception e) {
            slackController.send("Report findReportDetail Error : " + e.getMessage());
            log.error("Report findReportDetail Error : " + e.getMessage());
            return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
        }
    }
}
