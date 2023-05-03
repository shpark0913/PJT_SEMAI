import React from 'react';
import {useAppSelector} from "../../_hooks/hooks";
import {Label} from "./FilterComponents";

function InputWheelPosition({wheelPosition}: {wheelPosition:string}) {
  const theme=useAppSelector(state => state.theme.theme)
  return (
    <Label theme={theme}> 검사 휠 위치
      <select name="wheelPosition" defaultValue={wheelPosition}>
        <option value="ALL">전체</option>
        <option value="FL">FL</option>
        <option value="FR">FR</option>
        <option value="RL">RL</option>
        <option value="RR">RR</option>
      </select>
    </Label>
  );
}

export default InputWheelPosition;