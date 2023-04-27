package com.ssafy.semes.ohtcheck.model.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.semes.exception.InvaildOHTSerialNo;
import com.ssafy.semes.oht.model.OHTEntity;
import com.ssafy.semes.oht.model.repository.OHTRepository;
import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;
import com.ssafy.semes.ohtcheck.model.repository.OHTCheckRepository;
import com.ssafy.semes.wheelcheck.model.WheelCheckEntity;

@Service
public class OHTCheckServiceImpl implements OHTCheckService {
	@Autowired
	OHTCheckRepository ohtCheckRepository;
	@Autowired
	OHTRepository ohtRepository;

	public OHTCheckEntity createOhtCheck(String ohtSn) throws InvaildOHTSerialNo{
		Optional<OHTEntity> oht = ohtRepository.findByOhtSN(ohtSn);

		if(oht.isEmpty()){
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
		if(check.isPresent()){
			List<WheelCheckEntity> wheelChecks = check.get().getWheelChecks();
			int goodCount = 0;
			int lostCount = 0;
			int brokenCount = 0;
			int ambigueCount = 0;

			for (WheelCheckEntity wheelCheck:
			wheelChecks) {
				goodCount += wheelCheck.getBoltGoodCount();
				lostCount += wheelCheck.getBoltOutCount();
				brokenCount += wheelCheck.getBoltLoseCount();
				ambigueCount += wheelCheck.getUnclassifiedCount();
			}
			check.get().setGoodCount(goodCount);
			check.get().setOutCount(lostCount);
			check.get().setLoseCount(brokenCount);
			check.get().setUnclassifiedCount(ambigueCount);
			check.get().setOhtCheckEndDatetime(LocalDateTime.now());

		}
	}
}
