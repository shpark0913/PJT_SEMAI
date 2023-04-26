import React from "react";
import { DetailContainer, ModalBackground, CloseButton } from "./ModalComponents";
import { DetailModalProps } from "../../_utils/Types";
import Title from "../Title";
import {Button} from "../ButtonComponents";
import DetailTable from "./DetailTable";

function DetailModal({ detailInfo, setIsModalOpen }: DetailModalProps) {

  return (
    <div>
      <ModalBackground />
      <DetailContainer>
        <CloseButton onClick={e => setIsModalOpen(false)}>{`>>`}</CloseButton>
        <div>
          <Title title="레포트 상세보기" />
          <Button width="90px" height="25px">CSV 출력</Button>
        </div>
        <DetailTable detailInfo={detailInfo} />
      </DetailContainer>
    </div>
  );
}

export default DetailModal;