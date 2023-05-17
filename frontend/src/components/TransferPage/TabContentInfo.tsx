import React from 'react';
import {TabContentInfos} from "./styledComponents/TabContentComponents";
import {useAppSelector} from "../../_hooks/hooks";
import TransferButtons from "./TransferButtons";

function TabContentInfo({imageLengthList}: {imageLengthList: number[]}) {
  const { ConfirmTransferClassButton } = TransferButtons();
  const { selectedClass, selectedTrain, status } = useAppSelector(state => state.transferPage);
  return (
    <TabContentInfos>
      <div>
        <label>전체 선택 <input type="checkbox"/></label>
        { status <= 2 ?
          <div>{`현재 선택 : ${selectedClass[status].length}/${imageLengthList[status]}`}</div>
          :
          <div>{`현재 선택 : ${selectedTrain.reduce((acc, cur) => acc + cur.length, 0)}/${imageLengthList[status]}`}</div>
        }
      </div>
      <div> {ConfirmTransferClassButton()} </div>
    </TabContentInfos>
  );
}

export default TabContentInfo;