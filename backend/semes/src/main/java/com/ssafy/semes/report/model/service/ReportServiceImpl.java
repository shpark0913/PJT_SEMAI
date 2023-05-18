package com.ssafy.semes.report.model.service;

import com.ssafy.semes.exception.JPAException;
import com.ssafy.semes.image.model.ImageEntity;
import com.ssafy.semes.oht.model.OHTEntity;
import com.ssafy.semes.report.model.AnomalyEntity;
import com.ssafy.semes.report.model.QuestionDto;
import com.ssafy.semes.report.model.ReportListResponseDto;
import com.ssafy.semes.report.model.repository.AnomalyRepository;
import com.ssafy.semes.wheelcheck.model.WheelCheckEntity;
import com.ssafy.semes.wheelcheck.model.repository.WheelCheckRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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
    @Autowired
    private AnomalyRepository anomalyRepository;
    private final int PAGE_SIZE = 20;
    @Value("${Ai-Api-Server-Ip}")
    private String ip;
    @Override
    @Transactional
    public Map<String,Object> findReport(QuestionDto dto) throws Exception {
        StringTokenizer st = new StringTokenizer(dto.getStartDate(),"-");
        int startyy =  Integer.parseInt(st.nextToken());
        int startmm =  Integer.parseInt(st.nextToken());
        int startdd= Integer.parseInt(st.nextToken());

        st = new StringTokenizer(dto.getEndDate(),"-");
        int endyy =  Integer.parseInt(st.nextToken());
        int endmm =  Integer.parseInt(st.nextToken());
        int enddd= Integer.parseInt(st.nextToken());
        //시간 기준으로 검색 데이터 생성
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

        //페이지 사이즈를 통해 반환 개수 설정
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
        //시간순 시간 역순 분기
        if(dto.getDescFlag()==1){
            sb.append(" order by e.checkDate desc");
        }else{
            sb.append(" order by e.checkDate");
        }

        Query query = em.createQuery(sb.toString(), WheelCheckEntity.class);

        //동적 sql 변수 삽입
        query.setParameter("start", dto.getStartTime());
        query.setParameter("end", dto.getEndTime());
        if (!dto.getOhtSn().equals("ALL")) {
            query.setParameter("sn", dto.getOhtSn());
        }
        if (!dto.getWheelPosition().equals("ALL")) {
            query.setParameter("position", dto.getWheelPosition());
        }

        //총 검색된 개수
        long totalPage = query.getResultStream().count();

        //다운로드 기능이 아닐 시 페이지링
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

        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date();
        date = sdf.parse(DateTimeFormatter.ofPattern("yyyyMMdd").format(wheel.getCheckDate()));
        Calendar cal = Calendar.getInstance(Locale.KOREA);

        //이번주 시작일 연산 ->일요일
        cal.setTime(date);
        cal.add(Calendar.DATE, 1 - cal.get(Calendar.DAY_OF_WEEK));
        sdf = new SimpleDateFormat("yyyy");
        int yy = Integer.parseInt(sdf.format(cal.getTime()));
        sdf = new SimpleDateFormat("MM");
        int mm =  Integer.parseInt(sdf.format(cal.getTime()));
        sdf = new SimpleDateFormat("dd");
        int dd =  Integer.parseInt(sdf.format(cal.getTime()));
        LocalDateTime start = LocalDateTime.of(LocalDate.of(yy,mm,dd),LocalTime.of(0,0,0));


        //이번주 종료일 연산 -> 토요일
        cal.setTime(date);
        cal.add(Calendar.DATE, 7 - cal.get(Calendar.DAY_OF_WEEK));
        sdf = new SimpleDateFormat("yyyy");
        yy = Integer.parseInt(sdf.format(cal.getTime()));
        sdf = new SimpleDateFormat("MM");
        mm =  Integer.parseInt(sdf.format(cal.getTime()));
        sdf = new SimpleDateFormat("dd");
        dd =  Integer.parseInt(sdf.format(cal.getTime()));
        LocalDateTime end = LocalDateTime.of(LocalDate.of(yy,mm,dd),LocalTime.of(23,59,59));

        OHTEntity oht = wheel.getOhtCheck().getOht();
        //해당 주 휠 조회
        List<WheelCheckEntity> wheels = wheelCheckRepository.findDate(start,end,oht.getOhtSN(),wheel.getWheelPosition());
        int tg=0,to=0,tl=0,tloo =0;
        for(WheelCheckEntity val : wheels){
            tg += val.getBoltGoodCount();
            to += val.getBoltOutCount();
            tl +=val.getBoltLoseCount();
            tloo += 11- val.getBoltGoodCount()- val.getBoltLoseCount()-val.getBoltOutCount();
        }
        ImageEntity image = wheel.getImage();
        if (wheel == null) {
            throw new JPAException();
        }
        log.info("WheelCheckEntity : " + wheel);
        return ReportListResponseDto.builder()
                .ohtSn(oht.getOhtSN())
                .boltGoodCount(wheel.getBoltGoodCount())
                .boltOutCount(wheel.getBoltOutCount())
                .boltLoseCount(wheel.getBoltLoseCount())
                .totalGoodCount(tg)
                .totalOutCount(to)
                .totalLoseCount(tl)
                .totalLooseCount(tloo)
                .wheelCheckDate(wheel.getCheckDate())
                .wheelCheckId(wheel.getWheelHistoryId())
                .wheelPosition(wheel.getWheelPosition())
                .markingUrl(image.markingUrl())
                .originUrl(image.originUrl())
                .build();
    }

    @Override
    public List<AnomalyEntity> goAnomaly() throws Exception {

        return anomalyRepository.findAll();


    }
}
