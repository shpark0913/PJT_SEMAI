package com.ssafy.semes.oht.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OHTEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="oht_id", nullable = false)
	private long ohtId;

	@Column(name="oht_sn",length = 10, nullable = false,unique=true)
	private String ohtSN;
	@OneToMany(mappedBy = "oht")
	private List<OHTCheckEntity> ohtChecks;
}
