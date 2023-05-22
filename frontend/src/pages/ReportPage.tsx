import React, { useEffect, useMemo } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

import {setDetailClose, setQueryObj} from "../_store/slices/reportPageSlice";
import { ReportLoaderType } from "../_utils/Types";
import {useAppDispatch, useAppSelector} from "../_hooks/hooks";

import Pagination from "../components/ReportPage/Pagination";
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
    dispatch(setDetailClose())
  }, []);
  useEffect(() => {
    dispatch(setQueryObj(Object.fromEntries(query)));     // 초기에 params를 redux에 저장하기
  }, []);
  let { isDetailOpen } = useAppSelector(state => state.reportPage)

  // 데이터를 20개씩 나누었을 때 하단에 총 몇 개의 page를 표기해야 하는지 계산
  let paginationTotalPage = useMemo(() => Math.ceil(totalPage / 20), [totalPage]);

  return (
    <ReportSection>
      <ReportFormContainer className={isDetailOpen ? "open" : "close"}>
        <ReportForm replace={true} method="GET">
          <FormInputs />
          { totalPage?
            ( <>
              <ReportTable />
              <Pagination paginationTotalPage={paginationTotalPage} />
            </> )
            : <NoData>데이터가 존재하지 않습니다.</NoData> }
        </ReportForm>
      </ReportFormContainer>

      <ReportDetail className={isDetailOpen ? "open" : "close"} />
    </ReportSection>
  );
}

export default ReportPage;
