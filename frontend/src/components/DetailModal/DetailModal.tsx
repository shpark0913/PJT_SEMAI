import React from "react";
import { DetailContainer, ModalBackground } from "./ModalComponents";
import { DetailModalProps } from "../../_utils/Types";

function DetailModal({ detailInfo, setIsModalOpen }: DetailModalProps) {
  return (
    <div>
      <ModalBackground></ModalBackground>
      <DetailContainer>
        <div onClick={e => setIsModalOpen(false)}>X</div>
        <div>{detailInfo.ohtSn}</div>
      </DetailContainer>
    </div>
  );
}

export default DetailModal;