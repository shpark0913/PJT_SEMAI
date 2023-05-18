import React from 'react';
import {TabContentInfos} from "./styledComponents/TabContentComponents";
import {useAppDispatch, useAppSelector} from "../../_hooks/hooks";
import TransferButtons from "./TransferButtons";
import {setSelectedClass, setSelectedTrain} from "../../_store/slices/transferPageSlice";
import {TransferLoaderType} from "../../_utils/Types";
import styled from "styled-components";

const SelectCountInfo = styled.div`
  font-size: 18px;
  
  display: flex;
  align-items: center;
  
  & > * {
    margin-right: 15px;
  }
  & > label {
    display: flex;
    align-items: center;
  }
  & input[type=checkbox] {
    width: 18px;
    height: 18px;
  }
`;

function TabContentInfo({ BoltImageLists, imageLengthList }:
                          { BoltImageLists: TransferLoaderType[][],
                            imageLengthList: number[]}) {
  const dispatch = useAppDispatch();
  const { ConfirmMoveClassButton, ConfirmMoveTrainButton, ConfirmDeleteButton, ConfirmTrainButton } = TransferButtons();
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
    console.log(e.target.checked)
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
        <SelectCountInfo>
          <div>{`현재 선택 : ${selectedClass[status].length}/${imageLengthList[status]}`}</div>
          <label>전체 선택 <input type="checkbox" checked={selectedClass[status].length === imageLengthList[status]} onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleCheckClassAll(e)}/></label>
        </SelectCountInfo>
        <div>
          { selectedClass[status].length ?
            <>
              { ConfirmMoveClassButton() }
              { ConfirmMoveTrainButton() }
              { ConfirmDeleteButton() }
            </>
            : <></>
          }

        </div>
        </>
        :
        <>
        <SelectCountInfo>
          <div>{`현재 선택 : ${selectedTrain.reduce((acc, cur) => acc + cur.length, 0)}/${imageLengthList[status]}`}</div>
          <label>전체 선택 <input type="checkbox" checked={selectedTrain.reduce((acc, cur) => acc + cur.length, 0) === imageLengthList[status]} onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleCheckTrainAll(e)}/></label>
        </SelectCountInfo>
        <div>
          { selectedTrain.reduce((acc, cur) => acc + cur.length, 0) ?
            <>
              { ConfirmTrainButton() }
              { ConfirmDeleteButton() }
            </>
            : <></>
          }

        </div>
        </> }
    </TabContentInfos>
  );
}

export default TabContentInfo;