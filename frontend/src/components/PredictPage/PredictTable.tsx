import { Button, SemesButton } from "../ButtonComponents";
import { TBody, TD, TFoot, TH, THead, TR, Table, TableContainer } from "../TableComponents";

import React from "react";

function PredictTable() {
  let data = [
    { wheelSn: "V30001", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30002", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30003", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30004", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30005", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30006", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30007", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30008", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30009", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30010", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30011", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30012", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30013", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30014", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30015", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30016", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30017", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30018", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30019", loose: 2, lost: 3, broken: 1, normal: 5 },
    { wheelSn: "V30020", loose: 2, lost: 3, broken: 1, normal: 5 },
  ];
  return (
    <TableContainer style={{ flexGrow: "1" }}>
      <Table>
        <THead>
          <TR>
            <TH></TH>
            <TH>휠 ID</TH>
            <TH>정상</TH>
            <TH>유실</TH>
            <TH>파손</TH>
            <TH>풀림</TH>
            {/* <TH>최근 검사 상세</TH> */}
          </TR>
        </THead>
        <TBody className="report-table">
          {data.map((item, idx) => (
            <TR key={idx}>
              <TH className="idxNum">{idx + 1}</TH>
              <TD>{item.wheelSn}</TD>
              <TD>{item.normal}</TD>
              <TD>{item.lost}</TD>
              <TD>{item.broken}</TD>
              <TD>{item.loose}</TD>
              {/* <TD>
                <Button>상세 보기</Button>
              </TD> */}
            </TR>
          ))}
        </TBody>
        <TFoot>
          <TR>
            <TD colSpan={5} />
            <TD colSpan={1}>보기</TD>
          </TR>
        </TFoot>
      </Table>
    </TableContainer>
  );
}

export default PredictTable;
