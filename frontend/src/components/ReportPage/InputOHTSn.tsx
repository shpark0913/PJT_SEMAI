import React from 'react';
import {Label} from "./FilterComponents";
import {useAppSelector} from "../../_hooks/hooks";

function InputOhtSn() {
  let theme= useAppSelector(state => state.theme.theme);

  return (
    <Label theme={theme} style={{display: "none"}} > 장비 종류
      <select name="ohtSn" defaultValue={"ALL"} >
        <option value="ALL">전체</option>
        <option value="P1">P1</option>
        <option value="P2">P2</option>
        <option value="P3">P3</option>
        <option value="P4">P4</option>
        <option value="P5">P5</option>
        <option value="P6">P6</option>
      </select>
    </Label>
  );
}

export default InputOhtSn;