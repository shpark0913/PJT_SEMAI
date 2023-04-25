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

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Objects;
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
    public List<ReportListResponseDto> findReport(QuestionDto dto) throws Exception {
        if (dto.getTime().equals("ALL")) {
            dto.setStartTime(dto.getDate() + " 00:00:00");
            dto.setEndTime(dto.getDate() + " 23:59:59");
        } else {
            dto.setStartTime(dto.getDate() + " " + dto.getTime() + ":00:00");
            dto.setEndTime(dto.getDate() + " " + dto.getTime() + ":59:59");
        }
        dto.setPage((dto.getPage() - 1) * PAGE_SIZE);

        StringBuilder sb = new StringBuilder();
        sb.append("SELECT * FROM semes.wheel_check_entity e join ohtcheck_entity oe on e.oht_check_id = oe.oht_check_id join ohtentity o on oe.oht_id = o.oht_id")
                .append(" where (e.wheel_check_date BETWEEN :start and :end)");

        if (!dto.getOhtSn().equals("ALL")) {
            sb.append("and o.oht_sn = :sn ");
        }
        if (!dto.getWheelPosition().equals("ALL")) {
            sb.append("and e.wheel_position = :position");
        }
        sb.append(" limit 20 offset :page");
        Query query = em.createNativeQuery(sb.toString(), WheelCheckEntity.class);

        query.setParameter("start", dto.getStartTime());
        query.setParameter("end", dto.getEndTime());
        if (!dto.getOhtSn().equals("ALL")) {
            query.setParameter("sn", dto.getOhtSn());
        }
        if (!dto.getWheelPosition().equals("ALL")) {
            query.setParameter("position", dto.getWheelPosition());
        }
        query.setParameter("page", dto.getPage());
        List<WheelCheckEntity> list = query.getResultList();

        if (list == null) {
            throw new RuntimeException("findReport wheelCheckRepository null");
        }
        return list.stream().map(m -> {
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
        if (wheel == null) {
            throw new RuntimeException("findReportDetail wheelCheckRepository null");
        }
        log.info("WheelCheckEntity : " + wheel);
        return ReportListResponseDto.builder()
                .ohtSn(wheel.getOhtCheck().getOht().getOhtSN())
                .boltGoodCount(wheel.getBoltGoodCount())
                .wheelCheckDate(wheel.getCheckDate())
                .wheelChcekId(wheel.getWheelHistoryId())
                .wheelPosition(wheel.getWheelPosition())
                .build();
    }
}
