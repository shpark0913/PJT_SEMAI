package com.ssafy.semes.oht.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.semes.oht.model.OHTEntity;

@Repository
public interface OHTRepository extends JpaRepository<OHTEntity,Long> {
	Optional<OHTEntity> findByOhtSN(String ohtSn);

	@Query("select o from OHTEntity  o left join fetch o.ohtChecks")
	List<OHTEntity> findAllFetch();
}
