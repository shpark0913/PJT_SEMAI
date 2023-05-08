import React, {useState} from 'react';
import {useAppSelector} from "../../_hooks/hooks";
import {Label} from "./FilterComponents";
import {QueryType} from "../../_utils/Types";

function InputDescFlag({query}: QueryType) {
  const theme=useAppSelector(state => state.theme.theme)
  let [descFlag, setDescFlag] = useState<string>(query.get('descFlag') || "0");

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