package com.ssafy.semes.wheelhistory.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WheelHistoryController {
	@GetMapping("/api/wheels")
	public ResponseEntity<?> findAllWheelHistory(){

		return 	new ResponseEntity<Void>(HttpStatus.OK);
	}

}
