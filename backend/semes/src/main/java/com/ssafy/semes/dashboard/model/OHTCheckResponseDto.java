package com.ssafy.semes.dashboard.model;


import com.ssafy.semes.oht.model.OHTEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class OHTCheckResponseDto {
    private long ohtCheckId;
    private String ohtSn;
    private LocalDateTime ohtCheckStartDatetime;
    private LocalDateTime ohtCheckEndDatetime;
    private int flCount;
    private int frCount;
    private int rlCount;
    private int rrCount;
    private long ohtId;

}
