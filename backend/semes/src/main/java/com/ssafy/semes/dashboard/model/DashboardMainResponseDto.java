package com.ssafy.semes.dashboard.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class DashboardMainResponseDto {
    private LocalDateTime ohtCheckDatetime;
    private LocalDateTime ohtChangeDate;
    private String oht_sn;
    private int boltGoodCount;
    private int boltOutCount;
    private int boltLoseCount;
    private int unclassifiedCount;
    private String wheelPosition;
    private String image;
}
