import React from "react";

import useReportDetail from "../../_hooks/useReportDetail";
import { useAppSelector } from "../../_hooks/hooks";

import ReportDetail from "../ReportDetail/ReportDetail";
import { TBody, TD, TH, THead, TR, Table, TableContainer } from "../TableComponents";

function PredictTable({ abnormalWheels }: any) {
  const { openReportDetail } = useReportDetail();
  const { isDetailOpen } = useAppSelector(state => state.reportDetail);
  let nowDetail = useAppSelector(state => state.reportDetail.reportDetail.wheelCheckId);

  let abnormalData: any[] = [];
  abnormalWheels.map((abnormalWheel: any) => {
    if (abnormalWheel.anomalyFlag === -1) {
      abnormalData.push(abnormalWheel);
    }
  });

  return (
    <>
      <TableContainer>
        <Table>
          <THead>
            <TR>
              <TH>휠 ID</TH>
              <TH>양호</TH>
              <TH>유실</TH>
              <TH>파단</TH>
              <TH>풀림</TH>
            </TR>
          </THead>
          <TBody className="report-table">
            {abnormalData.map(data => (
              <TR
                key={`AI-predict-report-${data.wheelCheckId}`}
                onClick={() => openReportDetail(data.wheelCheckId)}
                isActive={nowDetail === data.wheelCheckId}
              >
                <TH style={{borderRight: "1px solid var(--emphasize-color)"}}>
                  {data.ohtSn}-{data.wheelPosition}
                </TH>
                <TD>{data.totalGoodCount}</TD>
                <TD>{data.totalOutCount}</TD>
                <TD>{data.totalLoseCount}</TD>
                <TD>{data.totalLooseCount}</TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </TableContainer>
      <ReportDetail className={isDetailOpen ? "open" : "close"} />
    </>
  );
}

export default PredictTable;
