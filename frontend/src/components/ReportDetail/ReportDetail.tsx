import styled from "styled-components";

import { CloseButton } from "../Modal/ModalComponents";
import DetailTable from "./DetailTable";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import React from "react";
import {useAppDispatch} from "../../_hooks/hooks";
import {setDetailClose} from "../../_store/slices/reportPageSlice";

const ReportDetailContainer = styled.div`
  background-color: var(--background-color);
  position: absolute;
  top: 0;
  right: 0;
  width: 800px;
  height: 100%;
  padding: 30px;
  overflow-y: auto;
  transition: width 600ms ease, transform 600ms ease, box-shadow 600ms ease;
  z-index: 100;

  &.open {
    transform: translateX(0);
    box-shadow: -15px 0 10px -10px var(--shadow-color);
  }
  &.close {
    transform: translateX(200%);
    box-shadow: none;
  }

  display: flex;
  flex-direction: column;
`;

function ReportDetail({className}: {className: string}) {
  const dispatch = useAppDispatch();
  return (
    <ReportDetailContainer className={className}>
      <CloseButton onClick={() => dispatch(setDetailClose())}>
        <KeyboardDoubleArrowRightIcon sx={{ height: "35px", width: "35px" }} />
      </CloseButton>
      <DetailTable />
    </ReportDetailContainer>
  );
}

export default ReportDetail;
