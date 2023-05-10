package com.ssafy.semes.dashboard.model.service;

import com.ssafy.semes.dashboard.model.DashboardMainResponseDto;
import com.ssafy.semes.dashboard.model.OHTCheckResponseDto;
import com.ssafy.semes.exception.JPAException;
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
import java.time.LocalDateTime;
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
    public List<OHTCheckResponseDto> findAllCheck() throws Exception {
        List<OHTCheckEntity> list = ohtCheckRepository.findAllJoinFetch();
        if(list==null){
            throw  new JPAException();
        }
        return list.stream().map(m->{
            OHTCheckResponseDto ohtDto = OHTCheckResponseDto.builder()
                    .ohtCheckId(m.getOhtCheckId())
                    .ohtCheckStartDatetime(m.getOhtCheckStartDatetime())
                    .ohtCheckEndDatetime(m.getOhtCheckEndDatetime())
                    .ohtId(m.getOht().getOhtId())
                    .ohtSn(m.getOht().getOhtSN())
                    .build();
            ohtDto.setFlCount(m.getFlBadCount());
            ohtDto.setFrCount(m.getFrBadCount());
            ohtDto.setRlCount(m.getRlBadCount());
            ohtDto.setRrCount(m.getRrBadCount());

            return ohtDto;
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<DashboardMainResponseDto> findAllMain(long id) throws Exception {
        List<WheelCheckEntity> list = wheelCheckRepository.findByOhtCheck(OHTCheckEntity.builder().ohtCheckId(id).build());

        if(list==null){
            throw  new JPAException();
        }
        log.info("OHTCheckResponseDto : " + list);
        LocalDateTime ohtCheckDatetime = list.get(0).getOhtCheck().getOht().getCheckDate();
        LocalDateTime ohtChangeDate = list.get(0).getOhtCheck().getOht().getChangeDate();
        String oht_sn = list.get(0).getOhtCheck().getOht().getOhtSN();

        return list.stream().map(m->{
            return DashboardMainResponseDto.builder()
                    .ohtCheckDatetime(ohtCheckDatetime)
                    .ohtChangeDate(ohtChangeDate)
                    .oht_sn(oht_sn)
                    .boltGoodCount(m.getBoltGoodCount())
                    .boltOutCount(m.getBoltOutCount())
                    .boltLoseCount(m.getBoltLoseCount())
                    .unclassifiedCount(m.getUnclassifiedCount())
                    .wheelPosition(m.getWheelPosition())
                    .build();
        }).collect(Collectors.toList());
    }
}
