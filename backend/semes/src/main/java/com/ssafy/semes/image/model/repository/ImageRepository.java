package com.ssafy.semes.image.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.semes.image.model.ImageEntity;

public interface ImageRepository extends JpaRepository<ImageEntity,Long> {
}
