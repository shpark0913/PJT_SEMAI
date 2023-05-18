package com.ssafy.semes.report.model;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class PredictDTO {
    Double predictNum;
    int lost;
    int loose;
    int broken;
}
