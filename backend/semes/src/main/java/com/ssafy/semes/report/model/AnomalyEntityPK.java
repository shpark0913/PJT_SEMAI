package com.ssafy.semes.report.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class AnomalyEntityPK implements Serializable {
    private String ohtSn;
    private String wheelPosition;
}
