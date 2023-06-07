package com.ssafy.semes.report.model;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class AnomalyWheelDTO {
    String wheel_id;
    int lost;
    int loose;
    int broken;
}
