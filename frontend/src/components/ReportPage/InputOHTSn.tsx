import React from 'react';
import {Label} from "./FilterComponents";
import {useAppSelector} from "../../_hooks/hooks";

function InputOhtSn() {
  let theme= useAppSelector(state => state.theme.theme)
  return (
    <Label theme={theme}> 장비 종류
      <select name="ohtSn">
        <option value="ALL">전체</option>
        <option value="V30001">V30001</option>
        <option value="V30002">V30002</option>
        <option value="V30003">V30003</option>
      </select>
    </Label>
  );
}

export default InputOhtSn;