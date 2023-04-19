package com.ssafy.semes.dashboard.model.service;

import com.ssafy.semes.dashboard.model.OHTCheckResponseDto;
import com.ssafy.semes.oht.model.OHTEntity;
import com.ssafy.semes.oht.model.OHTResponseDto;
import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;
import com.ssafy.semes.ohtcheck.model.repository.OHTCheckRepository;
import com.ssafy.semes.wheelcheck.model.WheelCheckEntity;
import com.ssafy.semes.wheelcheck.model.repository.WheelCheckRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.beans.Transient;
import java.sql.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class DashboardServiceImpl implements DashboardService{
    @Autowired
    private OHTCheckRepository ohtCheckRepository;
    @Autowired
    private WheelCheckRepository wheelCheckRepository;
    @Override
    @Transactional
    public List<OHTCheckResponseDto> findAllCheck() {
        List<OHTCheckEntity> list = ohtCheckRepository.findAll();

        return list.stream().map(m->{
            OHTCheckResponseDto ohtDto = OHTCheckResponseDto.builder()
                    .ohtCheckId(m.getOhtCheckId())
                    .ohtCheckStartDatetime(m.getOhtCheckStartDatetime())
                    .ohtCheckEndDatetime(m.getOhtCheckEndDatetime())
                    .goodCount(m.getGoodCount())
                    .outCount(m.getOutCount())
                    .loseCount(m.getLoseCount())
                    .unclassifiedCount(m.getUnclassifiedCount())
                    .ohtId(m.getOht().getOhtId())

                    .build();
            ohtDto.setWheelHistoryId(new ArrayList<Long>());
            for(WheelCheckEntity val : m.getWheelChecks()){
                ohtDto.getWheelHistoryId().add(val.getWheelHistoryId());
            }
            log.info("OHTCheckResponseDto : " + ohtDto);
            return ohtDto;
        }).collect(Collectors.toList());
    }
}
