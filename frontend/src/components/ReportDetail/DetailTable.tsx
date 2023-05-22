import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { setWheelImgUrl } from "../../_store/slices/dashboardSlice";
import useDate from "../../_hooks/useDate";
import ImageUrl from "../../_utils/ImageUrl";
import {useAppSelector} from "../../_hooks/hooks";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";

import { CloseButton } from "../Modal/ModalComponents";
import { TBody, TD, TH, TR, Table, TableContainer } from "../TableComponents";

function DetailTable() {
  const dispatch = useDispatch();
  let { wheelReportId, dateFormat, timeFormat } = useDate();
  let { imgUrl } = useAppSelector(state => state.dashboard)
  const { reportDetail } = useAppSelector(state => state.reportPage);
  const { ohtSn, boltGoodCount, boltOutCount, boltLoseCount, wheelCheckDate, wheelPosition, markingUrl, originUrl  } = reportDetail;

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const divStyle = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
        <TableContainer style={{ width: "100%" }}>
          {/* 이미지 상세보기 모달창 */}
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
                  width: "80vh",
                  height: "80vh",
                  backgroundColor: "white",
                  border: "2px solid #000",
                  boxShadow: "24",
                  p: "4",
                  color: "black",
                }}
              >
                <div style={divStyle}>
                  <CloseButton
                    style={{ position: "absolute", right: "1.5vw", top: "1.5vh", color: "#A3D1FF" }}
                    onClick={handleClose}
                  >
                    <CloseIcon sx={{ width: "35px", height: "35px" }} />
                  </CloseButton>
                </div>
              </Box>
            </Fade>
          </Modal>

          {/* 테이블 */}
          <Table className="detail">
            <TBody>
              <TR>
                <TH>검사 ID</TH>
                <TD colSpan={2}>{`${ ohtSn }-${wheelPosition}-${wheelReportId(wheelCheckDate.slice(0, 6))}`}</TD>
              </TR>
              <TR>
                <TH>일자</TH>
                <TD colSpan={2}>{`${dateFormat(wheelCheckDate.slice(0, 3))}`}</TD>
              </TR>
              <TR>
                <TH>시간</TH>
                <TD colSpan={2}>{`${timeFormat(wheelCheckDate.slice(3, 6))}`}</TD>
              </TR>
              <TR>
                <TH>호기</TH>
                <TD colSpan={2}>{ohtSn}</TD>
              </TR>
              <TR>
                <TH>휠 위치</TH>
                <TD colSpan={2}>{wheelPosition}</TD>
              </TR>
              <TR>
                <TH>판정 결과</TH>
                <TD colSpan={2}>{boltGoodCount === 11 ? "정상" : "NG"}</TD>
              </TR>
              <TR>
                <TH>기준값</TH>
                <TD colSpan={2}>11</TD>
              </TR>
              <TR>
                <TH rowSpan={4}>결과값</TH>
                <TH>양호</TH>
                <TD>{boltGoodCount}</TD>
              </TR>
              <TR>
                <TH>유실</TH>
                <TD>{boltOutCount}</TD>
              </TR>
              <TR>
                <TH>파단</TH>
                <TD>{boltLoseCount}</TD>
              </TR>
              <TR>
                <TH>풀림</TH>
                <TD>
                  {11 - (boltLoseCount + boltOutCount + boltGoodCount)}
                </TD>
              </TR>
              <TR>
                <TH>Marked Image</TH>
                <TD colSpan={2}>
                  <img
                    width="100%"
                    src={ImageUrl(markingUrl)}
                    alt=""
                    onClick={() => {
                      dispatch(setWheelImgUrl(ImageUrl(reportDetail.markingUrl)));
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
                    src={ImageUrl(reportDetail.originUrl)}
                    alt=""
                    onClick={() => {
                      dispatch(setWheelImgUrl(ImageUrl(originUrl)));
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
