package com.ssafy.semes.wheel.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class WheelEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="wheel_id", nullable = false)
	private long wheelId;

	@Column(name="wheel_sn",length = 10, nullable = false)
	private String wheelSN;

}
