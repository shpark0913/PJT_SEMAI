import { TBody, TD, TH, THeadMain, TR, Table } from "../TableComponents";
import { useEffect, useState } from "react";

import { Button } from "../ButtonComponents";
import { EventSourcePolyfill } from "event-source-polyfill";
import { setCheckId } from "../../_store/slices/dashboardSlice";
import { store } from "../../_store/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function OHTResultMenu(props) {
  const [dashboardData, setDashboardData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const sse = new EventSourcePolyfill(`${BASE_URL}dashboard`, {
      headers: {
        accesstoken: store.getState().user.token,
      },
    });

    sse.addEventListener("dashboard", event => {
      setDashboardData(JSON.parse(event.data));
    });
  }, []);

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
            return (
              <TR key={idx} NG={item.flCount + item.frCount + item.rlCount + item.rrCount}>
                <TD>
                  {item.ohtCheckStartDatetime[0]}-
                  {String(item.ohtCheckStartDatetime[1]).padStart(2, "0")}-
                  {String(item.ohtCheckStartDatetime[2]).padStart(2, "0")}
                </TD>
                <TD>
                  {" "}
                  {String(item.ohtCheckStartDatetime[3]).padStart(2, "0")}:
                  {String(item.ohtCheckStartDatetime[4]).padStart(2, "0")}:
                  {String(item.ohtCheckStartDatetime[5]).padStart(2, "0")}
                </TD>
                <TD>{item.ohtId}</TD>
                <TD>
                  {item.flCount + item.frCount + item.rlCount + item.rrCount === 0 ? "정상" : "NG"}
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
                      // navigate(`/${item.ohtCheckId}`);
                    }}
                  >
                    상세보기
                  </Button>
                </TD>
              </TR>
            );
          })}
        </TBody>
      ) : (
        <TBody>
          {dashboardData.map((item, idx) => {
            if (item.flCount + item.frCount + item.rlCount + item.rrCount !== 0) {
              return (
                <TR key={idx} NG={item.flCount + item.frCount + item.rlCount + item.rrCount}>
                  <TD>
                    {item.ohtCheckStartDatetime[0]}-
                    {String(item.ohtCheckStartDatetime[1]).padStart(2, "0")}-
                    {String(item.ohtCheckStartDatetime[2]).padStart(2, "0")}
                  </TD>
                  <TD>
                    {" "}
                    {String(item.ohtCheckStartDatetime[3]).padStart(2, "0")}:
                    {String(item.ohtCheckStartDatetime[4]).padStart(2, "0")}:
                    {String(item.ohtCheckStartDatetime[5]).padStart(2, "0")}
                  </TD>
                  <TD>{item.ohtId}</TD>
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
                        // navigate(`/${item.ohtCheckId}`);
                      }}
                    >
                      상세보기
                    </Button>
                  </TD>
                </TR>
              );
            }
            return null;
          })}
        </TBody>
      )}
    </Table>
  );
}

export default OHTResultMenu;
