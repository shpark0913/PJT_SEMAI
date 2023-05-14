package com.ssafy.semes.report.model;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class ReportListResponseDto {
    private String ohtSn;
    private int boltGoodCount;
    private int boltOutCount;
    private int boltLoseCount;
    private int totalGoodCount;
    private int totalOutCount;
    private int totalLostCoutn;
    private LocalDateTime wheelCheckDate;
    private long wheelCheckId;
    private String wheelPosition;
    private String markingUrl;
    private String originUrl;
}
