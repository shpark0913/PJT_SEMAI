package com.ssafy.semes.oht.model.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.semes.exception.InvaildOHTSerialNo;
import com.ssafy.semes.oht.model.OHTEntity;
import com.ssafy.semes.oht.model.OHTRequestDto;
import com.ssafy.semes.oht.model.OHTResponseDto;
import com.ssafy.semes.oht.model.repository.OHTRepository;
import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OHTServiceImpl implements OHTService {
	@Autowired
	OHTRepository ohtRepository;

	@Override
	@Transactional
	public OHTEntity saveOHT(OHTRequestDto ohtRequest) {

		OHTEntity oht = OHTEntity.builder().ohtSN(ohtRequest.getOhtSN()).build();
		return ohtRepository.save(oht);
	}

	@Override
	@Transactional
	public List<OHTResponseDto> getAllOHT() {
		List<OHTEntity> ohts = ohtRepository.findAll();

		return ohts.stream().map(m -> {
			OHTResponseDto ohtDto = OHTResponseDto.builder().serialNumber(m.getOhtSN()).build();
			for (OHTCheckEntity ohtCheck:
				m.getOhtChecks()) {
				ohtDto.getOhtChecks().add(ohtCheck);
			}
			return ohtDto;
		}).collect(
			Collectors.toList());
	}

	@Override
	@Transactional
	public OHTResponseDto getOHT(String ohtSN) {
		Optional<OHTEntity> oht = ohtRepository.findByOhtSN(ohtSN);
		OHTResponseDto ohtResponseDto = OHTResponseDto.builder().serialNumber(ohtSN).build();

		if(!oht.isPresent()) throw new InvaildOHTSerialNo();
		for (OHTCheckEntity ohtCheck:
			oht.get().getOhtChecks()) {
			ohtResponseDto.getOhtChecks().add(ohtCheck);
		}
		return ohtResponseDto;
	}
}
