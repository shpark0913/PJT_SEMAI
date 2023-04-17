package com.ssafy.semes.wheelhistory.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.annotation.CreatedDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class WheelHistoryEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "wheel_history_id", nullable = false)
	private long wheelHistoryId;


	@CreatedDate
	@Column(name="check_date", nullable = false)
	private LocalDateTime checkDate;
	@Column(name="check_result", nullable = false)
	private int checkResult;

	@Column(name="good_count", nullable = false)
	private int goodCount;
	@Column(name="out_count", nullable = false)
	private int outCount;
	@Column(name="lose_count", nullable = false)
	private int loseResult;

	@Column(name = "wheel_id", nullable = false)
	private long wheelId;

	@Column(name = "file_id", nullable = false)
	private int file;

}
