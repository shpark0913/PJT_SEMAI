import React, { useCallback, useEffect, useState } from "react";
import { Form, useLoaderData, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { setQueryObj } from "../_store/slices/reportPageSlice";
import { ReportLoaderType, ReportObjectType } from "../_utils/Types";
import { useAppDispatch, useAppSelector } from "../_hooks/hooks";
import Axios from "../_utils/Axios";

import PaginationComponents from "../components/ReportPage/PaginationComponents";
import ReportDetail from "../components/ReportDetail/ReportDetail";
import ReportTable from "../components/ReportPage/ReportTable";
import { ReportFormContainer, ReportSection } from "../components/ReportPage/styledComponents/ReportPageComponents";
import FormInputs from "../components/ReportPage/FormInputs";

const NoData = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
`;

function ReportPage() {
  // ================ 초기 값 ================
  let dispatch = useAppDispatch();
  let { result, totalPage } = useLoaderData() as ReportLoaderType; // 서버에서 가져온 값
  let [query] = useSearchParams();                                 // 쿼리값

  useEffect(() => {
    dispatch(setQueryObj(Object.fromEntries(query))); // 쿼리 값을 redux에 저장... 저장 되는거 맞지?
  }, []);

  let userName = useAppSelector(state => state.user.userName); // csv 출력 시 필요
  let paginationTotalPage = Math.ceil(totalPage / 20);

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

  // ==================== CSV 파일 다운로드 ====================
  const handleDownloadCSV = () => {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("page");
    searchParams.set("userName", userName);
    let newSearchParams: string[] = [];
    searchParams.forEach((val, key) => {
      newSearchParams.push(`${key}=${val}`);
    });

    window.location.href = `${process.env.REACT_APP_BASE_URL}report/download?${newSearchParams.join(
      "&",
    )}`;
  };

  return (
      <ReportSection>
        <ReportFormContainer className={isModalOpen ? "open" : "close"}>
          <Form
            replace={true}
            method="GET"
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <FormInputs />
            { result?.length ? (
              <>
                <ReportTable handleModalOpen={handleModalOpen} />
                <PaginationComponents
                  paginationTotalPage={paginationTotalPage}
                />
              </>
            )
            : <NoData>데이터가 존재하지 않습니다.</NoData> }
          </Form>
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
