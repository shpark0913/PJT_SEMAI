package com.ssafy.semes.report.model.service;

import com.ssafy.semes.report.model.QuestionDto;
import com.ssafy.semes.report.model.ReportListResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Objects;

public interface ReportService {

    /**
     * 검색 조건을 통해 데이터 베이스에서 휠 검사 기록 검색
     * @return WheelCheckEntity, totalPage
     */
    Map<String, Object> findReport(QuestionDto dto) throws Exception;

    /**
     * 휠 검사 기록 id를 통해 휠 상세 정보 검색
     * @return ReportListResponseDto
     */
    ReportListResponseDto findReportDetail(long wheelChcekId) throws Exception;
}
