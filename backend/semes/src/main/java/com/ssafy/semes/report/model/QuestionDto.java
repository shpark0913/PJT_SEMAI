package com.ssafy.semes.report.model;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class QuestionDto {
    private String ohtSn;
    private String startDate;
    private String endDate;
    private String time;
    private String wheelPosition;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int page;
    private int errorFlag;
    private int descFlag;
}
