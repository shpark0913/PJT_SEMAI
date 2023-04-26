import React from "react";
import { DetailContainer, ModalBackground, CloseButton } from "./ModalComponents";
import { DetailModalProps } from "../../_utils/Types";
import Title from "../Title";
import {Button} from "../ButtonComponents";
import DetailTable from "./DetailTable";
import styled from "styled-components";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const TitleButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`
function DetailModal({ detailInfo, setIsModalOpen }: DetailModalProps) {
  return (
    <div>
      <ModalBackground />
      <DetailContainer>
        <CloseButton onClick={e => setIsModalOpen(false)}><KeyboardDoubleArrowRightIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
        <TitleButtonDiv>
          <Title title="레포트 상세보기" />
          <Button width="90px" height="25px">CSV 출력</Button>
        </TitleButtonDiv>
        <DetailTable detailInfo={detailInfo} />
      </DetailContainer>
    </div>
  );
}

export default DetailModal;