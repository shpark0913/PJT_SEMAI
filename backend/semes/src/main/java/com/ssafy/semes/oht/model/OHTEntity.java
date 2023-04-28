package com.ssafy.semes.oht.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;

import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class OHTEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="oht_id", nullable = false)
	private long ohtId;

	@Column(name="oht_sn",length = 10, nullable = false,unique=true)
	private String ohtSN;


	@Fetch(FetchMode.SUBSELECT)
	@OneToMany(mappedBy = "oht")
	private List<OHTCheckEntity> ohtChecks;

	@CreatedDate
	@Column(name="check_date")
	private LocalDateTime checkDate;
	@LastModifiedDate
	@Column(name="change_date")
	private LocalDateTime changeDate;

}
