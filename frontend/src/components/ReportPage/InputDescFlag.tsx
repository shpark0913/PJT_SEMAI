import React from 'react';
import {useAppSelector} from "../../_hooks/hooks";
import {Label} from "./FilterComponents";

function InputDescFlag({descFlag}: {descFlag: string}) {
  const theme=useAppSelector(state => state.theme.theme)

  return (
    <Label theme={theme}> 정렬 기준
      <select name="descFlag" defaultValue={descFlag}>
        <option value="0">오래된 순</option>
        <option value="1">최신 순</option>
      </select>
    </Label>
  );
}

export default InputDescFlag;