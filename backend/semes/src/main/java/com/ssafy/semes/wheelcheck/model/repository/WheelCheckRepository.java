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

import java.util.List;


@Repository
public interface WheelCheckRepository extends JpaRepository<WheelCheckEntity,Long> {

    @Transactional(readOnly = true)
    List<WheelCheckEntity> findByOhtCheck(OHTCheckEntity ohtCheck);

    WheelCheckEntity findByWheelHistoryId(long wheelHistoryId);

//    @Query(value = "SELECT * FROM semes.wheel_check_entity e join ohtcheck_entity oe on e.oht_check_id = oe.oht_check_id join ohtentity o on oe.oht_id = o.oht_id" +
//            " where o.oht_sn = :sn and (e.wheel_check_date BETWEEN :start and :end) and e.wheel_position = :position" +
//            " limit 20 offset :page", nativeQuery = true)
//    List<WheelCheckEntity> findReport(@Param("sn") String sn, @Param("start")String start, @Param("end") String end, @Param("position")String position,@Param("page")int page);
//
//    @Query(value = "SELECT * FROM semes.wheel_check_entity e join ohtcheck_entity oe on e.oht_check_id = oe.oht_check_id join ohtentity o on oe.oht_id = o.oht_id" +
//            " where (e.wheel_check_date BETWEEN :start and :end) and e.wheel_position = :position" +
//            " limit 20 offset :page", nativeQuery = true)
//    List<WheelCheckEntity> findReportPosition(@Param("start")String start, @Param("end") String end, @Param("position")String position,@Param("page")int page);
//
//    @Query(value = "SELECT * FROM semes.wheel_check_entity e join ohtcheck_entity oe on e.oht_check_id = oe.oht_check_id join ohtentity o on oe.oht_id = o.oht_id" +
//            " where o.oht_sn = :sn and (e.wheel_check_date BETWEEN :start and :end)" +
//            " limit 20 offset :page", nativeQuery = true)
//    List<WheelCheckEntity> findReportSn(@Param("sn") String sn,@Param("start")String start, @Param("end") String end,@Param("page")int page);
//
//    @Query(value = "SELECT * FROM semes.wheel_check_entity e join ohtcheck_entity oe on e.oht_check_id = oe.oht_check_id join ohtentity o on oe.oht_id = o.oht_id" +
//            " where (e.wheel_check_date BETWEEN :start and :end)" +
//            " limit 20 offset :page", nativeQuery = true)
//    List<WheelCheckEntity> findReport(@Param("start")String start, @Param("end") String end,@Param("page")int page);

}
