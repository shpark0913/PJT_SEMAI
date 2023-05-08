import React, { useCallback, useState } from 'react';
import {Form, Outlet, useLoaderData, useSearchParams, useSubmit} from "react-router-dom";
import styled from "styled-components";

import {useAppSelector} from "../_hooks/hooks";
import {ReportLoaderType, ReportObjectType} from "../_utils/Types";
import {useBodyScrollLock} from "../_hooks/useBodyScrollLock";
import useDate from "../_hooks/useDate";

import { Button, SemesButton } from "../components/ButtonComponents";
import ReportTable from "../components/ReportPage/ReportTable";
import Title from "../components/Title";
// import ReportModal from "../components/Modal/ReportModal";
import PaginationComponents from "../components/ReportPage/PaginationComponents";

import InputOhtSn from "../components/ReportPage/InputOHTSn";
import {InputEndDate, InputStartDate} from "../components/ReportPage/InputDate";
import InputTime from "../components/ReportPage/InputTime";
import InputWheelPosition from "../components/ReportPage/InputWheelPosition";
import InputDescFlag from "../components/ReportPage/InputDescFlag";
import InputErrorFlag from "../components/ReportPage/InputErrorFlag";
import ReportDetail from "../components/ReportDetail/ReportDetail";
import Axios from "../_utils/Axios";



const ReportSection = styled.section`
  padding: 30px;
  display: flex;
  //flex-direction: column;
  height: 100%;
`

const FormTop = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
`;
const FormInputs = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const FormButtons = styled.div`
  display: flex;
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
  let [query] = useSearchParams();
  let submit = useSubmit();
  let { result, totalPage } = useLoaderData() as ReportLoaderType;
  let userName = useAppSelector(state => state.user.userName);
  let { todayFormat } = useDate();
  let todayDate = todayFormat();

  let [startDate, setStartDate] = useState<string>(query.get('startDate') || todayDate);
  let [endDate, setEndDate] = useState<string>(query.get('endDate') || todayDate);

  let [page, setPage] = useState<string>(query.get('page') || "1");



  // ================== 페이지네이션 ======================
  let paginationTotalPage = Math.ceil(totalPage/20);
  const handleClickPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(e.target.value);
    if (e.currentTarget.form) {
      let form = new FormData(e.currentTarget.form);
      form.set('page', e.target.value);
      !form.has("errorFlag") && form.set("errorFlag", "0");
      !form.has("time") && form.set("time", "ALL");
      submit(form);
    }
  }

  // =================== 모달 관련 ===================
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // let [scrollY, setScrollY] = useState<number>(0);
  let [detailInfo, setDetailInfo] = useState<ReportObjectType>({wheelCheckDate: [2023, 5, 2, 4, 32, 10]});        // 선택한 레포트의 상세내역을 전달할 객체
  // const { lockScroll, openScroll } = useBodyScrollLock();
  /** 모달이 열리면 실행되는 함수 */
  const handleModalOpen = useCallback(async (e:React.MouseEvent<HTMLButtonElement>, wheelCheckId: number) => {
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
      form.set('page', '1');
      setPage("1");
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

  return (
    <ReportSection>

      {/*{ isModalOpen && <ReportModal scrollY={scrollY} detailInfo={detailInfo} handleModalClose={handleModalClose}  /> }*/}
      {/*<Title title="레포트" />*/}
      
      <div>
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
              <SemesButton style={{marginRight: "20px"}} type="button" width="120px" height="26px" >최근 일주일 조회</SemesButton>
              <SemesButton type="button" width="120px" height="26px" >최근 한 달 조회</SemesButton>

            </FormInputs>
            <FormButtons>
              <SemesButton style={{marginRight: "10px"}} type="button" onClick={(e:React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)} width="90px" height="26px" >조회하기</SemesButton>
              <Button type="button" onClick={() => handleDownloadCSV() } width="90px" height="26px">CSV 출력</Button>
            </FormButtons>
          </FormTop>

          { result?.length ?
            <>
              <ReportTable handleModalOpen={handleModalOpen} nowPage={page} />
              <PaginationComponents paginationTotalPage={paginationTotalPage} handleClickPage={handleClickPage} page={page} />
            </>
            :
            <NoData>데이터가 존재하지 않습니다.</NoData>
          }
        </Form>
      </div>

      { isModalOpen && <ReportDetail handleModalClose={handleModalClose} detailInfo={detailInfo}></ReportDetail> }
    </ReportSection>
  );
}

export default ReportPage;