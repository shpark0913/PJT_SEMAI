import React, {useState} from 'react';
import {Label} from "./FilterComponents";
import useDate from "../../_hooks/useDate";
import {useAppSelector} from "../../_hooks/hooks";


function InputTime({startDate, endDate, query}: {
  startDate: string,
  endDate: string,
  query: URLSearchParams,
}) {
  let [time, setTime] = useState<string>(query.get('time') || "ALL");
  let {timeFormat} = useDate();
  const timeInput = []
  for(let i=0; i<24; i++) {
    timeInput.push(<option key={`time-key-${i + 1}`} value={i}>{timeFormat([i, 0])}</option>)
  }
  let theme= useAppSelector(state => state.theme.theme)


  return (
  <Label theme={theme}> 검사 시간
    <select name="time" disabled={startDate !== endDate} defaultValue={ startDate !== endDate? "ALL" : time }>
      <option value="ALL" >전체</option>
      {timeInput.map(option => option)}
    </select>
  </Label>
  );
}

export default InputTime;