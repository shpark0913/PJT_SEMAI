package com.ssafy.semes.wheelcheckconfirm.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.semes.wheelcheckconfirm.model.repository.WheelCheckConfirmRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class WheelCheckConfirmServiceImpl implements WheelCheckConfirmService{
	@Autowired
	WheelCheckConfirmRepository wheelCheckConfirmRepository;

}
