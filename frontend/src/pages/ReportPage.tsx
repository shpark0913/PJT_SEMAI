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



const ReportSection = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const FormTop = styled.div`
  display: flex;
  align-items: flex-end;
`;
const FormInputs = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const NoData = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

function ReportPage() {
  // ================ 초기 필요한 값들 ================
  let [query] = useSearchParams();
  let submit = useSubmit();
  let data = useLoaderData() as ReportLoaderType;
  let { result, totalPage } = data;
  let userName = useAppSelector(state => state.user.userName);

  let ohtSn = query.get('ohtSn') || "ALL";
  let time = query.get('time') || "ALL";
  let wheelPosition = query.get('wheelPosition') || "";
  let errorFlag = query.get('errorFlag') || "0";
  let descFlag = query.get('descFlag') || "0";

  // ================== 페이지네이션 ======================
  let paginationTotalPage = Math.ceil(totalPage/20);
  let [page, setPage] = useState<string>(query.get('page') || "1");
  const handleClickPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.form) {
      let form = new FormData(e.currentTarget.form);
      form.set('page', e.target.value);
      setPage(e.target.value);
      !form.has("errorFlag") && form.set("errorFlag", "0")
      !form.has("time") && form.set("time", "ALL")
      console.log(form);
      submit(form);
    }
  }

  // =================== 달력 선택 관련 ===================
  let { todayFormat } = useDate();
  let todayDate = todayFormat();
  let [startDate, setStartDate] = useState<string>(query.get('startDate') || todayDate);
  let [endDate, setEndDate] = useState<string>(query.get('endDate') || todayDate);
  /** 달력에서 날짜를 클릭하면 변하는 함수 */
  const handleChangeStartDate = (e:any) => {
    setStartDate(e.target.value);
  }
  const handleChangeEndDate = (e:any) => {
    setEndDate(e.target.value);
  }

  // =================== 모달 관련 ===================
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  let [scrollY, setScrollY] = useState<number>(0);
  let [detailInfo, setDetailInfo] = useState<ReportObjectType>({wheelCheckDate: [2023, 5, 2, 4, 32, 10]});        // 선택한 레포트의 상세내역을 전달할 객체
  const { lockScroll, openScroll } = useBodyScrollLock();
  /** 모달이 열리면 실행되는 함수 */
  const handleModalOpen = useCallback((detailInfo: ReportObjectType) => {
    setScrollY(window.scrollY);
    setIsModalOpen(true);
    setDetailInfo(detailInfo);
    lockScroll();
  }, [lockScroll])
  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setDetailInfo({wheelCheckDate: [2023, 5, 2, 4, 32, 10]});
    openScroll();
  }, [openScroll]);

  // ================ form 제출 =================
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

      <Outlet context={[scrollY]} />
      {/*{ isModalOpen && <ReportModal scrollY={scrollY} detailInfo={detailInfo} handleModalClose={handleModalClose}  /> }*/}

      {/*<Title title="레포트" />*/}
      <Form replace={true} method="GET" style={{height : "100%", display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
        <div>
          <FormTop>
            <FormInputs>
              <InputOhtSn />
              <InputStartDate startDate={startDate} endDate={endDate} handleChangeStartDate={handleChangeStartDate} />
              <InputEndDate startDate={startDate} endDate={endDate} todayDate={todayDate} handleChangeEndDate={handleChangeEndDate} />
              <InputTime startDate={startDate} endDate={endDate} time={time} />
              <InputWheelPosition wheelPosition={wheelPosition} />
              <InputDescFlag descFlag={descFlag} />
              <InputErrorFlag />
            </FormInputs>
            <SemesButton style={{flexShrink: "0"}} type="button" onClick={(e:React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)} width="90px" height="26px" >조회하기</SemesButton>
          </FormTop>
          <div>
            <Button type="button" onClick={() => handleDownloadCSV() } width="90px" height="26px">CSV 출력</Button>
          </div>
        </div>

        { result?.length ?
          <>
            <ReportTable handleModalOpen={handleModalOpen} nowPage={page} />
            <PaginationComponents paginationTotalPage={paginationTotalPage} handleClickPage={handleClickPage} page={page} />
          </>
          :
          <NoData>데이터가 존재하지 않습니다.</NoData>
        }

      </Form>
    </ReportSection>
  );
}

export default ReportPage;