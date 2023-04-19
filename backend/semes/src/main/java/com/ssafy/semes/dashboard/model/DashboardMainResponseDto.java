package com.ssafy.semes.dashboard.model;

import com.ssafy.semes.image.model.ImageEntity;
import lombok.*;

import java.time.LocalDateTime;

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
}
