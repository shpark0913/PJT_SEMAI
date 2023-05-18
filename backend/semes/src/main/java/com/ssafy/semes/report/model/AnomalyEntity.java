package com.ssafy.semes.report.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(AnomalyEntityPK.class)
public class AnomalyEntity {

    @Id
    @Column(name = "oht_sn", nullable = false)
    private String ohtSn;

    @Id
    @Column(name = "wheel_position", nullable = false)
    private String wheelPosition;

    @Column(name="wheel_check_id", nullable = false)
    private long wheelCheckId;
    @Column(name="total_good_count", nullable = false)
    private int totalGoodCount;
    @Column(name="total_out_count", nullable = false)
    private int totalOutCount ;
    @Column(name="total_lose_count", nullable = false)
    private int totalLoseCount ;
    @Column(name="total_loose_count", nullable = false)
    private int totalLooseCount ;
    @Column(name="anomaly_flag", nullable = false)
    private int anomalyFlag;

}
