import React from "react";
import styled from "styled-components";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { CloseButton } from "../Modal/ModalComponents";
import { ReportObjectType } from "../../_utils/Types";
import DetailTable from "./DetailTable";

const ReportDetailContainer = styled.div`
  background-color: var(--background-color);
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-left: 30px;
  margin-left: 30px;
  transition: width 1000ms ease, transform 1000ms ease, box-shadow 1000ms ease;
  
  &.open{
    width: 100%;
    transform: translateX(0);
    box-shadow: -15px 0 10px -10px var(--shadow-color);
  }
  &.close {
    width: 0;
    transform: translateX(200%);
    box-shadow: none;
  }
  
`
function ReportDetail({handleModalClose, detailInfo, className}: {handleModalClose: any, detailInfo: ReportObjectType, className: string}) {
  return (
    <ReportDetailContainer className={className}>
      <CloseButton onClick={handleModalClose}><KeyboardDoubleArrowRightIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
      <DetailTable detailInfo={detailInfo} />
    </ReportDetailContainer>
  );
}

export default ReportDetail;