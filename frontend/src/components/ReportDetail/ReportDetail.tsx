import React from "react";
import styled, {keyframes} from "styled-components";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { CloseButton } from "../Modal/ModalComponents";
import { ReportObjectType } from "../../_utils/Types";
import DetailTable from "./DetailTable";

const fadeIn = keyframes`
  0% {
    right: -100%;
  }
  100% {
    right: 0;
  }
`
const fadeOut = keyframes`
  0% {
    right: 0;
  }
  100% {
    right: -100%;
  }
`


const ReportDetailContainer = styled.div`
  background-color: var(--background-color);
  position: absolute;
  top: 0;
  right: 0;
  width: 800px;
  height: 100%;
  overflow-y: auto;
  padding: 30px;
  //margin-left: 30px;
  //transform: translateX(150%);
  transition: width 600ms ease, transform 600ms ease, box-shadow 600ms ease;
  
  &.open{
    //width: 100%;
    transform: translateX(0);
    box-shadow: -15px 0 10px -10px var(--shadow-color);
    // animation-duration: 2s;
    // animation-name: ${fadeIn};
    // animation-fill-mode: forwards;
    // animation: ${fadeIn} 1s forwards ease-out;
  }
  &.close {
    //width: 0;
    transform: translateX(200%);
    box-shadow: none;
    // animation-duration: 2s;
    // animation-name: ${fadeOut};
    // animation-fill-mode: forwards;
    //animation: ${fadeOut} 1s forwards ease-out;
  }
  
  display: flex;
  flex-direction: column;
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