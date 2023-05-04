import React from 'react';
import {CloseButton, Modal, ModalBackground, ModalReportContainer} from "../components/Modal/ModalComponents";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Title from "../components/Title";
import {Button} from "../components/ButtonComponents";
// import DetailTable from "../components/Modal/DetailTable";
import {useNavigate, useOutletContext} from "react-router-dom";
import styled from "styled-components";
import {BlurBackground} from "../components/ReportDetail/ReportDetailComponents";
const TitleButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

function ReportDetailPage() {
  const navigate = useNavigate();
  const [scrollY] = useOutletContext<string[]>();

  return (
    <>
      <BlurBackground scrollY={scrollY} />
      <ModalReportContainer>
        <CloseButton onClick={() => navigate(-1)}><KeyboardDoubleArrowRightIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
        <TitleButtonDiv>
          <Title title="레포트 상세보기" />
          <Button width="90px" height="25px">CSV 출력</Button>
        </TitleButtonDiv>
        {/*<DetailTable detailInfo={detailInfo} />*/}
      </ModalReportContainer>
    </>
  );
}

export default ReportDetailPage;