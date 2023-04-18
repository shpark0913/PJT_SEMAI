package com.ssafy.semes.ohtcheck.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.semes.ohtcheck.model.service.OHTCheckService;

@RestController
public class OHTCheckController {
	@Autowired
	OHTCheckService ohtCheckService;
}
