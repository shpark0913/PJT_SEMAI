package com.ssafy.semes.wheelcheckconfirm.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.springframework.data.annotation.CreatedDate;

import com.ssafy.semes.user.model.UserEntity;
import com.ssafy.semes.wheelcheck.model.WheelCheckEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class WheelCheckConfirmEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="check_id")
	private long checkId;

	@CreatedDate
	@Column(name="check_date", nullable = false)
	private LocalDateTime checkDate;

	@OneToOne
	@JoinColumn(name="user_idx")
	private UserEntity user;

	@OneToOne
	@JoinColumn(name = "wheel_chcek_id")
	private WheelCheckEntity wheelCheckEntity;

}
