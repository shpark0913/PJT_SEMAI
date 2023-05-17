import { TBody, TD, TFoot, TH, THead, TR, Table, TableContainer } from "../TableComponents";
import { useCallback, useState } from "react";

import Axios from "../../_utils/Axios";
import React from "react";
import ReportDetail from "../ReportDetail/ReportDetail";
import { ReportObjectType } from "../../_utils/Types";
import { useAppDispatch } from "../../_hooks/hooks";

function PredictTable() {
  let dispatch = useAppDispatch();

  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  let [detailInfo, setDetailInfo] = useState<ReportObjectType>({
    wheelCheckDate: [2023, 5, 2, 4, 32, 10],
  });
  /** 모달이 열리면 실행되는 함수 */
  const handleModalOpen = useCallback(
    async (e: React.MouseEvent<HTMLTableRowElement>, wheelCheckId: number) => {
      e.preventDefault();
      let reportDetail: ReportObjectType = { wheelCheckDate: [2023, 5, 2, 4, 32, 10] };
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

  let data = [
    { wheelCheckId: 1230, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1229, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1228, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1227, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1226, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1225, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1224, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1223, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1222, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1221, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1220, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1219, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1218, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1217, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1216, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1215, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1214, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1213, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1212, loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelCheckId: 1215, loose: 2, lost: 3, broken: 1, normal: 5 },
  ];
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
            {data.map(d => (
              <TR
                key={`AI-predict-report-${d.wheelCheckId}`}
                onClick={(e: React.MouseEvent<HTMLTableRowElement>) =>
                  handleModalOpen(e, d.wheelCheckId)
                }
              >
                <TH>{d.wheelCheckId}</TH>
                <TD>{d.normal}</TD>
                <TD>{d.lost}</TD>
                <TD>{d.broken}</TD>
                <TD>{d.loose}</TD>
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
