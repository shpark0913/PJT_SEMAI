import React, { useState} from 'react';
import { Form } from "react-router-dom";
import styled from "styled-components";
import {useSelector} from "react-redux";

import {Button, SemesButton} from "../components/ButtonComponents";
import { Label } from "../components/ReportPage/FilterComponents"
import ReportTable from "../components/ReportPage/ReportTable";
import Title from "../components/Title";
import {RootState} from "../_store/store";
import DetailModal from "../components/DetailModal/DetailModal";
import { DetailInfoType } from "../_utils/Types";

const ReportSection = styled.section<{ isModalOpen: boolean }>`
  padding: 30px;
  
  display: flex;
  flex-direction: column;
  overflow-y: ${props => props.isModalOpen? "hidden" : "auto"};
`

let today = new Date();
let year = String(today.getFullYear());
let month = String(today.getMonth() + 1).padStart(2, "0");
let day = String(today.getDate()).padStart(2, "0");
let TodayDate = `${year}-${month}-${day}`;
console.log(TodayDate);

function ReportPage() {
  let [chosenDate, setChosenDate] = useState<string>(TodayDate);
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  let [detailInfo, setDetailInfo] = useState<object>({});
  let theme = useSelector((state:RootState) => state.theme.theme)


  const handleChange = (e:any) => {
    setChosenDate(e.target.value);
  }

  const handleModalOpen = (detailInfo: DetailInfoType) => {
    setIsModalOpen(true);
    setDetailInfo(detailInfo)
  }

  return (
    <ReportSection isModalOpen={isModalOpen}>

      { isModalOpen && <DetailModal detailInfo={detailInfo} setIsModalOpen={setIsModalOpen} /> }

      <Title title="레포트" />
      <Form style={{height :"30px", marginBottom: "15px", display: "flex", justifyContent: "space-between"}}>
        <div>
          <Label theme={theme}>
            장비 종류
            <select name="ohtSn">
              <option value="ALL">전체</option>
              <option value="V30001">V30001</option>
              <option value="V30002">V30002</option>
              <option value="V30003">V30003</option>
            </select>
          </Label>
          <Label theme={theme}>
            검사 일자
            <input type="date" value={chosenDate} name="date" max={TodayDate} onChange={e => handleChange(e)} />
          </Label>
          <Label theme={theme}>
            검사 시간
            <select name="time">
              <option value="ALL">전체</option>
              <option value="0">00:00</option>
              <option value="1">01:00</option>
              <option value="2">02:00</option>
              <option value="23">23:00</option>
            </select>
          </Label>
          <Label theme={theme}>
            검사 휠 위치
            <select name="wheelPosition">
              <option value="ALL">전체</option>
              <option value="FL">FL</option>
              <option value="FR">FR</option>
              <option value="RL">RL</option>
              <option value="RR">RR</option>
            </select>
          </Label>
          <SemesButton width="90px" height="100%" type="submit">조회하기</SemesButton>
        </div>
        <div>
          <Button width="90px" height="100%" type="submit">CSV 출력</Button>
        </div>
      </Form>

      <ReportTable handleModalOpen={handleModalOpen} />
    </ReportSection>
  );
}

export default ReportPage;