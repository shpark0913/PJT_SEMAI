import React, {useState} from "react";
import {Button, RedButton, SemesButton} from "../ButtonComponents";
import useTransferBoltImages from "../../_hooks/useTransferBoltImages";
import {TransferBoltImageObject} from "../../_utils/Types";
// import useConfirmModal from "../../_hooks/useConfirmModal";
// import ConfirmModal from "./ConfirmModal";


function TransferButtons() {
  // const { setIsConfirmModalOpen } = useConfirmModal();
  let [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const { TransferClass, TransferLearning, DeleteImages } = useTransferBoltImages();
  // let [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  let [type, setType] = useState<{preType: number, nextType: number}>({preType: 0, nextType: 1});
  let TransferValue = ['양호로 이동', '유실로 이동', '파단으로 이동', '학습으로 이동', '삭제하기'];

  // type에 대해서
  // 0: 양호, 1: 유실, 2: 파단, 3: 학습, 4: 삭제

  const handleOpenConfirmModal = (preType: number, nextType: number) => {
    setIsConfirmModalOpen(true);
    setType({
      preType: preType,
      nextType: nextType
    });
  }

  /** 모달창 띄우는 버튼 */
  const ConfirmTransferClassButton = (preType: number): JSX.Element[] => {
    if (preType < 3 ) {      // 클래스 탭인 경우 -> 클래스 이동, 학습 이동, 삭제 기능
      return TransferValue.map((val, idx) => {
        if (idx === preType) return <></>;
        if (idx < 3) return <Button onClick={() => {
          handleOpenConfirmModal(preType, idx);
        }}> {val} </Button>;
        else if (idx === 3) return <SemesButton onClick={() => {
          handleOpenConfirmModal(preType, idx);
        }}> {val} </SemesButton>;
        else return <RedButton onClick={() => {
            handleOpenConfirmModal(preType, idx);
          }}> {val} </RedButton>;
      });
    }
    else {     // 학습하기 탭인 경우 -> 학습 버튼과 삭제 버튼만..
      return [
        <SemesButton onClick={() => handleOpenConfirmModal(preType, 3)}> '학습하기' </SemesButton>,
        <RedButton onClick={() => {handleOpenConfirmModal(preType, 4)}}> '삭제하기' </RedButton>
      ]
    }
  }
  const CancelConfirmModalButton = () => {
    return <Button onClick={ () => setIsConfirmModalOpen(false) }>취소하기</Button>
  }

  // const OpenConfirmModal = (nextType: number) => {
  //   switch (nextType) {
  //     case 0:
  //       return <Button onClick={ () => setIsConfirmOpen(true) }>{ TransferValue[0] }</Button>
  //     case 1:
  //       return <Button onClick={ () => setIsConfirmOpen(true) }>{ TransferValue[1] }</Button>
  //     case 2:
  //       return <Button onClick={ () => setIsConfirmOpen(true) }>{ TransferValue[2] }</Button>
  //     case 3:
  //       return <SemesButton onClick={ () => setIsConfirmOpen(true) }>{ TransferValue[3] }</SemesButton>
  //     case 4:
  //       return <RedButton onClick={ () => setIsConfirmOpen(true) }>{ TransferValue[4] }</RedButton>
  //   }
  // }

  /** 다른 클래스로 이동하기  */
  const TransferClassButton = (preType: number, nextType: number, fileIds: number[]) => {
    switch (nextType) {
      case 0:
        return <Button onClick={ () => TransferClass(preType, nextType, fileIds) }>{ TransferValue[0] }</Button>
      case 1:
        return <Button onClick={ () => TransferClass(preType, nextType, fileIds) }>{ TransferValue[1] }</Button>
      case 2:
        return <Button onClick={ () => TransferClass(preType, nextType, fileIds) }>{ TransferValue[2] }</Button>
    }
  }

  const TransferLearningButton = (fileIds: number[]) => {
    return <SemesButton onClick={ () => TransferLearning(fileIds) }>{ TransferValue[3] }</SemesButton>
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
    }}>{TransferValue[4]}</RedButton>
  }
  return { isConfirmModalOpen, ConfirmTransferClassButton, CancelConfirmModalButton, TransferClassButton, TransferLearningButton, DeleteImagesButton }
}

export default TransferButtons;