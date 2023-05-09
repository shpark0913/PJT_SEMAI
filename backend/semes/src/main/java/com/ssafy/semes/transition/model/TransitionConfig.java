package com.ssafy.semes.transition.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Getter
@ToString
public class TransitionConfig {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="tc_id", nullable = false)
	private Long tcId;

	@Column(name = "accuracy")
	private Double accuracy;

	@Column(name = "loss")
	private Double loss;

	@Column(name = "fscore")
	private Double fscore;

}
