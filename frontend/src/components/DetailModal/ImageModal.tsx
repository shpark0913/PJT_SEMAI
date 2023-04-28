import React from 'react';
import {CloseButton, Modal, ModalBackground, ModalImageContainer} from "./ModalComponents";
import CloseIcon from '@mui/icons-material/Close';
import Title from "../Title";
import {ImageModalProps} from "../../_utils/Types";

function ImageModal({detailInfo, handleModalClose}: ImageModalProps) {
  return (
    <Modal>
      <ModalBackground />
      <ModalImageContainer>
        <CloseButton onClick={handleModalClose}><CloseIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
        <Title title="볼트 이미지 상세보기" />
        <div>{detailInfo.imageUrl}</div>
        <div>{detailInfo.buttons}</div>
      </ModalImageContainer>
    </Modal>
  );
}

export default ImageModal;