import React, {useState} from 'react';
import {useAppSelector} from "../../_hooks/hooks";
import {Label} from "./FilterComponents";
import {QueryType} from "../../_utils/Types";

function InputErrorFlag({query}: QueryType) {
  const theme=useAppSelector(state => state.theme.theme);
  let [errorFlag, setErrorFlag] = useState<string>(query.get('errorFlag') || "0");
  return (
    <Label theme={theme}> 오류 기록만 조회
      <input type="checkbox" name="errorFlag" value={1} />
    </Label>
  );
}

export default InputErrorFlag;