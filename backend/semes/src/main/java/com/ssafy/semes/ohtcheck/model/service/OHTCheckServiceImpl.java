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
	int TOTAL_BOLT_COUNT = 11;
	/**
	 * {@summary OHT 검사 기록}
	 * OHT 검사 기록을 생성한다.
	 * @param ohtSn 검사가 시작된 OHT 시리얼 넘
	 * @return 생성된 OHT 검사 객체
	 */
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

	/**
	 * {@summary OHT 검사 종료 시간 업데이트}
	 * OHT 검사 종료시 시간을 기록한다.
	 * @param ohtCheck 검사 완료 표시할 OHT 검사 객체
	 */
	@Transactional
	@Override
	public void updateOhtCheckEndDate(OHTCheckEntity ohtCheck){
		Optional<OHTCheckEntity> check = ohtCheckRepository.findById(ohtCheck.getOhtCheckId());
		if(check.isPresent()){
			List<WheelCheckEntity> wheelChecks = check.get().getWheelChecks();

			for (WheelCheckEntity wheelCheck:
			wheelChecks) {
				//각 바퀴 위치별로 전체 볼트 개수에서 정상 볼트 개수를 뺴, 불량 볼트 개수 총합을 저장한다.
				switch (wheelCheck.getWheelPosition()){
					case "FL":
						check.get().setFlBadCount(TOTAL_BOLT_COUNT-wheelCheck.getBoltGoodCount());
						break;
					case "FR":
						check.get().setFrBadCount(TOTAL_BOLT_COUNT-wheelCheck.getBoltGoodCount());
						break;
					case "RL":
						check.get().setRlBadCount(TOTAL_BOLT_COUNT-wheelCheck.getBoltGoodCount());
						break;
					case "RR":
						check.get().setRrBadCount(TOTAL_BOLT_COUNT-wheelCheck.getBoltGoodCount());
						break;
				}
			}
			LocalDateTime ldt = LocalDateTime.now();
			//검사 종료 시간 저장
			check.get().setOhtCheckEndDatetime(ldt);
			check.get().getOht().setCheckDate(ldt);
		}
	}
}
