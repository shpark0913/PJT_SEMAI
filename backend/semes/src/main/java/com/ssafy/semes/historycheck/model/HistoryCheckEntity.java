package com.ssafy.semes.historycheck.model;

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
public class HistoryCheckEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="check_id")
	private long checkId;

	@CreatedDate
	@Column(name="check_date", nullable = false)
	private LocalDateTime checkDate;

	@Column(name="user_idx", nullable = false)
	private long userIdx;
	@Column(name="wheel_history_id", nullable = false)
	private long wheelHistoryId;

}
