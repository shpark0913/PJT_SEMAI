package com.ssafy.semes.report.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class WheelCheckDTO {
    private String ohtSn;
    private int boltGoodCount;
    private LocalDateTime wheelCheckDate;
    private long wheelChcekId;
    private String wheelPosition;
    private long totalPage;
}
