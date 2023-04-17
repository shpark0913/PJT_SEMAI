package com.ssafy.semes.wheel.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.semes.wheel.model.WheelEntity;

public interface WheelRepository extends JpaRepository<WheelEntity,Long> {
}
