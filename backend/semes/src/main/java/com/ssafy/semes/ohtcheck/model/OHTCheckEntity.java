package com.ssafy.semes.ohtcheck.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.data.annotation.CreatedDate;

import com.ssafy.semes.oht.model.OHTEntity;
import com.ssafy.semes.wheelcheck.model.WheelCheckEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class OHTCheckEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="oht_check_id")
	private long ohtCheckId;
	@CreatedDate
	@Column(name="oht_check_start_datetime", nullable = false)
	private LocalDateTime ohtCheckStartDatetime;
	@Column(name="oht_check_end_datetime", nullable = false)
	private LocalDateTime ohtCheckEndDatetime;

	@Column(name="good_count_total", nullable = false)
	private int goodCount;
	@Column(name="out_count_total", nullable = false)
	private int outCount;
	@Column(name="lose_count_total", nullable = false)
	private int loseCount;
	@Column(name="unclassified_count_total", nullable = false)
	private int unclassifiedCount;
	@ManyToOne
	@JoinColumn(name = "oht_id")
	private OHTEntity oht;

	@OneToMany(mappedBy = "ohtCheck")
	private List<WheelCheckEntity> wheelChecks;

}
