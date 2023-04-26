import React from "react";
import { DetailContainer, ModalBackground, CloseButton } from "./ModalComponents";
import { DetailModalProps } from "../../_utils/Types";
import Title from "../Title";

function DetailModal({ detailInfo, setIsModalOpen }: DetailModalProps) {

  return (
    <div>
      <ModalBackground />
      <DetailContainer>
        <CloseButton onClick={e => setIsModalOpen(false)}>{`>>`}</CloseButton>
        <div>
          <Title title="레포트 상세보기" />

        </div>
        <div>{detailInfo.ohtSn}</div>
      </DetailContainer>
    </div>
  );
}

export default DetailModal;