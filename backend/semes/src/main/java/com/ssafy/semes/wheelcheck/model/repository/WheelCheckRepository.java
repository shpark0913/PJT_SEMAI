package com.ssafy.semes.wheelcheck.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.semes.wheelcheck.model.WheelCheckEntity;

@Repository
public interface WheelCheckRepository extends JpaRepository<WheelCheckEntity,Long> {

}
