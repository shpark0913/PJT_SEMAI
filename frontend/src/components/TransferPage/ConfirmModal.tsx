import React from "react";
import { TransferBoltImageObject } from "../../_utils/Types";
import { CloseButton, Modal, ModalBackground, ModalImageContainer } from "../Modal/ModalComponents";
// import Title from "../Title";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../_hooks/hooks";
import { setIsConfirmModalOpen } from "../../_store/slices/transferPageSlice";
import ImageUrl from "../../_utils/ImageUrl";
import TransferButtons from "./TransferButtons";

function ConfirmModal({ selected, setSelected }: {selected: TransferBoltImageObject[], setSelected: React.Dispatch<React.SetStateAction<TransferBoltImageObject[][]>>}) {

  const dispatch = useAppDispatch();
  const { type } = useAppSelector(state => state.transferPage);
  const { TransferClassButton, CancelConfirmModalButton, TransferLearningButton, DeleteImagesButton } = TransferButtons();
  const ContentTitle = [
    '"양호"로 이동하겠습니까?',
    '"유실"로 이동하겠습니까?',
    '"파단"으로 이동하겠습니까?',
    '"학습"으로 이동하겠습니까?',
    '삭제하겠습니까?',
  ]

  return (
    <Modal>
      <ModalBackground onClick={() => dispatch(setIsConfirmModalOpen(false))}  />
      <ModalImageContainer>
        <CloseButton onClick={() => dispatch(setIsConfirmModalOpen(false))} ><CloseIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
        <div>{ContentTitle[type.nextType]}</div>
        <div>{`현재 : ${type.preType}, 다음 : ${type.nextType}`}</div>
        <div>
          { selected.map(data => <img src={ImageUrl(data.imgUrl)} alt='볼트 이미지'></img>) }
        </div>
        <div>
          { CancelConfirmModalButton() }

          { type.nextType < 3 ? TransferClassButton(type.preType, type.nextType, selected, setSelected ) : <></> }
          { type.nextType === 3 ? TransferLearningButton(selected, setSelected) :<></> }
          { type.nextType === 4 ? DeleteImagesButton(type.preType, selected, setSelected) :<></> }
        </div>
      </ModalImageContainer>
    </Modal>
  );
}

export default ConfirmModal;