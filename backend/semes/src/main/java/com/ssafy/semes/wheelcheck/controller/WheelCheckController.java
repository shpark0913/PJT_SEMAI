package com.ssafy.semes.wheelcheck.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WheelCheckController {
	@GetMapping("/api/wheels")
	public ResponseEntity<?> findAllWheelHistory(){

		return 	new ResponseEntity<Void>(HttpStatus.OK);
	}

}
