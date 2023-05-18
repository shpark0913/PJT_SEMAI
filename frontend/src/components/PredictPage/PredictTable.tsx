import { TBody, TD, TH, THead, TR, Table, TableContainer } from "../TableComponents";
import { useCallback, useState } from "react";

import Axios from "../../_utils/Axios";
import React from "react";
import ReportDetail from "../ReportDetail/ReportDetail";
import { ReportObjectType } from "../../_utils/Types";

function PredictTable({ abnormalWheels }: any) {
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  let [detailInfo, setDetailInfo] = useState<ReportObjectType>({
    wheelCheckDate: [2023, 5, 2, 4, 32, 10],
    boltGoodCount: 0,
    boltLoseCount: 0,
    boltOutCount: 0,
  });
  let abnormalData: any[] = [];
  abnormalWheels.map((abnormalWheel: any) => {
    if (abnormalWheel.anomalyFlag === -1) {
      abnormalData.push(abnormalWheel);
    }
  });

  /** 모달이 열리면 실행되는 함수 */
  const handleModalOpen = useCallback(
    async (e: React.MouseEvent<HTMLTableRowElement>, wheelCheckId: number) => {
      e.preventDefault();
      let reportDetail: ReportObjectType = {
        wheelCheckDate: [2023, 5, 2, 4, 32, 10],
        boltGoodCount: 0,
        boltLoseCount: 0,
        boltOutCount: 0,
      };
      try {
        let response = await Axios.get(`report/detail/${wheelCheckId}`);
        reportDetail = response.data.data;
        console.log(reportDetail);
      } catch (err) {
        console.log(err);
      }
      await setDetailInfo(reportDetail);
      setIsModalOpen(true);
    },
    [],
  );

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <TableContainer>
        <Table>
          <THead>
            <TR>
              <TH>검사 ID</TH>
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
                onClick={(e: React.MouseEvent<HTMLTableRowElement>) =>
                  handleModalOpen(e, data.wheelCheckId)
                }
              >
                <TH>
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
      <ReportDetail
        className={isModalOpen ? "open" : "close"}
        handleModalClose={handleModalClose}
        detailInfo={detailInfo}
      ></ReportDetail>
    </>
  );
}

export default PredictTable;
