package com.ssafy.semes.report.model.service;

import com.ssafy.semes.report.model.QuestionDto;
import com.ssafy.semes.report.model.ReportListResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Objects;

public interface ReportService {
    Map<String, Object> findReport(QuestionDto dto) throws Exception;
    ReportListResponseDto findReportDetail(long wheelChcekId) throws Exception;
}
