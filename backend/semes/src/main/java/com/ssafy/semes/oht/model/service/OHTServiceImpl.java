package com.ssafy.semes.oht.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.semes.oht.model.repository.OHTRepository;

@Service
public class OHTServiceImpl implements OHTService {
	@Autowired
	OHTRepository ohtRepository;

}
