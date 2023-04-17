package com.ssafy.semes.historycheck.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.semes.historycheck.model.repository.HistoryCheckRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class HistoryCheckServiceImpl implements HistoryCheckService{
	@Autowired
	HistoryCheckRepository historyCheckRepository;

}
