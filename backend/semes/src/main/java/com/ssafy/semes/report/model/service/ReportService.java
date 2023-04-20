package com.ssafy.semes.report.model.service;

import com.ssafy.semes.report.model.ReportListResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReportService {
    List<ReportListResponseDto> findReport(Pageable page) throws Exception;
}
