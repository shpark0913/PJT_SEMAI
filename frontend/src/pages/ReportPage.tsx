import React, {useCallback, useState} from 'react';
import { Form, useLoaderData, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { RootState } from "../_store/store";
import { ReportDetailType } from "../_utils/Types";
import {useBodyScrollLock} from "../_hooks/useBodyScrollLock";
import useDate from "../_hooks/useDate";

import { Button, SemesButton } from "../components/ButtonComponents";
import { Label } from "../components/ReportPage/FilterComponents"
import ReportTable from "../components/ReportPage/ReportTable";
import Title from "../components/Title";
import ReportModal from "../components/DetailModal/ReportModal";

const ReportSection = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
`


export async function ReportListsAction ({request}: {request: any}) {
  // let formData = await request.formData();
  console.log(request);
  const url = new URL(request.url);
  if (url.searchParams.get("errorFlag")) {
    url.searchParams.append('errorFlag', "0");
  }

  console.log(url);
  return url;
}

function ReportPage() {
  let [query] = useSearchParams();
  let data = useLoaderData();
  console.log(data)

  let theme = useSelector((state:RootState) => state.theme.theme);

  // =================== 달력 선택 관련 ===================
  let { timestampFormat, timeFormat } = useDate();
  let todayDate = timestampFormat();
  let [startDate, setStartDate] = useState<string>(query.get('startDate') || todayDate);
  let [endDate, setEndDate] = useState<string>(query.get('endDate') || todayDate);
  /** 달력에서 날짜를 클릭하면 변하는 함수 */
  const handleChangeStartDate = (e:any) => {
    setStartDate(e.target.value);
  }
  const handleChangeEndDate = (e:any) => {
    setEndDate(e.target.value);
  }

  // =================== 시간 관련 ===================
  const timeInput = []
  for(let i=0; i<24; i++) {
    timeInput.push(<option value={i}>{timeFormat(i)}</option>)
  }

  // =================== 모달 관련 ===================
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  let [scrollY, setScrollY] = useState<number>(0);
  let [detailInfo, setDetailInfo] = useState<ReportDetailType>({});        // 선택한 레포트의 상세내역을 전달할 객체
  const { lockScroll, openScroll } = useBodyScrollLock();
  /** 모달이 열리면 실행되는 함수 */
  const handleModalOpen = useCallback((detailInfo: ReportDetailType) => {
    setScrollY(window.scrollY);
    setIsModalOpen(true);
    setDetailInfo(detailInfo);
    lockScroll();
  }, [lockScroll])
  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setDetailInfo({});
    openScroll();
  }, [openScroll]);




  return (
    <ReportSection>

      { isModalOpen && <ReportModal scrollY={scrollY} detailInfo={detailInfo} handleModalClose={handleModalClose}  /> }

      <Title title="레포트" />

      <Form style={{height :"30px", marginBottom: "15px", display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
        <div>
          <div>
            <Label theme={theme}> 장비 종류
              <select name="ohtSn">
                <option value="ALL">전체</option>
                <option value="V30001">V30001</option>
                <option value="V30002">V30002</option>
                <option value="V30003">V30003</option>
              </select>
            </Label>
            <Label theme={theme}> 검사 시작 일자
              <input type="date" value={startDate} name="startDate" max={endDate} onChange={e => handleChangeStartDate(e)} />
            </Label>
            <Label theme={theme}> 검사 마감 일자
              <input type="date" value={endDate} name="endDate" max={todayDate} min={startDate} onChange={e => handleChangeEndDate(e)} />
            </Label>
            <Label theme={theme}> 검사 시간
              <select name="time">
                <option value="ALL" selected={startDate !== endDate}>전체</option>
                {timeInput.map(option => option)}
              </select>
            </Label>
            <Label theme={theme}> 검사 휠 위치
              <select name="wheelPosition">
                <option value="ALL">전체</option>
                <option value="FL">FL</option>
                <option value="FR">FR</option>
                <option value="RL">RL</option>
                <option value="RR">RR</option>
              </select>
            </Label>
            <Label theme={theme}> 정렬 기준
              <select name="descFlag">
                <option value="0">오래된 순</option>
                <option value="1">최신 순</option>
              </select>
            </Label>
            <Label theme={theme}> 오류 기록만 조회
              <input type="checkbox" name="errorFlag" value={1}/>
            </Label>
            <SemesButton width="90px" height="100%" type="submit">조회하기</SemesButton>
          </div>
          <div>
            <Button width="90px" height="100%">CSV 출력</Button>
          </div>
        </div>
        <ReportTable handleModalOpen={handleModalOpen} />
        <fieldset>
          <label>
            <input type="radio" name="page" value={1} checked />
            <span>1</span>
          </label>
          <label>
            <input type="radio" name="page" value={2} />
            <span>2</span>
          </label>
          <label>
            <input type="radio" name="page" value={3} />
            <span>3</span>
          </label>
          <label>
            <input type="radio" name="page" value={4} />
            <span>4</span>
          </label>
        </fieldset>
      </Form>

    </ReportSection>
  );
}

export default ReportPage;