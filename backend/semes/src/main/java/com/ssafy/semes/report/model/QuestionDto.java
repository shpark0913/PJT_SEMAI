package com.ssafy.semes.report.model;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class QuestionDto {
    private String ohtSn;
    private String date;
    private String time;
    private String wheelPosition;
    private String startTime;
    private String endTime;
    private int page;
}
