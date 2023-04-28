import { TBody, TD, TH, THeadMain, TR, Table } from "../TableComponents";
import { useEffect, useState } from "react";

import { EventSourcePolyfill } from "event-source-polyfill";
import axios from "axios";

function OHTResultMenu() {
  const [dashboardData, setDashboardData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    const sse = new EventSourcePolyfill(`${BASE_URL}dashboard`, {
      headers: {
        accesstoken: localStorage.getItem("token"),
      },
    });

    sse.addEventListener("dashboard", event => {
      setDashboardData(JSON.parse(event.data));
    });
  }, []);

  console.log("데이터", dashboardData);

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
      <TBody>
        {dashboardData.map(item => {
          let checkResult, data;
          axios
            .get(`${BASE_URL}dashboard/main/${item.ohtCheckId}`, {
              headers: {
                accesstoken: localStorage.getItem("token"),
              },
            })
            .then(response => {
              checkResult = response.data.data;
              console.log("바퀴 1개당 4개의 object 있어야", checkResult);
            });
          return (
            <TR>
              <TD></TD>
              <TD></TD>
              <TD></TD>
              <TD></TD>
              <TD></TD>
              <TD></TD>
              <TD></TD>
              <TD></TD>
            </TR>
          );
        })}
        <TR>
          <TD>2023-04-20</TD>
          <TD>13:04:45</TD>
          <TD>V30001-FL-1681704285</TD>
          <TD>정상</TD>
          <TD>-</TD>
          <TD>-</TD>
          <TD>1</TD>
          <TD>3</TD>
        </TR>
      </TBody>
    </Table>
  );
}

export default OHTResultMenu;
