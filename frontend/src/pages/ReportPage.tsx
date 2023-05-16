import React, {useCallback, useEffect, useState} from 'react';
import {Form, useLoaderData, useSearchParams, useSubmit} from "react-router-dom";
import styled from "styled-components";

import {useAppDispatch, useAppSelector} from "../_hooks/hooks";
import useDate from "../_hooks/useDate";
import {ReportLoaderType, ReportObjectType} from "../_utils/Types";
import Axios from "../_utils/Axios";

import { Button, SemesButton } from "../components/ButtonComponents";
import ReportTable from "../components/ReportPage/ReportTable";
import PaginationComponents from "../components/ReportPage/PaginationComponents";
import ReportDetail from "../components/ReportDetail/ReportDetail";

import InputOhtSn from "../components/ReportPage/InputOHTSn";
import {InputEndDate, InputStartDate} from "../components/ReportPage/InputDate";
import InputTime from "../components/ReportPage/InputTime";
import InputWheelPosition from "../components/ReportPage/InputWheelPosition";
import InputDescFlag from "../components/ReportPage/InputDescFlag";
import InputErrorFlag from "../components/ReportPage/InputErrorFlag";
import {setQueryObj} from "../_store/slices/reportPageSlice";


const ReportSection = styled.section`
  padding: 30px;
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`
const ReportContainer = styled.div`
  width: 100%;
  transition: all 500ms ease;
  overflow-x: auto;
  
  &.open {
    width: 50%;
  }
`;

const FormTop = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
  
  
`;
const FormInputs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, auto));
  gap: 10px 20px;
  
  & div {
    grid-column: span 2;
    width: calc(2 * 220px + 20px);
  }

  & > button:last-child {
    justify-self: end;
  }
`;

const NoData = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

function ReportPage() {

  // ================ 초기 값 ================
  let dispatch = useAppDispatch();
  let submit = useSubmit();
  let { result, totalPage } = useLoaderData() as ReportLoaderType;    // 서버에서 가져온 값

  let [query] = useSearchParams();
  useEffect(() => {
    dispatch(setQueryObj(Object.fromEntries(query)))
  }, [query])
  let { queryObj } = useAppSelector(state => state.reportPage);

  let userName = useAppSelector(state => state.user.userName); // csv 출력 시 필요
  let { todayFormat } = useDate();
  let todayDate = todayFormat();

  let [startDate, setStartDate] = useState<string>(query.get('startDate') || todayDate);
  let [endDate, setEndDate] = useState<string>(query.get('endDate') || todayDate);
  // let [page, setPage] = useState<string>(query.get('page') || "1");



  // =================== 페이지네이션 ======================
  let paginationTotalPage = Math.ceil(totalPage/20);
  /** 페이지를 바꾸는 경우 -> 기존의 필터링은 그대로 유지, 페이지 params만 변경 */
  const handleClickPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQueryObj({...Object.fromEntries(query), page: e.target.value}));     // 기존의 params로 값 변경

    if (e.currentTarget.form) {
      let form = new FormData(e.currentTarget.form);
      for (const [key, val] of Object.entries(queryObj)) {
        form.set(key, val);
      }
      form.set('page', e.target.value);       // page는 변경하기
      submit(form);
    }
  }

  // =================== 모달 관련 ===================
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  let [detailInfo, setDetailInfo] = useState<ReportObjectType>({wheelCheckDate: [2023, 5, 2, 4, 32, 10]});
  /** 모달이 열리면 실행되는 함수 */
  const handleModalOpen = useCallback(async (e:React.MouseEvent<HTMLTableRowElement>, wheelCheckId: number) => {
    e.preventDefault();
    let reportDetail: ReportObjectType = {wheelCheckDate: [2023, 5, 2, 4, 32, 10]};
    try {
      let response = await Axios.get(`report/detail/${wheelCheckId}`);
      reportDetail = response.data.data;
      console.log(reportDetail);
    }
    catch (err) {
      console.log(err)
    }
    await setDetailInfo(reportDetail);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // ================ form 조회 =================
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.form) {
      let form = new FormData(e.currentTarget.form);
      dispatch(setQueryObj({page: "1"}));

      form.set('page', "1");
      !form.has("errorFlag") && form.set("errorFlag", "0")
      !form.has("time") && form.set("time", "ALL")
      console.log(form);
      submit(form);
    }
  }

  // ==================== CSV 파일 다운로드 ====================
  const handleDownloadCSV = () => {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('page');
    searchParams.set('userName', userName);
    let newSearchParams :string[] = [];
    searchParams.forEach((val, key) => {
      newSearchParams.push(`${key}=${val}`);
    })

    window.location.href = `${process.env.REACT_APP_BASE_URL}report/download?${newSearchParams.join('&')}`
  }

  // ======================= 일주일 조회, 30일 조회 ==========================
  const handleSubmitPeriod = (e: React.MouseEvent<HTMLButtonElement>, day: number) => {
    if (e.currentTarget.form) {
      let form = new FormData(e.currentTarget.form);
      dispatch(setQueryObj({page: "1"}))
      setStartDate(todayFormat( new Date(Date.now() - (day*24*60*60*1000)) ));
      setEndDate(todayDate);

      form.set('page', "1");
      form.set('startDate', todayFormat( new Date(Date.now() - (day*24*60*60*1000)) ));
      form.set('endDate', todayDate);
      !form.has("errorFlag") && form.set("errorFlag", "0")
      !form.has("time") && form.set("time", "ALL")

      submit(form);
    }
  }


  return (
    <>
      <ReportSection>

        {/*{ isModalOpen && <ReportModal scrollY={scrollY} detailInfo={detailInfo} handleModalClose={handleModalClose}  /> }*/}
        {/*<Title title="레포트" />*/}

        <ReportContainer className={isModalOpen? 'open' : 'close'}>
          <Form replace={true} method="GET" style={{height : "100%", display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
            <FormTop>
              <FormInputs>
                <InputOhtSn query={query} />
                <InputStartDate startDate={startDate} endDate={endDate} setStartDate={setStartDate} />
                <InputEndDate startDate={startDate} endDate={endDate} todayDate={todayDate} setEndDate={setEndDate} />
                <InputTime query={query} startDate={startDate} endDate={endDate} />
                <InputWheelPosition query={query} />
                <InputDescFlag query={query} />
                <InputErrorFlag query={query} />
                <div>
                  <SemesButton type="button" onClick={(e:React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)} width="120px" height="26px" style={{marginRight: "20px"}} >조회하기</SemesButton>
                  <SemesButton onClick={(e:React.MouseEvent<HTMLButtonElement>) => handleSubmitPeriod(e, 7)} type="button" width="120px" height="26px" style={{marginRight: "20px"}} >최근 일주일 조회</SemesButton>
                  <SemesButton onClick={(e:React.MouseEvent<HTMLButtonElement>) => handleSubmitPeriod(e, 30)} type="button" width="120px" height="26px" style={{marginRight: "20px"}} >최근 한 달 조회</SemesButton>
                </div>
              </FormInputs>

              <Button type="button" onClick={() => handleDownloadCSV() } width="90px" height="26px">CSV 출력</Button>

            </FormTop>

            { result?.length ?
              <>
                <ReportTable handleModalOpen={handleModalOpen} />
                <PaginationComponents paginationTotalPage={paginationTotalPage} handleClickPage={handleClickPage} />
              </>
              :
              <NoData>데이터가 존재하지 않습니다.</NoData>
            }
          </Form>
        </ReportContainer>

        <ReportDetail className={isModalOpen? 'open' : 'close'} handleModalClose={handleModalClose} detailInfo={detailInfo}></ReportDetail>
      </ReportSection>
    </>
  );
}

export default ReportPage;