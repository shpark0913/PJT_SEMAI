package com.ssafy.semes.dashboard.model;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class DashboardMainResponseDto {
    private LocalDateTime CheckDatetime;
    private LocalDateTime ChangeDate;
}
