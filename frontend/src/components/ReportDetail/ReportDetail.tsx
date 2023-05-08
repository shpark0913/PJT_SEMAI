import React from "react";
import styled from "styled-components";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { CloseButton } from "../Modal/ModalComponents";
import { ReportObjectType } from "../../_utils/Types";
import DetailTable from "../Modal/DetailTable";

const ReportDetailContainer = styled.div`
  background-color: var(--background-color);
  //box-shadow: -10px 0px 10px -10px rgba(33, 35, 38, 0.1);
  //box-shadow: rgba(33, 35, 38, 0.1) -10px 0px 10px -10px;
  //flex-shrink: 1;
  width: 100%;
  height: 100%;
  padding-left: 30px;
  transition: width 1000ms ease, transform 1000ms ease, box-shadow 1000ms ease;
  
  &.open{
    width: 100%;
    transform: translateX(0);
    box-shadow: -10px 0 10px -10px rgba(33, 35, 38, 0.1);
  }
  &.close {
    width: 0;
    transform: translateX(150%);
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