package com.ssafy.semes.dashboard.model.service;

import com.ssafy.semes.dashboard.model.DashboardMainResponseDto;
import com.ssafy.semes.dashboard.model.OHTCheckResponseDto;
import com.ssafy.semes.ohtcheck.model.OHTCheckEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DashboardService {
    /**
     * 당일 OHT 검사 정보 반환
     * @return List - OHTCheckResponseDto
     */
    List<OHTCheckResponseDto> findAllCheck() throws Exception;
    /**
     * 해당 OHT의 4개 휠 검사 정보 반환\
     * @param ohtId
     * @return List - DashboardMainResponseDto
     */
    List<DashboardMainResponseDto> findAllMain(long ohtId) throws Exception;
}
