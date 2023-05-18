import React from 'react';
import {Label} from "./FilterComponents";
import {useAppSelector} from "../../_hooks/hooks";

function InputStartDate({handleSubmit }: {
  handleSubmit: (e: React.ChangeEvent<HTMLInputElement>)=>void
}) {

  let theme= useAppSelector(state => state.theme.theme);
  let { startDate, endDate } = useAppSelector(state => state.reportPage.queryObj)
  return (
    <Label theme={theme}> 검사 시작점
      <input type="date" name="startDate" defaultValue={startDate} max={endDate} onChange={(e) => handleSubmit(e)}/>
    </Label>
  );
}


function InputEndDate({todayDate, handleSubmit }: {
  todayDate: string,
  handleSubmit: (e: React.ChangeEvent<HTMLInputElement>)=>void
}) {

  let theme= useAppSelector(state => state.theme.theme);
  let { startDate, endDate } = useAppSelector(state => state.reportPage.queryObj)

  return (
    <Label theme={theme}> 검사 종료점
      <input type="date" name="endDate" defaultValue={endDate} max={todayDate} min={startDate} onChange={(e) => handleSubmit(e)} />
    </Label>
  );
}

export {InputStartDate, InputEndDate};