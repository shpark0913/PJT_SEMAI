package com.ssafy.semes.historycheck.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.semes.historycheck.model.HistoryCheckEntity;

public interface HistoryCheckRepository extends JpaRepository<HistoryCheckEntity,Long> {
}
