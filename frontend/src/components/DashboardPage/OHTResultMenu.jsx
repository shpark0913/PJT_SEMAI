import { TBody, TD, TH, THeadMain, TR, Table } from "../TableComponents";
import { useEffect, useState } from "react";

import { EventSourcePolyfill } from "event-source-polyfill";
import { store } from "../../_store/store";

function OHTResultMenu(props) {
  const [dashboardData, setDashboardData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

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
          <TH>날짜</TH>
          <TH>시간</TH>
          <TH>호기 ID</TH>
          <TH>판정 결과</TH>
          <TH>&nbsp; FL &nbsp;</TH>
          <TH>&nbsp; FR &nbsp;</TH>
          <TH>&nbsp; RL &nbsp;</TH>
          <TH>&nbsp; RR &nbsp;</TH>
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
