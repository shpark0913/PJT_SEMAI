import React from 'react';
import { useRouteLoaderData } from "react-router-dom";

import { ReportTableProps } from "../../_utils/Types";
import useDate from "../../_hooks/useDate";

import {Table, TableContainer, TBody, TD, TFoot, TH, THead, TR} from "../TableComponents";
import {useAppSelector} from "../../_hooks/hooks";
// import { Button } from "../ButtonComponents";

function ReportTable({ handleModalOpen }: ReportTableProps) {
  let data: any = useRouteLoaderData("reportLists");
  let { result, totalPage } = data;
  let { wheelReportId, dateFormat, timeFormat } = useDate();
  const { queryObj } = useAppSelector(state => state.reportPage);
  let nowPage = queryObj.page

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
            {/*<TH>상세보기</TH>*/}
          </TR>
        </THead>
        <TBody className="report-table">
          { result.map((report:any, idx:number) =>
              <TR key={`${report.ohtSn}-${report.wheelPosition}-${wheelReportId(report.wheelCheckDate.slice(0, 6))}`} onClick={(e: React.MouseEvent<HTMLTableRowElement>) => handleModalOpen(e, report.wheelCheckId)} NG={11 - report.boltGoodCount} >
                <TH className="idxNum">{((parseInt(nowPage) - 1) * 20) + idx + 1}</TH>
                <TD>{`${report.ohtSn}-${report.wheelPosition}-${wheelReportId(report.wheelCheckDate.slice(0, 6))}`}</TD>
                <TD>{`${dateFormat(report.wheelCheckDate.slice(0, 3))}`}</TD>
                <TD>{`${timeFormat(report.wheelCheckDate.slice(3, 6))}`}</TD>
                <TD>{report.ohtSn}</TD>
                <TD>{report.wheelPosition}</TD>
                <TD>{report.boltGoodCount === 11 ? "정상" : "NG"}</TD>
                <TD>11</TD>
                <TD>{report.boltGoodCount}</TD>
              {/*<TD><Button width="65px" height="23px" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleModalOpen(e, report.wheelCheckId)}>{report.wheelCheckId}</Button></TD>*/}
              </TR>
          ) }
        </TBody>
        <TFoot>
          <TR>
            <TD colSpan={8} />
            <TD colSpan={2}>보기 {(Number(nowPage)-1)*20+1}-{Number(nowPage)*20 > totalPage? totalPage : Number(nowPage)*20} / <span style={{color: "var(--emphasize-color)", fontWeight: "bold"}}>{ totalPage }</span></TD>
          </TR>
        </TFoot>
      </Table>
    </TableContainer>
  );
}

export default React.memo(ReportTable);