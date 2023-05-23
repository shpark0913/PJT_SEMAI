import React from 'react';
import {
  BoltImageDetailContainer,
  BoltImageDetailImg,
  BoltImageDetailWrapper
} from "./styles/TabContentComponents";
import {setIsDetailOpen} from "../../_store/slices/transferPageSlice";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ImageUrl from "../../_utils/ImageUrl";
import {useAppDispatch, useAppSelector} from "../../_hooks/hooks";
import { CloseButton } from "../ReportDetail/styles/ReportDetailComponents";

function BoltImageDetail() {
  const dispatch = useAppDispatch();
  const { isDetailOpen, detailInfo } = useAppSelector(state => state.transferPage);
  return (
    <BoltImageDetailContainer className={isDetailOpen? "active" : ""}>
      <CloseButton onClick={() => dispatch(setIsDetailOpen(false))}><KeyboardDoubleArrowRightIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
      <BoltImageDetailWrapper>
        <BoltImageDetailImg src={ImageUrl(detailInfo.imgUrl)} alt="bolt detail"/>
        <div>{detailInfo.originName}</div>
      </BoltImageDetailWrapper>
    </BoltImageDetailContainer>
  );
}

export default BoltImageDetail;