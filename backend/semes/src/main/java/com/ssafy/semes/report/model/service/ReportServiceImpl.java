package com.ssafy.semes.report.model.service;

import com.ssafy.semes.report.model.QuestionDto;
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
    private final int PAGE_SIZE = 20;
    @Override
    @Transactional
    public List<ReportListResponseDto> findReport(QuestionDto dto) throws Exception {
        if(dto.getTime().equals("ALL")){
            dto.setStartTime(dto.getDate()+" 00:00:00");
            dto.setEndTime(dto.getDate()+" 23:59:59");
        }else {
            dto.setStartTime(dto.getDate()+" "+dto.getTime()+":00:00");
            dto.setEndTime(dto.getDate()+" "+dto.getTime()+":59:59");
        }
        dto.setPage((dto.getPage()-1)*PAGE_SIZE);
        List<WheelCheckEntity> list;
        if(dto.getOhtSn().equals("ALL")&&dto.getWheelPosition().equals("ALL")){
            log.info("Report OhtSm ALL WheelPosition ALL");
            list= wheelCheckRepository.findReport(dto.getStartTime(), dto.getEndTime(),dto.getPage());

        }else if(dto.getOhtSn().equals("ALL")){
            log.info("Report OhtSm ALL");
            list= wheelCheckRepository.findReportPosition(dto.getStartTime(), dto.getEndTime(),dto.getWheelPosition(),dto.getPage());

        }else if(dto.getWheelPosition().equals("ALL")){
            log.info("Report WheelPosition ALL");
            list= wheelCheckRepository.findReportSn(dto.getOhtSn(),dto.getStartTime(), dto.getEndTime(),dto.getPage());

        }else{
            log.info("Report NOT ALL");
            list= wheelCheckRepository.findReport(dto.getOhtSn(),dto.getStartTime(), dto.getEndTime(),dto.getWheelPosition(),dto.getPage());
        }
        if(list==null){
            throw new RuntimeException("findReport wheelCheckRepository null");
        }
        return list.stream().map(m->{
            return ReportListResponseDto.builder()
                    .ohtSn(m.getOhtCheck().getOht().getOhtSN())
                    .boltGoodCount(m.getBoltGoodCount())
                    .wheelCheckDate(m.getCheckDate())
                    .wheelChcekId(m.getWheelHistoryId())
                    .wheelPosition(m.getWheelPosition())
                    .build();
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ReportListResponseDto findReportDetail(long wheelChcekId) throws Exception {
        WheelCheckEntity wheel = wheelCheckRepository.findByWheelHistoryId(wheelChcekId);
        if(wheel==null){
            throw new RuntimeException("findReportDetail wheelCheckRepository null");
        }
        log.info("WheelCheckEntity : "+wheel);
        return ReportListResponseDto.builder()
                .ohtSn(wheel.getOhtCheck().getOht().getOhtSN())
                .boltGoodCount(wheel.getBoltGoodCount())
                .wheelCheckDate(wheel.getCheckDate())
                .wheelChcekId(wheel.getWheelHistoryId())
                .wheelPosition(wheel.getWheelPosition())
                .build();
    }
}
