import React from 'react';
import {useAppSelector} from "../../_hooks/hooks";
import {Label} from "./FilterComponents";

function InputDescFlag({handleSubmit}: {handleSubmit: (e: React.ChangeEvent<HTMLSelectElement>) => void}) {
  const theme=useAppSelector(state => state.theme.theme);

  const { descFlag } = useAppSelector(state => state.reportPage.queryObj)

  return (
    <Label theme={theme}> 정렬 기준
      <select name="descFlag" defaultValue={descFlag} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSubmit(e)}>
        <option value="0">오래된 순</option>
        <option value="1">최신 순</option>
      </select>
    </Label>
  );
}

export default InputDescFlag;