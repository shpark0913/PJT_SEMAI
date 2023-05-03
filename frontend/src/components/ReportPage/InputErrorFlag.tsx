import React from 'react';
import {useAppSelector} from "../../_hooks/hooks";
import {Label} from "./FilterComponents";

function InputErrorFlag() {
  const theme=useAppSelector(state => state.theme.theme)
  return (
    <Label theme={theme}> 오류 기록만 조회
      <input type="checkbox" name="errorFlag" value={1} />
    </Label>
  );
}

export default InputErrorFlag;