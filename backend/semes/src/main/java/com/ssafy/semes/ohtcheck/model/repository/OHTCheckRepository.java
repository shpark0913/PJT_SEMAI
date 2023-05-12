package com.ssafy.semes.ohtcheck.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OHTCheckRepository extends JpaRepository<OHTCheckEntity,Long> {

    @Query("select o from OHTCheckEntity o join fetch o.oht where o.ohtCheckStartDatetime >:start And o.ohtCheckStartDatetime <:end order by o.ohtCheckStartDatetime desc")
    List<OHTCheckEntity> findAllJoinFetch(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
