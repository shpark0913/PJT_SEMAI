package com.ssafy.semes.wheelcheck.model.repository;

import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.semes.wheelcheck.model.WheelCheckEntity;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface WheelCheckRepository extends JpaRepository<WheelCheckEntity,Long> {

    @Transactional(readOnly = true)
    List<WheelCheckEntity> findByOhtCheck(OHTCheckEntity ohtCheck);
}
