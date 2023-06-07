import React, { useCallback, useMemo } from "react";

import { useAppSelector } from "../../_hooks/hooks";
import useSubmitForm from "../../_hooks/useSubmitForm";
import useDate from "../../_hooks/useDate";

import { Button } from "../ButtonComponents";
import { FormTop, FormInput, PeriodButton, Label } from "./styles/FormInputsComponents";

function FormInputs() {
  const theme= useAppSelector(state => state.theme.theme);
  const userName = useAppSelector(state => state.user.userName);    // csv 출력 시 필요
  const { startDate, endDate, wheelPosition, descFlag, errorFlag, time } = useAppSelector(state => state.reportPage.queryObj);
  const { submitForm, submitFormPeriod } = useSubmitForm();
  const { todayFormat, timeFormat } = useDate();
  const todayDate = todayFormat();

  // 당일 조회 시 시간 select-option을 for문을 이용해 배열로 만들어둔다. (00:00, 01:00, ... 23:00)
  const timeInput = useMemo( () => {      
    const tmp = [];
    for(let i=0; i<24; i++) {
      tmp.push(<option key={`time-key-${i + 1}`} value={i}>{timeFormat([i, 0])}</option>)
    }
    return tmp;
  }, []);

  /** csv 파일을 다운받는 함수 */
  const handleDownloadCSV = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let searchParams = new URLSearchParams(window.location.search);   // 현재 url의 params를 가져온다.
    searchParams.delete("page");                                      // page를 지우고
    searchParams.set("userName", userName);                           // userName을 params에 넣음
    let newSearchParams: string[] = [];
    searchParams.forEach((val, key) => {
      newSearchParams.push(`${key}=${val}`);
    });

    window.location.href = `${process.env.REACT_APP_BASE_URL}report/download?${newSearchParams.join("&")}`;
  }, [userName]);

  return (
    <FormTop>
      <FormInput>
        <Label theme={theme} style={{display: "none"}} > 장비 종류
          <select name="ohtSn" defaultValue={"ALL"} >
            <option value="ALL">전체</option>
          </select>
        </Label>

        <Label theme={theme}> 검사 시작점
          <input type="date" name="startDate" value={startDate} max={endDate} onChange={(e) => submitForm(e)}/>
        </Label>

        <Label theme={theme}> 검사 종료점
          <input type="date" name="endDate" value={endDate} max={todayDate} min={startDate} onChange={(e) => submitForm(e)} />
        </Label>

        <Label theme={theme}> 검사 시간
          <select onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>submitForm(e)} name="time" disabled={startDate !== endDate} value={ startDate !== endDate? "ALL" : time }>
            <option value="ALL" >전체</option>
            {timeInput.map(option => option)}
          </select>
        </Label>

        <Label theme={theme}> 검사 휠 위치
          <select name="wheelPosition" value={wheelPosition} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => submitForm(e)}>
            <option value="ALL">전체</option>
            <option value="FL">FL</option>
            <option value="FR">FR</option>
            <option value="RL">RL</option>
            <option value="RR">RR</option>
          </select>
        </Label>

        <Label theme={theme}> 정렬 기준
          <select name="descFlag" value={descFlag} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => submitForm(e)}>
            <option value="0">오래된 순</option>
            <option value="1">최신 순</option>
          </select>
        </Label>

        <Label theme={theme}> 오류 기록만 조회
          <input type="checkbox" checked={errorFlag === "1"} name="errorFlag" value={1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => submitForm(e)} />
        </Label>

        {/* 기간 조회 버튼, 30일 7일 당일 */}
        <div>
          <PeriodButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => submitFormPeriod(e, 30)}
          >
            최근 30일 조회
          </PeriodButton>
          <PeriodButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => submitFormPeriod(e, 7)}
          >
            최근 7일 조회
          </PeriodButton>
          <PeriodButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => submitFormPeriod(e, 1)}
          >
            당일 조회
          </PeriodButton>
        </div>
      </FormInput>
      <Button onClick={(e) => handleDownloadCSV(e)} width="120px" height="26px">CSV 출력</Button>
    </FormTop>
  );
}

export default FormInputs;