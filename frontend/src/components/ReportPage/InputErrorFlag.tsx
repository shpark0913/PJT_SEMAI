import React from 'react';
import {useAppSelector} from "../../_hooks/hooks";
import {Label} from "./FilterComponents";

function InputErrorFlag({handleSubmit}: {handleSubmit: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  const theme=useAppSelector(state => state.theme.theme);
  const { errorFlag } = useAppSelector(state => state.reportPage.queryObj);
  return (
    <Label theme={theme}> 오류 기록만 조회
      <input type="checkbox" checked={errorFlag === "1"} name="errorFlag" value={1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSubmit(e)} />
    </Label>
  );
}

export default InputErrorFlag;