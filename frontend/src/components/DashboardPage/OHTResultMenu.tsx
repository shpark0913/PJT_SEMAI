import { TBody, TD, TH, THeadMain, TR, Table } from "../../components/TableComponents";

import { useState } from "react";

function OHTResultMenu() {
  const [dashboardData, setDashboardData] = useState([]);

  async function fetchData() {
    const response = await fetch("http://70.12.247.236:8889/dev/dashboard", {
      headers: {
        accesstoken:
          "eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjgyNDgxODQ0NjkxLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODM3Nzc4NDQsInN1YiI6ImFjY2Vzcy10b2tlbiIsInJvbGUiOiJBRE1JTiJ9.DsMQURAqUMNNA-aU7SoSLFL19FEtQkutnp5b3HsMX0k",
      },
    });
    console.log("response : ", response);
    const data = await response.json();
    setDashboardData(data);
  }
  fetchData();
  console.log(dashboardData);

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
