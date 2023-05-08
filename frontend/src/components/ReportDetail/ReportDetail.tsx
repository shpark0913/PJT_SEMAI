import React from "react";
import styled from "styled-components";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { CloseButton } from "../Modal/ModalComponents";
import { ReportObjectType } from "../../_utils/Types";
import DetailTable from "../Modal/DetailTable";

const ReportDetailContainer = styled.div`
  background-color: #4a77d4;
  
  height: 100%;
  width: 100%;
  padding-left: 30px;
`
function ReportDetail({handleModalClose, detailInfo}: {handleModalClose: any, detailInfo: ReportObjectType}) {
  return (
    <ReportDetailContainer>
      <CloseButton onClick={handleModalClose}><KeyboardDoubleArrowRightIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
      <DetailTable detailInfo={detailInfo} />
    </ReportDetailContainer>
  );
}

export default ReportDetail;