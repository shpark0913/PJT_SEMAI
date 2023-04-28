package com.ssafy.semes.ohtcheck.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;

import java.util.List;

@Repository
public interface OHTCheckRepository extends JpaRepository<OHTCheckEntity,Long> {

    @Query("select o from OHTCheckEntity o join fetch o.oht join  fetch  o.wheelChecks")
    List<OHTCheckEntity> findAllJoinFetch();
}
