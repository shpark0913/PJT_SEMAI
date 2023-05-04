package com.ssafy.semes.transition.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.semes.transition.model.TransitionConfig;

public interface TransitionRepository extends JpaRepository<TransitionConfig,Long> {
	List<TransitionConfig> findAll();
}
