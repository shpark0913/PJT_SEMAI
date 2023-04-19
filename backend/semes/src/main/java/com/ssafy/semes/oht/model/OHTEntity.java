package com.ssafy.semes.oht.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class OHTEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="oht_id", nullable = false)
	private long ohtId;

	@Column(name="oht_sn",length = 10, nullable = false,unique=true)
	private String ohtSN;
	@OneToMany(mappedBy = "oht")
	private List<OHTCheckEntity> ohtChecks;

	@Column(name="check_date",nullable = false)
	private LocalDateTime checkDate;
	@Column(name="change_date",nullable = false)
	private LocalDateTime changeDate;

}
