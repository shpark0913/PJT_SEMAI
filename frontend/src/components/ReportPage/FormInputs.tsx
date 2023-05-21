import React, { useMemo } from "react";
import { SemesButton } from "../ButtonComponents";
import { FormTop, FormInput } from "./styledComponents/FormInputsComponents";
import { Label } from "./styledComponents/FilterComponents";
import { useAppSelector } from "../../_hooks/hooks";
import useSubmitForm from "../../_hooks/useSubmitForm";
import useDate from "../../_hooks/useDate";

function FormInputs() {
  let theme= useAppSelector(state => state.theme.theme);
  let { startDate, endDate, wheelPosition, descFlag, errorFlag, time } = useAppSelector(state => state.reportPage.queryObj);
  const { submitForm, submitFormPeriod } = useSubmitForm();
  const { todayFormat, timeFormat } = useDate();
  const todayDate = todayFormat();

  const timeInput = useMemo( () => {
    console.log("만들어요");
    const tmp = [];
    for(let i=0; i<24; i++) {
      tmp.push(<option key={`time-key-${i + 1}`} value={i}>{timeFormat([i, 0])}</option>)
    }
    return tmp;
  }, [])

  console.log(startDate, endDate);
  return (
    <FormTop>
      <FormInput>

        <Label theme={theme} style={{display: "none"}} > 장비 종류
          <select name="ohtSn" defaultValue={"ALL"} >
            <option value="ALL">전체</option>
          </select>
        </Label>

        <Label theme={theme}> 검사 시작점
          <input type="date" name="startDate" defaultValue={startDate} max={endDate} onChange={(e) => submitForm(e)}/>
        </Label>

        <Label theme={theme}> 검사 종료점
          <input type="date" name="endDate" defaultValue={endDate} max={todayDate} min={startDate} onChange={(e) => submitForm(e)} />
        </Label>

        <Label theme={theme}> 검사 시간
          <select onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>submitForm(e)} name="time" disabled={startDate !== endDate} defaultValue={ startDate !== endDate? "ALL" : time }>
            <option value="ALL" >전체</option>
            {timeInput.map(option => option)}
          </select>
        </Label>

        <Label theme={theme}> 검사 휠 위치
          <select name="wheelPosition" defaultValue={wheelPosition} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => submitForm(e)}>
            <option value="ALL">전체</option>
            <option value="FL">FL</option>
            <option value="FR">FR</option>
            <option value="RL">RL</option>
            <option value="RR">RR</option>
          </select>
        </Label>

        <Label theme={theme}> 정렬 기준
          <select name="descFlag" defaultValue={descFlag} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => submitForm(e)}>
            <option value="0">오래된 순</option>
            <option value="1">최신 순</option>
          </select>
        </Label>

        <Label theme={theme}> 오류 기록만 조회
          <input type="checkbox" checked={errorFlag === "1"} name="errorFlag" value={1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => submitForm(e)} />
        </Label>

        <div>
          <SemesButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => submitFormPeriod(e, 30)}
            width="120px"
            height="26px"
            style={{ marginRight: "20px" }}
          >
            최근 30일 조회
          </SemesButton>
          <SemesButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => submitFormPeriod(e, 7)}
            width="120px"
            height="26px"
            style={{ marginRight: "20px" }}
          >
            최근 7일 조회
          </SemesButton>
          <SemesButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => submitFormPeriod(e, 1)}
            width="120px"
            height="26px"
            style={{ marginRight: "20px" }}
          >
            당일 조회
          </SemesButton>
        </div>
      </FormInput>

      {/*<Button onClick={() => handleDownloadCSV()} width="90px" height="26px">*/}
      {/*  CSV 출력*/}
      {/*</Button>*/}
    </FormTop>
  );
}

export default FormInputs;