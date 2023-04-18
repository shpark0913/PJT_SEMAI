package com.ssafy.semes.wheelcheck.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.springframework.data.annotation.CreatedDate;

import com.ssafy.semes.image.model.ImageEntity;
import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class WheelCheckEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "wheel_chcek_id", nullable = false)
	private long wheelHistoryId;

	@CreatedDate
	@Column(name="wheel_check_date", nullable = false)
	private LocalDateTime checkDate;
	@Column(name="wheel_check_result", nullable = false)
	private int checkResult;

	@Column(name="bolt_good_count", nullable = false)
	private int boltGoodCount;
	@Column(name="bolt_out_count", nullable = false)
	private int boltOutCount;
	@Column(name="bolt_lose_count", nullable = false)
	private int boltLoseCount;
	@Column(name="bolt_unclassified_count", nullable = false)
	private int unclassifiedCount;
	@Column(name="wheel_position", nullable = false)
	private String wheelPosition;

	@ManyToOne
	@JoinColumn(name="oht_check_id")
	private OHTCheckEntity ohtCheck;

	@OneToOne
	@JoinColumn(name="file_id")
	private ImageEntity image;

}
