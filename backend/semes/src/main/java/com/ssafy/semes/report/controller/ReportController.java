package com.ssafy.semes.report.controller;

import com.google.gson.Gson;
import com.ssafy.semes.common.ErrorCode;
import com.ssafy.semes.common.SuccessCode;
import com.ssafy.semes.common.dto.ApiResponse;
import com.ssafy.semes.exception.JPAException;
import com.ssafy.semes.report.model.QuestionDto;
import com.ssafy.semes.report.model.ReportListResponseDto;
import com.ssafy.semes.report.model.service.ReportService;
import com.ssafy.semes.util.SlackController;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;

@RestController
@RequestMapping("/report")
@Slf4j
public class ReportController {
    @Autowired
    private ReportService reportService;

    @Autowired
    private SlackController slackController;

    private int TOTAL_BOLT=11;
    private StringTokenizer st;
    private StringBuilder sb;
    @Value("${Ai-Api-Server-Ip}")
    private String ip;
    /**
     * {@summary 레포트 페이지 검색 및 조건 검색}
     * <P>반환 - WheelCheckEntity, totalPage <P/>
     * 제약사항 - ohtSn - ALL or oht_sn <br>
     * startDate - yyyy-MM-dd <br>
     * endDate - yyyy-MM-dd <br>
     * time - ALL or 0~23 <br>
     * wheelPosition - ALL or FL,FR,RL,RR <br>
     * errorFlag - 0 or 1 <br>
     * page - 1~N <br>
     * descFlag - 0 or 1 <br>
     */
    @GetMapping("/list")
    public ApiResponse<?> findReport(@RequestParam("ohtSn") String ohtSn
            , @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate, @RequestParam("time") String time
            , @RequestParam("wheelPosition") String wheelPosition, @RequestParam("errorFlag") int errorFlag, @RequestParam("page") int page
            , @RequestParam("descFlag") int descFlag) {
        log.info("Report FindReport Start");
        try {
            return ApiResponse.success(SuccessCode.READ_REPORT_LIST, reportService.findReport(QuestionDto.builder()
                    .ohtSn(ohtSn)
                    .startDate(startDate)
                    .endDate(endDate)
                    .time(time)
                    .wheelPosition(wheelPosition)
                    .page(page)
                    .errorFlag(errorFlag)
                    .descFlag(descFlag)
                    .downloadFlag(false)
                    .build()));
        }catch (JPAException jpaException){
            log.error("DashBoard Error : " + jpaException.getMessage());
            return ApiResponse.error(ErrorCode.JPA_NOT_FIND);
        } catch (Exception e) {
            log.error("Report FindReport Error : " + e.getMessage());
            return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
        }
    }

    /**
     * {@summary 레포트 디테일 검색 결과}
     *
     * @param wheelChcekId
     * @return ReportListResponseDto
     */
    @GetMapping("/detail/{wheelChcekId}")
    public ApiResponse<?> findReportDetail(@PathVariable("wheelChcekId") long wheelChcekId) {
        log.info("Report findReportDetail Start");
        try {
            return ApiResponse.success(SuccessCode.READ_REPORT_DETAIL, reportService.findReportDetail(wheelChcekId));
        }catch (JPAException jpaException){
            log.error("DashBoard Error : " + jpaException.getMessage());
            return ApiResponse.error(ErrorCode.JPA_NOT_FIND);
        } catch (Exception e) {
            slackController.errorSend("Report findReportDetail Error : " + e.getMessage());
            log.error("Report findReportDetail Error : " + e.getMessage());
            return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
        }
    }


    /**
     * {@summary 이상 예측}
     * AI 서버에 Param (lost loose broken) 전송 후 반환 값 프론트로 반환
     * @param lost, loose, broken
     * @return AI 서버 반환값
     */
    @GetMapping("/predict")
    public ApiResponse<?> predict(@Param("lost")int lost, @Param("loose") int loose,@Param("broken") int broken){
        log.info("Report predict Start");
        try {
            //AIAPI 서버 URI
           String url = "http://"+ip+":8000/predict?lost="+lost+"&loose="+loose+"&broken="+broken;


            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();
            //http 통신 이후 반환 값을 받아온다.
            HttpResponse<String> httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            //body의 값을 json으로 변환
            String json = httpResponse.body();
            Gson gson = new Gson();
            //body값을 ApiResponse Class형태의 json으로 변환 후 전송
            return gson.fromJson(json.toString(),ApiResponse.class);
        }catch (JPAException jpaException){
            log.error("Report Error : " + jpaException.getMessage());
            return ApiResponse.error(ErrorCode.JPA_NOT_FIND);
        } catch (Exception e) {
            slackController.errorSend("Report predict Error : " + e.getMessage());
            log.error("Report findReportDetail Error : " + e.getMessage());
            return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
        }
    }


    /**
     * {@summary 이상 휠 탐지}
     * anomaly table 전체 반환
     */
    @GetMapping("/anomaly")
    public ApiResponse<?> anomaly(){

        log.info("Report anomaly Start");
        try {
            return ApiResponse.success(SuccessCode.READ_REPORT_ANOMALY,reportService.goAnomaly());
        }catch (JPAException jpaException){
            log.error("Report Error : " + jpaException.getMessage());
            return ApiResponse.error(ErrorCode.JPA_NOT_FIND);
        } catch (Exception e) {
            slackController.errorSend("Report Report Error : " + e.getMessage());
            log.error("Report Report Error : " + e.getMessage());
            return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
        }
    }


    /**
     * {@summary 레포트 다운로드}
     *
     * 제약사항 - ohtSn - ALL or oht_sn <br>
     * startDate - yyyy-MM-dd <br>
     * endDate - yyyy-MM-dd <br>
     * time - ALL or 0~23 <br>
     * wheelPosition - ALL or FL,FR,RL,RR <br>
     * errorFlag - 0 or 1 <br>
     * page - 1~N <br>
     * descFlag - 0 or 1 <br>
     */
    @GetMapping("/download")
    public void download(HttpServletResponse res,@RequestParam("ohtSn") String ohtSn
            , @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate, @RequestParam("time") String time
            ,@RequestParam("wheelPosition") String wheelPosition,@RequestParam("errorFlag") int errorFlag,@RequestParam("descFlag") int descFlag
            ,@RequestParam("userName")String userName) throws Exception {
        /**
         * excel sheet 생성
         */
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Sheet1"); // 엑셀 sheet 이름
        sheet.setColumnWidth(0,6000);
        sheet.setColumnWidth(1,6000);
        sheet.setColumnWidth(2,4000);
        sheet.setColumnWidth(3,4000);
        sheet.setColumnWidth(4,4500);
        sheet.setColumnWidth(5,4500);
        sheet.setColumnWidth(6,3500);
        sheet.setColumnWidth(7,2500);
        sheet.setColumnWidth(8,2500);
        /**
         * header font style
         */
        XSSFColor deepBlue = new XSSFColor(new byte[]{(byte) 0, (byte) 82, (byte) 164});
        XSSFColor blue =new XSSFColor(new byte[]{(byte) 228, (byte) 237, (byte) 245});
        XSSFColor black =new XSSFColor(new byte[]{(byte) 0, (byte) 0, (byte) 0});

        XSSFFont headerXSSFFont = (XSSFFont) workbook.createFont();
        headerXSSFFont.setColor(deepBlue);
        Short headerFontSize = 16*18;
        headerXSSFFont.setFontHeight(headerFontSize);
        headerXSSFFont.setBold(true);

        /**
         * header cell style
         */
        XSSFCellStyle headerXssfCellStyle = (XSSFCellStyle) workbook.createCellStyle();

        // 테두리 설정
        headerXssfCellStyle.setBorderLeft(BorderStyle.THIN);
        headerXssfCellStyle.setBorderRight(BorderStyle.THIN);
        headerXssfCellStyle.setBorderTop(BorderStyle.THIN);
        headerXssfCellStyle.setBorderBottom(BorderStyle.THIN);
        headerXssfCellStyle.setTopBorderColor(deepBlue);
        headerXssfCellStyle.setBottomBorderColor(deepBlue);
        headerXssfCellStyle.setLeftBorderColor(deepBlue);
        headerXssfCellStyle.setRightBorderColor(deepBlue);

        // 배경 설정
        headerXssfCellStyle.setFillForegroundColor(blue);
        headerXssfCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerXssfCellStyle.setFont(headerXSSFFont);

        headerXssfCellStyle.setAlignment(HorizontalAlignment.CENTER);
        headerXssfCellStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        XSSFCellStyle bodyXssfCellStyle = (XSSFCellStyle) workbook.createCellStyle();
        /**
         * body font style
         */

        XSSFFont bodyXSSFFont = (XSSFFont) workbook.createFont();
        bodyXSSFFont.setColor(black);
        Short bodyFontSize = 15*18;
        bodyXSSFFont.setFontHeight(bodyFontSize);
        bodyXSSFFont.setBold(true);

        /**
         * body cell style
         */
        // 테두리 설정
        bodyXssfCellStyle.setFont(bodyXSSFFont);
        bodyXssfCellStyle.setBorderLeft(BorderStyle.THIN);
        bodyXssfCellStyle.setBorderRight(BorderStyle.THIN);
        bodyXssfCellStyle.setBorderTop(BorderStyle.THIN);
        bodyXssfCellStyle.setBorderBottom(BorderStyle.THIN);
        bodyXssfCellStyle.setAlignment(HorizontalAlignment.CENTER);
        bodyXssfCellStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        bodyXssfCellStyle.setTopBorderColor(deepBlue);
        bodyXssfCellStyle.setBottomBorderColor(deepBlue);
        bodyXssfCellStyle.setLeftBorderColor(deepBlue);
        bodyXssfCellStyle.setRightBorderColor(deepBlue);
        /**
         * header data
         */
        int rowCount = 0; // 데이터가 저장될 행
        sb = new StringBuilder(40);
        sb.append(userName).append(" ").append(LocalDate.now());
        String headerNames[] = new String[]{sb.toString(), "검사 ID", "일자", "시간", "호기","검사 휠 위치"
        ,"검사 결과","기준값","결과값"};



        /**
         * header data push
         */
        Row headerRow = null;
        Cell headerCell = null;

        headerRow = sheet.createRow(rowCount++);
        Short height = 1000;
        headerRow.setHeight(height);
        for(int i=0; i<headerNames.length; i++) {
            headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headerNames[i]); // 데이터 추가
            headerCell.setCellStyle(headerXssfCellStyle); // 스타일 추가
        }

        /**
         * body data
         */


        List<ReportListResponseDto> report =(List<ReportListResponseDto>)reportService.findReport(QuestionDto.builder()
                .ohtSn(ohtSn)
                .startDate(startDate)
                .endDate(endDate)
                .time(time)
                .wheelPosition(wheelPosition)
                .errorFlag(errorFlag)
                .descFlag(descFlag)
                .downloadFlag(true)
                .build()).get("result");

        String bodyDatass[][]= new String[report.size()][9];
        int t = 0;
        for(ReportListResponseDto val : report){
            bodyDatass[t][0] =  Integer.toString(t+1);
            sb = new StringBuilder(40);
            sb.append(val.getOhtSn()).append("-").append(val.getWheelPosition())
                    .append("-").append(val.getWheelCheckId());
            bodyDatass[t][1] = sb.toString();
            st = new StringTokenizer(String.valueOf(val.getWheelCheckDate()),"T");

            bodyDatass[t][2] = st.nextToken();
            bodyDatass[t][3] = st.nextToken();
            bodyDatass[t][4] = val.getOhtSn();
            bodyDatass[t][5] = val.getWheelPosition();
            if(val.getBoltGoodCount()==TOTAL_BOLT)
                bodyDatass[t][6]="정상";
            else
                bodyDatass[t][6]="NG";
            bodyDatass[t][7] = Integer.toString(TOTAL_BOLT);
            bodyDatass[t][8] = Integer.toString(val.getBoltGoodCount());
            t++;
        }

        /**
         * body data push
         */
        Row bodyRow = null;
        Cell bodyCell = null;

        for(String[] bodyDatas : bodyDatass) {
            bodyRow = sheet.createRow(rowCount++);
            bodyCell = bodyRow.createCell(0);
            bodyCell.setCellValue(bodyDatas[0]);
            bodyCell.setCellStyle(headerXssfCellStyle);
            for(int i=1; i<bodyDatas.length; i++) {
                bodyCell = bodyRow.createCell(i);
                bodyCell.setCellValue(bodyDatas[i]); // 데이터 추가
                bodyCell.setCellStyle(bodyXssfCellStyle); // 스타일 추가
            }
        }

        /**
         * download
         */
        sb = new StringBuilder(50);
        Date nowDate = new Date();
        SimpleDateFormat sdf =new SimpleDateFormat("HH-mm-ss");
        //파일명 지정
        sb.append(LocalDate.now()).append("T").append(sdf.format(nowDate)).append("_").append(startDate);
        if(!startDate.equals(endDate)){
            sb.append("_").append(endDate);
        }
        if(!ohtSn.equals("ALL")){
            sb.append("_").append(ohtSn);
        }
        String fileName = sb.toString();


        res.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment;filename=" + fileName + ".xlsx");
        ServletOutputStream servletOutputStream = res.getOutputStream();

        workbook.write(servletOutputStream);
        workbook.close();
        servletOutputStream.flush();
        servletOutputStream.close();
    }

}
