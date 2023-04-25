package com.ssafy.semes.ohtcheck.model.service;

import com.ssafy.semes.exception.InvaildOHTSerialNo;
import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;

public interface OHTCheckService {
	OHTCheckEntity createOhtCheck(String ohtSn) throws InvaildOHTSerialNo;
	void updateOhtCheckEndDate(OHTCheckEntity ohtCheck);
}
