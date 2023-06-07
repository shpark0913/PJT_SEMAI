import { TBody, TD, TH, THeadMain, TR, Table } from "../TableComponents";
import { setClickWheelData, setInquire } from "../../_store/slices/sseSlice";
import { useDispatch, useSelector } from "react-redux";

import Axios from "../../_utils/Axios";
import { Button } from "../ButtonComponents";
import { setCheckId } from "../../_store/slices/dashboardSlice";
import { useState } from "react";

function OHTResultMenu(props) {
  const dashboardData = useSelector(state => state.sseEvent.dashboardData);
  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  async function f(checkId) {
    const response = await Axios.get(`${BASE_URL}dashboard/main/${checkId}`);
    const newWheelData = response.data.data;
    dispatch(setClickWheelData(newWheelData));
    return newWheelData;
  }
  return (
    <Table>
      <THeadMain style={{ borderTop: "solid 2px var(--emphasize-color)" }}>
        <TR>
          <TH>&nbsp;&nbsp;&nbsp; 날짜 &nbsp;&nbsp;&nbsp;</TH>
          <TH>&nbsp;&nbsp;&nbsp; 시간 &nbsp;&nbsp;&nbsp;</TH>
          <TH>&nbsp;&nbsp; 호기 ID &nbsp;&nbsp;</TH>
          <TH>&nbsp; 판정 결과 &nbsp;</TH>
          <TH>&nbsp; FL &nbsp;</TH>
          <TH>&nbsp; FR &nbsp;</TH>
          <TH>&nbsp; RL &nbsp;</TH>
          <TH>&nbsp; RR &nbsp;</TH>
          <TH>상세보기</TH>
        </TR>
      </THeadMain>
      {props.isActive ? (
        <TBody>
          {dashboardData.map((item, idx) => {
            if (item.ohtCheckEndDatetime) {
              return (
                <TR key={idx} NG={item.flCount + item.frCount + item.rlCount + item.rrCount}>
                  <TD>
                    {item.ohtCheckEndDatetime[0]}-
                    {String(item.ohtCheckEndDatetime[1]).padStart(2, "0")}-
                    {String(item.ohtCheckEndDatetime[2]).padStart(2, "0")}
                  </TD>
                  <TD>
                    {" "}
                    {String(item.ohtCheckEndDatetime[3]).padStart(2, "0")}:
                    {String(item.ohtCheckEndDatetime[4]).padStart(2, "0")}:
                    {item.ohtCheckEndDatetime.length === 5
                      ? "00"
                      : String(item.ohtCheckEndDatetime[5]).padStart(2, "0")}
                  </TD>
                  <TD>{item.ohtSn}</TD>
                  <TD>
                    {item.flCount + item.frCount + item.rlCount + item.rrCount === 0
                      ? "정상"
                      : "NG"}
                  </TD>
                  <TD>{item.flCount ? item.flCount : "-"}</TD>
                  <TD>{item.frCount ? item.frCount : "-"}</TD>
                  <TD>{item.rlCount ? item.rlCount : "-"}</TD>
                  <TD>{item.rrCount ? item.rrCount : "-"}</TD>
                  <TD>
                    <Button
                      width="50%"
                      onClick={event => {
                        event.preventDefault();
                        dispatch(setCheckId(item.ohtCheckId));
                        dispatch(setInquire(true));
                        f(item.ohtCheckId);
                      }}
                    >
                      상세보기
                    </Button>
                  </TD>
                </TR>
              );
            }
          })}
        </TBody>
      ) : (
        <TBody>
          {dashboardData.map((item, idx) => {
            if (item.ohtCheckEndDatetime) {
              if (item.flCount + item.frCount + item.rlCount + item.rrCount !== 0) {
                return (
                  <TR key={idx} NG={item.flCount + item.frCount + item.rlCount + item.rrCount}>
                    <TD>
                      {item.ohtCheckEndDatetime[0]}-
                      {String(item.ohtCheckEndDatetime[1]).padStart(2, "0")}-
                      {String(item.ohtCheckEndDatetime[2]).padStart(2, "0")}
                    </TD>
                    <TD>
                      {" "}
                      {String(item.ohtCheckEndDatetime[3]).padStart(2, "0")}:
                      {String(item.ohtCheckEndDatetime[4]).padStart(2, "0")}:
                      {item.ohtCheckEndDatetime.length === 5
                        ? "00"
                        : String(item.ohtCheckEndDatetime[5]).padStart(2, "0")}
                    </TD>
                    <TD>{item.ohtSn}</TD>
                    <TD>
                      {item.flCount + item.frCount + item.rlCount + item.rrCount === 0
                        ? "정상"
                        : "NG"}
                    </TD>
                    <TD>{item.flCount ? item.flCount : "-"}</TD>
                    <TD>{item.frCount ? item.frCount : "-"}</TD>
                    <TD>{item.rlCount ? item.rlCount : "-"}</TD>
                    <TD>{item.rrCount ? item.rrCount : "-"}</TD>
                    <TD>
                      <Button
                        width="50%"
                        onClick={event => {
                          event.preventDefault();
                          dispatch(setCheckId(item.ohtCheckId));
                          dispatch(setInquire(true));
                          f(item.ohtCheckId);
                        }}
                      >
                        상세보기
                      </Button>
                    </TD>
                  </TR>
                );
              }
              return null;
            }
          })}
        </TBody>
      )}
    </Table>
  );
}

export default OHTResultMenu;
