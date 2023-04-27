package com.ssafy.semes.image.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.semes.image.model.ImageEntity;

public interface ImageRepository extends JpaRepository<ImageEntity,Long> {
	List<ImageEntity>  findByFileDirAndIsDeletedNot(String fileDir,boolean isDeleted);

	@Modifying(clearAutomatically = true)
	@Query("update ImageEntity i set i.fileDir=:fileDir where i.fileId in :fileIds")
	int updateFileDirByFileIds(@Param("fileDir") String fileDir, @Param("fileIds") Long[] fileIds);
	@Modifying(clearAutomatically = true)
	@Query("update ImageEntity i set i.isDeleted=1 where i.fileId in :fileIds")
	int updateIsDeletedByFileIds( @Param("fileIds") Long[] fileIds);
}
