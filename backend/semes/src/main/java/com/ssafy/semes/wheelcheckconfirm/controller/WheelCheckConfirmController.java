package com.ssafy.semes.wheelcheckconfirm.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WheelCheckConfirmController {
	@GetMapping("/api/historychecks")
	public ResponseEntity<?> findAllHistoryCheck(){

		return 	new ResponseEntity<Void>(HttpStatus.OK);
	}

}
