import React from "react";
import { TransferBoltImageObject } from "../../_utils/Types";
import { CloseButton, Modal, ModalBackground, ModalImageContainer } from "../Modal/ModalComponents";
// import Title from "../Title";
import CloseIcon from "@mui/icons-material/Close";

function ConfirmModal({ selected }: {selected: TransferBoltImageObject[]}) {
  return (
    <Modal>
      <ModalBackground />
      <ModalImageContainer>
        <CloseButton ><CloseIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
        <div>여기에 내용 띄우자,,,,</div>
      </ModalImageContainer>
    </Modal>
  );
}

export default ConfirmModal;