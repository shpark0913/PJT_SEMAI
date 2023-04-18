package com.ssafy.semes.wheelcheck.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.semes.wheelcheck.model.repository.WheelCheckRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class WheelCheckServiceImpl implements WheelCheckService {
	@Autowired
	WheelCheckRepository wheelCheckRepository;
}
