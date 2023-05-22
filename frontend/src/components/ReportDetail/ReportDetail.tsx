import React from "react";

import { useAppDispatch } from "../../_hooks/hooks";
import { setDetailClose } from "../../_store/slices/reportDetailSlice";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DetailTable from "./DetailTable";
import { CloseButton, ReportDetailContainer } from "./styles/ReportDetailComponents";

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
