import React from "react";
import {ModalReportContainer, ModalBackground, CloseButton, Modal} from "./ModalComponents";
import { ReportModalProps } from "../../_utils/Types";
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
function ReportModal({ detailInfo, handleModalClose, scrollY }: ReportModalProps) {
  return (
    <Modal scrollY={scrollY}>
      <ModalBackground />
      <ModalReportContainer>
        <CloseButton onClick={handleModalClose}><KeyboardDoubleArrowRightIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
        <TitleButtonDiv>
          <Title title="레포트 상세보기" />
          <Button width="90px" height="25px">CSV 출력</Button>
        </TitleButtonDiv>
        <DetailTable detailInfo={detailInfo} />
      </ModalReportContainer>
    </Modal>
  );
}

export default ReportModal;