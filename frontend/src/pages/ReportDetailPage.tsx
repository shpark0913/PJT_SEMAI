import React from 'react';
import {CloseButton, Modal, ModalBackground, ModalReportContainer} from "../components/DetailModal/ModalComponents";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Title from "../components/Title";
import {Button} from "../components/ButtonComponents";
// import DetailTable from "../components/DetailModal/DetailTable";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const TitleButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

function ReportDetailPage() {
  const navigate = useNavigate();
  return (
    <Modal scrollY={0}>
      <ModalBackground />
      <ModalReportContainer>
        <CloseButton onClick={() => navigate(-1)}><KeyboardDoubleArrowRightIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
        <TitleButtonDiv>
          <Title title="레포트 상세보기" />
          <Button width="90px" height="25px">CSV 출력</Button>
        </TitleButtonDiv>
        {/*<DetailTable detailInfo={detailInfo} />*/}
      </ModalReportContainer>
    </Modal>
  );
}

export default ReportDetailPage;