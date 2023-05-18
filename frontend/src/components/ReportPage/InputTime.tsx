import React from 'react';
import {Label} from "./FilterComponents";
import useDate from "../../_hooks/useDate";
import {useAppSelector} from "../../_hooks/hooks";


function InputTime({handleSubmit}: {
  handleSubmit: (e: React.ChangeEvent<HTMLSelectElement>)=>void
}) {
  let theme= useAppSelector(state => state.theme.theme)
  let { time, startDate, endDate } = useAppSelector(state => state.reportPage.queryObj)
  let {timeFormat} = useDate();
  const timeInput = []
  for(let i=0; i<24; i++) {
    timeInput.push(<option key={`time-key-${i + 1}`} value={i}>{timeFormat([i, 0])}</option>)
  }

  return (
  <Label theme={theme}> 검사 시간
    <select onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>handleSubmit(e)} name="time" disabled={startDate !== endDate} defaultValue={ startDate !== endDate? "ALL" : time }>
      <option value="ALL" >전체</option>
      {timeInput.map(option => option)}
    </select>
  </Label>
  );
}

export default InputTime;