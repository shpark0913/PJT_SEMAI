package com.ssafy.semes.image.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.semes.image.model.ImageEntity;

public interface ImageRepository extends JpaRepository<ImageEntity,Long> {
	List<ImageEntity> findByFileDirAndStatus(String fileDir,int status);
	List<ImageEntity> findTop100ByFileDirAndStatusOrderByFileIdDesc(String path, int i);

	@Modifying(clearAutomatically = true)
	@Query("update ImageEntity i set i.fileDir=:fileDir where i.fileId in :fileIds")
	int updateFileDirByFileIds(@Param("fileDir") String fileDir, @Param("fileIds") Long[] fileIds);
	@Modifying(clearAutomatically = true)
	@Query("update ImageEntity i set i.status=:status where i.fileId in :fileIds")
	int updateStatusByFileIds( @Param("fileIds") Long[] fileIds,@Param("status") int status);

}
