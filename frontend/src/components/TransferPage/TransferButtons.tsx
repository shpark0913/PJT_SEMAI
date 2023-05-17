import React from "react";
import {Button, RedButton, SemesButton} from "../ButtonComponents";
import useTransferBoltImages from "../../_hooks/useTransferBoltImages";
import {TransferBoltImageObject} from "../../_utils/Types";
import { useAppDispatch, useAppSelector } from "../../_hooks/hooks";
import { setIsConfirmModalOpen, setType } from "../../_store/slices/transferPageSlice";
import Axios from "../../_utils/Axios";

function TransferButtons() {
  const dispatch = useAppDispatch();
  let { isConfirmModalOpen, type, status } = useAppSelector(state => state.transferPage)
  const { TransferClass, TransferLearning, DeleteImages } = useTransferBoltImages();

  let TransferValue = ['양호로 이동', '유실로 이동', '파단으로 이동', '학습으로 이동', '삭제하기'];

  const handleOpenConfirmModal = (preType: number, nextType: number) => {
    dispatch(setIsConfirmModalOpen(true));
    dispatch(setType({
      preType: preType,
      nextType: nextType
    }));
  }

  /** 모달창 띄우는 버튼 */
  const ConfirmTransferClassButton = (): JSX.Element[] => {
    if (status <= 2 ) {      // 클래스 탭인 경우 -> 클래스 이동, 학습 이동, 삭제 기능
      return TransferValue.map((val, idx) => {
        if (idx === status) return <></>;
        if (idx < 3) return <Button onClick={() => {
          handleOpenConfirmModal(status, idx);
        }}> {val} </Button>;
        else if (idx === 3) return <SemesButton onClick={() => {
          handleOpenConfirmModal(status, idx);
        }}> {val} </SemesButton>;
        else return <RedButton onClick={() => {
            handleOpenConfirmModal(status, idx);
          }}> {val} </RedButton>;
      });
    }
    else {     // 학습하기 탭인 경우 -> 학습 버튼과 삭제 버튼만..
      return [
        <SemesButton onClick={() => handleOpenConfirmModal(status, 3)}> 학습하기 </SemesButton>,
        <RedButton onClick={() => handleOpenConfirmModal(status, 4)}> 삭제하기 </RedButton>
      ]
    }
  }
  const CancelConfirmModalButton = () => {
    return <Button onClick={() => dispatch(setIsConfirmModalOpen(false)) }>취소하기</Button>
  }


  /** 다른 클래스로 이동하기  */
  const TransferClassButton = (preType: number,
                               nextType: number,
                               selected: TransferBoltImageObject[],
                               setSelected: React.Dispatch<React.SetStateAction<TransferBoltImageObject[][]>>) => {

    return <SemesButton
      onClick={ () => {
        TransferClass(preType, nextType, selected.map(d => d.fileId));
        setSelected(prev => {
          const tmp = [...prev]
          tmp[preType] = []
          return [...tmp]
        });
        dispatch(setIsConfirmModalOpen(false));
      }}
    >
      {TransferValue[nextType]}
    </SemesButton>
  }

  const TransferLearningButton = (selected: TransferBoltImageObject[],
                                  setSelected: React.Dispatch<React.SetStateAction<TransferBoltImageObject[][]>>) => {
    return <SemesButton
      onClick={ () => {
        TransferLearning(selected.map(d => d.fileId));
        setSelected(prev => {
          const tmp = [...prev]
          tmp[type.preType] = []
          return [...tmp]
        });
        dispatch(setIsConfirmModalOpen(false));
      }}
    >
      { TransferValue[3] }
    </SemesButton>
  }
  const DeleteImagesButton = (preType: number,
                              selected: TransferBoltImageObject[],
                              setSelected: React.Dispatch<React.SetStateAction<TransferBoltImageObject[][]>>) => {
    return <RedButton onClick={() => {
      DeleteImages(selected.map(d => d.fileId))
      setSelected(prev => {
        const tmp = [...prev]
        tmp[preType] = []
        return [...tmp]
      });
      dispatch(setIsConfirmModalOpen(false));
    }}>{TransferValue[4]}</RedButton>
  }

  const handleTrain = async () => {
    try {
      const response = await Axios.get('transition/learning')
      console.log(response);
    }
    catch (error) {
      console.log(error)
    }
  }
  const TrainButton = () => {
    return <SemesButton onClick={() => handleTrain()}>학습하기</SemesButton>
  }

  return { isConfirmModalOpen, ConfirmTransferClassButton, CancelConfirmModalButton, TransferClassButton, TransferLearningButton, DeleteImagesButton, TrainButton }
}

export default TransferButtons;