import React from 'react';
import {TabContentInfos} from "./styledComponents/TabContentComponents";
import {useAppDispatch, useAppSelector} from "../../_hooks/hooks";
import TransferButtons from "./TransferButtons";
import {setSelectedClass, setSelectedTrain} from "../../_store/slices/transferPageSlice";
import {TransferLoaderType} from "../../_utils/Types";

function TabContentInfo({ BoltImageLists, imageLengthList }:
                          { BoltImageLists: TransferLoaderType[][],
                            imageLengthList: number[]}) {
  const dispatch = useAppDispatch();
  const { ConfirmTransferClassButton } = TransferButtons();
  const { selectedClass, selectedTrain, status } = useAppSelector(state => state.transferPage);

  const handleCheckClassAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(setSelectedClass({idx: status, list: BoltImageLists[0][status].images}))
    }
    else {
      dispatch(setSelectedClass({idx: status, list: []}))
    }
  }
  const handleCheckTrainAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      for (let i=0; i<3; i++) {
        dispatch(setSelectedTrain({idx: i, list: BoltImageLists[1][i].images}))
      }
    }
    else {
      for (let i=0; i<3; i++) {
        dispatch(setSelectedTrain({idx: i, list: []}))
      }
    }
  }

  return (
    <TabContentInfos>
      { status <= 2 ?
        <>
        <div>
          <label>전체 선택 <input type="checkbox" onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleCheckClassAll(e)}/></label>
            <div>{`현재 선택 : ${selectedClass[status].length}/${imageLengthList[status]}`}</div>
        </div>
        <div> {ConfirmTransferClassButton()} </div>
        </>
        :
        <>
        <div>
          <label>전체 선택 <input type="checkbox" onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleCheckTrainAll(e)}/></label>
          <div>{`현재 선택 : ${selectedTrain.reduce((acc, cur) => acc + cur.length, 0)}/${imageLengthList[status]}`}</div>
        </div>
        <div> {ConfirmTransferClassButton()} </div>
        </> }
    </TabContentInfos>
  );
}

export default TabContentInfo;