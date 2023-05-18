import React from 'react';
import {useAppSelector} from "../../_hooks/hooks";
import {Label} from "./FilterComponents";

function InputWheelPosition({handleSubmit}: {handleSubmit: (e: React.ChangeEvent<HTMLSelectElement>) => void}) {

  const theme = useAppSelector(state => state.theme.theme);
  const { wheelPosition } = useAppSelector(state => state.reportPage.queryObj)

  return (
    <Label theme={theme}> 검사 휠 위치
      <select name="wheelPosition" defaultValue={wheelPosition} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSubmit(e)}>
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