package com.ssafy.semes.ohtcheck.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;
@Repository
public interface OHTCheckRepository extends JpaRepository<OHTCheckEntity,Long> {
}
