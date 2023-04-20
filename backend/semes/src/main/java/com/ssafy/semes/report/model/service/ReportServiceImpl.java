package com.ssafy.semes.report.model.service;

import com.ssafy.semes.report.model.ReportListResponseDto;
import com.ssafy.semes.wheelcheck.model.WheelCheckEntity;
import com.ssafy.semes.wheelcheck.model.repository.WheelCheckRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ReportServiceImpl implements ReportService{
    @Autowired
    private WheelCheckRepository wheelCheckRepository;
    @Override
    @Transactional
    public List<ReportListResponseDto> findReport(Pageable page) throws Exception {
        List<WheelCheckEntity> list = wheelCheckRepository.findAll(page).getContent();
        String oht_sn = list.get(0).getOhtCheck().getOht().getOhtSN();
        log.info("findReport" + list);
        return list.stream().map(m->{
            return ReportListResponseDto.builder()
                    .oht_sn(oht_sn)
                    .boltGoodCount(m.getBoltGoodCount())
                    .wheelCheckDate(m.getCheckDate())
                    .wheelChcekId(m.getWheelHistoryId())
                    .wheelPosition(m.getWheelPosition())
                    .build();
        }).collect(Collectors.toList());
    }
}
