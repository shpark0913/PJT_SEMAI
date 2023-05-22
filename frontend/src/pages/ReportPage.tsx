import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

import { setQueryObj } from "../_store/slices/reportPageSlice";
import { ReportLoaderType, ReportObjectType } from "../_utils/Types";
import Axios from "../_utils/Axios";
import { useAppDispatch } from "../_hooks/hooks";

import PaginationComponents from "../components/ReportPage/PaginationComponents";
import ReportDetail from "../components/ReportDetail/ReportDetail";
import ReportTable from "../components/ReportPage/ReportTable";
import {
  NoData,
  ReportForm,
  ReportFormContainer,
  ReportSection
} from "../components/ReportPage/styles/ReportPageComponents";
import FormInputs from "../components/ReportPage/FormInputs";

function ReportPage() {
  let dispatch = useAppDispatch();
  let { totalPage } = useLoaderData() as ReportLoaderType;    // 서버에서 받아온 값, 총 데이터 개수
  let [query] = useSearchParams();
  useEffect(() => {
    dispatch(setQueryObj(Object.fromEntries(query)));     // 초기에 params를 redux에 저장하기
  }, []);

  // 데이터를 20개씩 나누었을 때 하단에 총 몇 개의 page를 표기해야 하는지 계산
  let paginationTotalPage = useMemo(() => Math.ceil(totalPage / 20), [totalPage]);

  // =================== 모달 관련 ===================
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  let [detailInfo, setDetailInfo] = useState<ReportObjectType>({
    wheelCheckDate: [2023, 5, 2, 4, 32, 10],
    boltGoodCount: 0,
    boltLoseCount: 0,
    boltOutCount: 0,
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
    <ReportSection>
      <ReportFormContainer className={isModalOpen ? "open" : "close"}>
        <ReportForm replace={true} method="GET">
          <FormInputs />
          { totalPage?
            ( <>
              <ReportTable handleModalOpen={handleModalOpen} />
              <PaginationComponents paginationTotalPage={paginationTotalPage} />
            </> )
            : <NoData>데이터가 존재하지 않습니다.</NoData> }
        </ReportForm>
      </ReportFormContainer>

      <ReportDetail
        className={isModalOpen ? "open" : "close"}
        handleModalClose={handleModalClose}
        detailInfo={detailInfo}
      ></ReportDetail>
    </ReportSection>
  );
}

export default ReportPage;
