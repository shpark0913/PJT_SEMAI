import React, { useState} from 'react';
import { Form } from "react-router-dom";
import styled from "styled-components";

import { Button } from "../components/ButtonComponents";
import { Label } from "../components/ReportPage/FilterComponents"
import ReportTable from "../components/ReportPage/ReportTable";

const ReportSection = styled.section`
  padding: 30px;
  
  display: flex;
  flex-direction: column;
`

let today = new Date();
let year = String(today.getFullYear());
let month = String(today.getMonth() + 1).padStart(2, "0");
let day = String(today.getDate()).padStart(2, "0");
let TodayDate = `${year}-${month}-${day}`;
console.log(TodayDate);

function ReportPage() {
  let [chosenDate, setChosenDate] = useState<string>(TodayDate)


  const handleChange = (e:any) => {
    setChosenDate(e.target.value);
  }

  return (
    <ReportSection>
      <h1>레포트</h1>
      <Form style={{height :"30px", marginBottom: "10px"}}>
        <Label>
          장비 종류
          <select name="ohtSn">
            <option value="ALL">전체</option>
            <option value="V30001">V30001</option>
            <option value="V30002">V30002</option>
            <option value="V30003">V30003</option>
          </select>
        </Label>
        <Label>
          검사 일자
          <input type="date" value={chosenDate} name="date" max={TodayDate} onChange={e => handleChange(e)} />
        </Label>
        <Label>
          검사 시간
          <select name="time">
            <option value="ALL">전체</option>
            <option value="0">00:00</option>
            <option value="1">01:00</option>
            <option value="2">02:00</option>
            <option value="23">23:00</option>
          </select>
        </Label>
        <Label>
          검사 휠 위치
          <select name="wheelPosition">
            <option value="ALL">전체</option>
            <option value="FL">FL</option>
            <option value="FR">FR</option>
            <option value="RL">RL</option>
            <option value="RR">RR</option>
          </select>
        </Label>

        <Button width="90px" height="100%" type="submit">조회하기</Button>
      </Form>
      <ReportTable />
    </ReportSection>
  );
}

export default ReportPage;