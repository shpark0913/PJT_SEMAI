import React from 'react';
import {Label} from "./FilterComponents";
import {useAppSelector} from "../../_hooks/hooks";

function InputStartDate({startDate, endDate, setStartDate }: {
  startDate: string,
  endDate: string,
  setStartDate: (val: string) => void,
}) {

  let theme= useAppSelector(state => state.theme.theme);

  return (
    <Label theme={theme}> 검사 시작 일자
      <input type="date" value={startDate} name="startDate" max={endDate} onChange={e => setStartDate(e.target.value)} />
    </Label>
  );
}


function InputEndDate({startDate, endDate, todayDate, setEndDate }: {
  startDate: string,
  endDate: string,
  todayDate: string,
  setEndDate: (val: string) => void
}) {

  let theme= useAppSelector(state => state.theme.theme);

  return (
    <Label theme={theme}> 검사 마감 일자
      <input type="date" value={endDate} name="endDate" max={todayDate} min={startDate} onChange={e => setEndDate(e.target.value)} />
    </Label>
  );
}

export {InputStartDate, InputEndDate};