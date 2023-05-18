package com.ssafy.semes.report.model.repository;

import com.ssafy.semes.report.model.AnomalyEntity;
import com.ssafy.semes.report.model.AnomalyEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnomalyRepository extends JpaRepository<AnomalyEntity, AnomalyEntityPK> {

}
