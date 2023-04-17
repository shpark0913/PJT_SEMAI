package com.ssafy.semes.wheelhistory.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.semes.wheelhistory.model.WheelHistoryEntity;

public interface WheelHistoryRepository extends JpaRepository<WheelHistoryEntity,Long> {

}
