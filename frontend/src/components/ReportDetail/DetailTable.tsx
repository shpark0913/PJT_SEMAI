import React, { useState } from "react";
import { TBody, TD, TH, TR, Table, TableContainer } from "../TableComponents";
import { setCheckId, setInquire, setWheelImgUrl } from "../../_store/slices/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { CloseButton } from "../Modal/ModalComponents";
import CloseIcon from "@mui/icons-material/Close";
import Fade from "@mui/material/Fade";
import ImageUrl from "../../_utils/ImageUrl";
import Modal from "@mui/material/Modal";
import { ReactComponent as RefreshBtn } from "../../assets/refreshBtn.svg";
import { ReportObjectType } from "../../_utils/Types";
import Title from "../Title";
import styled from "styled-components";
import useDate from "../../_hooks/useDate";

function DetailTable({ detailInfo }: { detailInfo: ReportObjectType }) {
  let { wheelReportId, dateFormat, timeFormat } = useDate();
  const imgUrl = useSelector((state: any) => {
    return state.dashboard.imgUrl;
  });
  const IMG_URL = process.env.REACT_APP_IMG_URL;
  const indexList = [0, 1, 2, 3];
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const divStyle = {
    width: "45vw",
    height: "45vw",
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <TableContainer style={{ width: "100%" }}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "400",
              backgroundColor: "white",
              border: "2px solid #000",
              boxShadow: "24",
              p: "4",
              color: "black",
            }}
          >
            <div style={divStyle}>
              <CloseButton
                style={{ position: "absolute", right: "1.5vw", top: "1.5vw", color: "#A3D1FF" }}
                onClick={handleClose}
              >
                <CloseIcon sx={{ width: "35px", height: "35px" }} />
              </CloseButton>
            </div>
          </Box>
        </Fade>
      </Modal>
      <Table className="detail">
        <TBody>
          <TR>
            <TH>검사 ID</TH>
            <TD colSpan={2}>{`${detailInfo.ohtSn}-${detailInfo.wheelPosition}-${wheelReportId(
              detailInfo.wheelCheckDate.slice(0, 6),
            )}`}</TD>
          </TR>
          <TR>
            <TH>일자</TH>
            <TD colSpan={2}>{`${dateFormat(detailInfo.wheelCheckDate.slice(0, 3))}`}</TD>
          </TR>
          <TR>
            <TH>시간</TH>
            <TD colSpan={2}>{`${timeFormat(detailInfo.wheelCheckDate.slice(3, 6))}`}</TD>
          </TR>
          <TR>
            <TH>호기</TH>
            <TD colSpan={2}>{detailInfo.ohtSn}</TD>
          </TR>
          <TR>
            <TH>휠 위치</TH>
            <TD colSpan={2}>{detailInfo.wheelPosition}</TD>
          </TR>
          <TR>
            <TH>판정 결과</TH>
            <TD colSpan={2}>{detailInfo.boltGoodCount === 11 ? "정상" : "NG"}</TD>
          </TR>
          <TR>
            <TH>기준값</TH>
            <TD colSpan={2}>11</TD>
          </TR>
          <TR>
            <TH rowSpan={3}>결과값</TH>
            <TH>양호</TH>
            <TD>{detailInfo.boltGoodCount}</TD>
            {/*<TD>{ detailInfo.boltGoodCount }</TD>*/}
          </TR>
          <TR>
            {/*<TD></TD>*/}
            <TH>유실</TH>
            <TD>{detailInfo.boltOutCount}</TD>
          </TR>
          <TR>
            {/*<TD></TD>*/}
            <TH>파단</TH>
            <TD>{detailInfo.boltLoseCount}</TD>
          </TR>
          <TR>
            <TH>Marked Image</TH>
            <TD colSpan={2}>
              <img
                width="100%"
                src={ImageUrl(detailInfo.markingUrl)}
                alt=""
                onClick={() => {
                  dispatch(setWheelImgUrl(`${IMG_URL}${detailInfo.markingUrl}`));
                  setOpen(true);
                }}
                style={{ cursor: "pointer" }}
              />
            </TD>
          </TR>
          <TR>
            <TH>Raw Image</TH>
            <TD colSpan={2}>
              <img
                width="100%"
                src={ImageUrl(detailInfo.originUrl)}
                alt=""
                onClick={() => {
                  dispatch(setWheelImgUrl(`${ImageUrl(detailInfo.originUrl)}`));
                  setOpen(true);
                }}
                style={{ cursor: "pointer" }}
              />
            </TD>
          </TR>
        </TBody>
      </Table>
    </TableContainer>
  );
}

export default DetailTable;
