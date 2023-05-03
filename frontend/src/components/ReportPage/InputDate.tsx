import React from 'react';
import {Label} from "./FilterComponents";
import {useAppSelector} from "../../_hooks/hooks";

function InputStartDate({startDate, endDate, handleChangeStartDate }: {
  startDate: string,
  endDate: string,
  handleChangeStartDate: (e:React.ChangeEvent<HTMLInputElement>) => void
}) {

  let theme= useAppSelector(state => state.theme.theme);

  return (
    <Label theme={theme}> 검사 시작 일자
      <input type="date" value={startDate} name="startDate" max={endDate} onChange={e => handleChangeStartDate(e)} />
    </Label>
  );
}


function InputEndDate({startDate, endDate, todayDate, handleChangeEndDate }: {
  startDate: string,
  endDate: string,
  todayDate: string,
  handleChangeEndDate: (e:React.ChangeEvent<HTMLInputElement>) => void
}) {

  let theme= useAppSelector(state => state.theme.theme);

  return (
    <Label theme={theme}> 검사 마감 일자
      <input type="date" value={endDate} name="endDate" max={todayDate} min={startDate} onChange={e => handleChangeEndDate(e)} />
    </Label>
  );
}

export {InputStartDate, InputEndDate};