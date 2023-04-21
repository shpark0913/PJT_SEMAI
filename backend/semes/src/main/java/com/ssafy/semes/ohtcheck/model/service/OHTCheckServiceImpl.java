package com.ssafy.semes.ohtcheck.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.semes.ohtcheck.model.repository.OHTCheckRepository;

@Service
public class OHTCheckServiceImpl implements OHTCheckService {
	@Autowired
	OHTCheckRepository ohtCheckRepository;

}
