import React from 'react';
import { useRouteLoaderData } from "react-router-dom";

import { useAppSelector } from "../../_hooks/hooks";
import useDate from "../../_hooks/useDate";
import { ReportLoaderType, ReportTableProps } from "../../_utils/Types";

import { Table, TableContainer, TBody, TD, TFoot, TH, THead, TR } from "../TableComponents";

function ReportTable({ handleModalOpen }: ReportTableProps) {
  const { result, totalPage } = useRouteLoaderData("reportLists") as ReportLoaderType;
  let { wheelReportId, dateFormat, timeFormat } = useDate();
  let { page } = useAppSelector(state => state.reportPage.queryObj);
  let currentPage:number = Number(page);

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
          </TR>
        </THead>
        <TBody className="report-table">
          { result.map((report:any, idx:number) =>
              <TR key={`${report.ohtSn}-${report.wheelPosition}-${wheelReportId(report.wheelCheckDate.slice(0, 6))}`}
                  onClick={(e: React.MouseEvent<HTMLTableRowElement>) => handleModalOpen(e, report.wheelCheckId)}
                  NG={11 - report.boltGoodCount}
              >
                <TH className="idxNum">{((currentPage - 1) * 20) + idx + 1}</TH>
                <TD>{`${report.ohtSn}-${report.wheelPosition}-${wheelReportId(report.wheelCheckDate.slice(0, 6))}`}</TD>
                <TD>{`${dateFormat(report.wheelCheckDate.slice(0, 3))}`}</TD>
                <TD>{`${timeFormat(report.wheelCheckDate.slice(3, 6))}`}</TD>
                <TD>{report.ohtSn}</TD>
                <TD>{report.wheelPosition}</TD>
                <TD>{report.boltGoodCount === 11 ? "정상" : "NG"}</TD>
                <TD>11</TD>
                <TD>{report.boltGoodCount}</TD>
              </TR>
          ) }
        </TBody>
        <TFoot>
          <TR>
            <TD colSpan={7} />
            <TD colSpan={2}>
              {(currentPage-1)*20+1}-{currentPage*20 > totalPage? totalPage : currentPage*20} /
              <span style={{color: "var(--emphasize-color)", fontWeight: "bold", fontSize: "16px"}}> { totalPage }</span>
            </TD>
          </TR>
        </TFoot>
      </Table>
    </TableContainer>
  );
}

export default React.memo(ReportTable);