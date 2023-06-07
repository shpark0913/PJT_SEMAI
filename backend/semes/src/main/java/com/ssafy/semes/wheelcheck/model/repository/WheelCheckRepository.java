package com.ssafy.semes.wheelcheck.model.repository;

import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;
import com.ssafy.semes.report.model.QuestionDto;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.semes.wheelcheck.model.WheelCheckEntity;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface WheelCheckRepository extends JpaRepository<WheelCheckEntity,Long> {

    @Transactional(readOnly = true)
    List<WheelCheckEntity> findByOhtCheck(OHTCheckEntity ohtCheck);

    @Query("select e from WheelCheckEntity  e join fetch e.ohtCheck oc join fetch oc.oht o where (e.checkDate between  :start  and :end) and o.ohtSN = :sn and e.wheelPosition = :position ")
    List<WheelCheckEntity> findDate(@Param("start")LocalDateTime start ,@Param("end") LocalDateTime end , @Param("sn")String sn, @Param("position")String position);
    WheelCheckEntity findByWheelHistoryId(long wheelHistoryId);


}
