package com.ssafy.semes.ohtcheck.model.service;

import java.time.LocalDateTime;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.semes.exception.InvaildOHTSerialNo;
import com.ssafy.semes.oht.model.OHTEntity;
import com.ssafy.semes.oht.model.repository.OHTRepository;
import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;
import com.ssafy.semes.ohtcheck.model.repository.OHTCheckRepository;

@Service
public class OHTCheckServiceImpl implements OHTCheckService {
	@Autowired
	OHTCheckRepository ohtCheckRepository;
	@Autowired
	OHTRepository ohtRepository;

	public OHTCheckEntity createOhtCheck(String ohtSn) throws InvaildOHTSerialNo{
		Optional<OHTEntity> oht = ohtRepository.findByOhtSN(ohtSn);

		if(!oht.isPresent()){
			throw new InvaildOHTSerialNo();
		}

		OHTCheckEntity ohtCheck = OHTCheckEntity.builder()
			.oht(oht.get())
			.build();

		return ohtCheckRepository.save(ohtCheck);
	}
	@Transactional
	@Override
	public void updateOhtCheckEndDate(OHTCheckEntity ohtCheck){
		Optional<OHTCheckEntity> check = ohtCheckRepository.findById(ohtCheck.getOhtCheckId());
		if(check.isPresent())
			check.get().setOhtCheckEndDatetime(LocalDateTime.now());
	}
}
