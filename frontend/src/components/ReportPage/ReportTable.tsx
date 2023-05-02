import React from 'react';
import {Table, TableContainer, TBody, TD, TFoot, TH, THead, TR} from "../TableComponents";
import { ReportTableProps } from "../../_utils/Types";
import { Button } from "../ButtonComponents";
import {useRouteLoaderData} from "react-router-dom";
import useDate from "../../_hooks/useDate";

function ReportTable({ handleModalOpen }: ReportTableProps) {
  let data: any = useRouteLoaderData("reportLists");
  let { result } = data;
  let { wheelCheckId, dateFormat, timeFormat } = useDate();

  return (
    <TableContainer>
      <Table>
        <THead>
          <TR>
            <TH></TH>
            <TH>검사 ID</TH>
            <TH>일자</TH>
            <TH>시간</TH>
            <TH>호기</TH>
            <TH>검사 휠 위치</TH>
            <TH>검사 결과</TH>
            <TH>기준값</TH>
            <TH>결과값</TH>
            <TH>상세보기</TH>
          </TR>
        </THead>
        <TBody>
          { result.map((report:any, idx:number) =>
            <TR key={`${report.ohtSn}-${report.wheelPosition}-${wheelCheckId(report.wheelCheckDate)}`}>
              <TH className="idxNum">{idx + 1}</TH>
              <TD>{`${report.ohtSn}-${report.wheelPosition}-${wheelCheckId(report.wheelCheckDate)}`}</TD>
              <TD>{`${dateFormat(report.wheelCheckDate.slice(0, 3))}`}</TD>
              <TD>{`${timeFormat(report.wheelCheckDate.slice(3, 6))}`}</TD>
              <TD>{report.ohtSn}</TD>
              <TD>{report.wheelPosition}</TD>
              <TD>{report.boltGoodCount === 11? "정상" : "NG"}</TD>
              <TD>11</TD>
              <TD>{report.boltGoodCount}</TD>
              <TD><Button width="65px" height="23px" onClick={() => handleModalOpen(report)}>상세보기</Button></TD>
            </TR>) }
        </TBody>
        <TFoot>
          <TR>
            <TD colSpan={8} />
            <TD colSpan={2}>보기 1-20 / <span style={{color: "var(--emphasize-color)", fontWeight: "bold"}}>52</span></TD>
          </TR>
        </TFoot>
      </Table>
    </TableContainer>
  );
}

export default React.memo(ReportTable);