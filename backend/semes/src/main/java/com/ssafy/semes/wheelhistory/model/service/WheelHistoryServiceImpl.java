package com.ssafy.semes.wheelhistory.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.semes.wheelhistory.model.repository.WheelHistoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class WheelHistoryServiceImpl implements WheelHistoryService {
	@Autowired
	WheelHistoryRepository wheelHistoryRepository;
}
