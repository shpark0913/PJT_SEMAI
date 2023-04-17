package com.ssafy.semes.historycheck.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HistoryCheckController {
	@GetMapping("/api/historychecks")
	public ResponseEntity<?> findAllHistoryCheck(){

		return 	new ResponseEntity<Void>(HttpStatus.OK);
	}

}
