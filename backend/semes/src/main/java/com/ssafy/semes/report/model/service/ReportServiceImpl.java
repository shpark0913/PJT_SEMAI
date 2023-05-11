package com.ssafy.semes.report.model.service;

import com.ssafy.semes.exception.JPAException;
import com.ssafy.semes.image.model.ImageEntity;
import com.ssafy.semes.report.model.QuestionDto;
import com.ssafy.semes.report.model.ReportListResponseDto;
import com.ssafy.semes.wheelcheck.model.WheelCheckEntity;
import com.ssafy.semes.wheelcheck.model.repository.WheelCheckRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@SuppressWarnings("unchecked")
public class ReportServiceImpl implements ReportService {
    @Autowired
    private WheelCheckRepository wheelCheckRepository;
    @Autowired
    private EntityManager em;
    private final int PAGE_SIZE = 20;

    @Override
    @Transactional
    public Map<String,Object> findReport(QuestionDto dto) throws Exception {
        System.out.println(dto.getWheelPosition());
        StringTokenizer st = new StringTokenizer(dto.getStartDate(),"-");
        int startyy =  Integer.parseInt(st.nextToken());
        int startmm =  Integer.parseInt(st.nextToken());
        int startdd= Integer.parseInt(st.nextToken());

        st = new StringTokenizer(dto.getEndDate(),"-");
        int endyy =  Integer.parseInt(st.nextToken());
        int endmm =  Integer.parseInt(st.nextToken());
        int enddd= Integer.parseInt(st.nextToken());
        if (dto.getTime().equals("ALL")) {
            dto.setStartTime(LocalDateTime.of(LocalDate.of(startyy,startmm,startdd)
                    , LocalTime.of(0,0,0)));
            dto.setEndTime(LocalDateTime.of(LocalDate.of(endyy,endmm,enddd)
                    , LocalTime.of(23,59,59)));
        } else {
            dto.setStartTime(LocalDateTime.of(LocalDate.of(startyy,startmm,startdd)
                    , LocalTime.of(Integer.parseInt(dto.getTime()),0,0)));
            dto.setEndTime(LocalDateTime.of(LocalDate.of(endyy,endmm,enddd)
                    , LocalTime.of(Integer.parseInt(dto.getTime()),59,59)));
        }

        dto.setPage((dto.getPage() - 1) * PAGE_SIZE);

        StringBuilder sb = new StringBuilder();
        sb.append("SELECT e FROM WheelCheckEntity e join fetch e.ohtCheck oe join fetch oe.oht o join fetch e.image img ")
                .append(" where (e.checkDate BETWEEN :start and :end)");

        if (!dto.getOhtSn().equals("ALL")) {
            sb.append(" and o.ohtSN = :sn ");
        }
        if (!dto.getWheelPosition().equals("ALL")) {
            sb.append(" and e.wheelPosition = :position");
        }
        if(dto.getErrorFlag()==1){
            sb.append(" and e.boltGoodCount != 11");
        }
        if(dto.getDescFlag()==1){
            sb.append(" order by e.checkDate desc");
        }else{
            sb.append(" order by e.checkDate");
        }
        //sb.append(" limit :size offset :page");
        Query query = em.createQuery(sb.toString(), WheelCheckEntity.class);

        query.setParameter("start", dto.getStartTime());
        query.setParameter("end", dto.getEndTime());
        if (!dto.getOhtSn().equals("ALL")) {
            query.setParameter("sn", dto.getOhtSn());
        }
        if (!dto.getWheelPosition().equals("ALL")) {
            query.setParameter("position", dto.getWheelPosition());
        }
        long totalPage = query.getResultStream().count();
        if(!dto.isDownloadFlag()) {
            query.setFirstResult(dto.getPage());
            query.setMaxResults(PAGE_SIZE);
        }
        List<WheelCheckEntity> list = query.getResultList();

        if (list == null) {
            throw new JPAException();
        }
        Map<String,Object> ruturnObj = new HashMap();

        ruturnObj.put("result",list.stream().map(m -> {
            return ReportListResponseDto.builder()
                    .ohtSn(m.getOhtCheck().getOht().getOhtSN())
                    .boltGoodCount(m.getBoltGoodCount())
                    .wheelCheckDate(m.getCheckDate())
                    .wheelCheckId(m.getWheelHistoryId())
                    .wheelPosition(m.getWheelPosition())
                    .build();
        }).collect(Collectors.toList()));
        ruturnObj.put("totalPage",totalPage);
        return ruturnObj;
    }

    @Override
    @Transactional
    public ReportListResponseDto findReportDetail(long wheelChcekId) throws Exception {
        WheelCheckEntity wheel = wheelCheckRepository.findByWheelHistoryId(wheelChcekId);
        ImageEntity image = wheel.getImage();
        if (wheel == null) {
            throw new JPAException();
        }
        log.info("WheelCheckEntity : " + wheel);
        return ReportListResponseDto.builder()
                .ohtSn(wheel.getOhtCheck().getOht().getOhtSN())
                .boltGoodCount(wheel.getBoltGoodCount())
                .wheelCheckDate(wheel.getCheckDate())
                .wheelCheckId(wheel.getWheelHistoryId())
                .wheelPosition(wheel.getWheelPosition())
                .markingUrl(image.markingUrl())
                .originUrl(image.originUrl())
                .build();
    }
}
