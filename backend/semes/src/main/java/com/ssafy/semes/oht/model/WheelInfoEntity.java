package com.ssafy.semes.oht.model;

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
public class WheelInfoEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "wheel_info_id", nullable = false)
	private long wheelInfoId;

	@Column(name="label", nullable = false)
	private int label;

	@Column(name="count", nullable = false)
	private int count;

}
