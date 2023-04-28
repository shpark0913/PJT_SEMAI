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
        <div style={{display: "flex", justifyContent: "right"}}>
          <CloseButton onClick={handleModalClose}><CloseIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
        </div>
        <Title title="볼트 이미지 상세보기" />
        <div style={{flex: "1", backgroundImage: `url(${detailInfo.imageUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat"}} />
        <div style={{margin: "20px 0 0 0"}}>{detailInfo.buttons}</div>
      </ModalImageContainer>
    </Modal>
  );
}

export default ImageModal;