import React from 'react';
import { Form } from "react-router-dom";
import styled from "styled-components";
import { Table, TBody, TFoot, TH, THead, TD, TR } from "../components/TableComponents";
// import { DatePicker } from "@mui/x-date-pickers";

// import type {} from '@mui/x-date-pickers/themeAugmentation';
// import { createTheme } from "@mui/material";

// const theme = createTheme({
//   components: {
//     MuiDatePicker: {
//       styleOverrides: {
//         root: {
//           backgroundColor: 'var(--emphasize-color)',
//           width: "120px",
//           height: "40px",
//         },
//       },
//     },
//   },
// });

const ReportSection = styled.section`
  //width: 100%;
  //height: 100%;
  padding: 30px;
  
  display: flex;
  flex-direction: column;
`

const TableDiv = styled.div`
  width: 100%;
  min-width: 950px;
  overflow-y: auto;
  flex-grow: 1;
  flex-shrink: 0;
`

function ReportPage() {
  return (
    <ReportSection>
      <h1>레포트</h1>
      <Form>
        <label>
          장비 종류
          <select name="OHT_type">
            <option value="V30001">V30001</option>
            <option value="V30002">V30002</option>
            <option value="V30003">V30003</option>
          </select>
        </label>
        <label>
          검사 일자
          <input type="date" name="date" value="2023-04-24" />
        </label>
        <label>
          검사 시간
          <select name="time">
            <option value="00:00~01:00">00:00~01:00</option>
            <option value="01:00~02:00">01:00~02:00</option>
            <option value="02:00~03:00">02:00~03:00</option>
          </select>
        </label>
        <label>
          검사 휠 위치
          <select name="time">
            <option value="FL">FL</option>
            <option value="FR">FR</option>
            <option value="RL">RL</option>
            <option value="RR">RR</option>
          </select>
        </label>
        {/*<DatePicker value="날짜 선택"  />*/}

        <button type="submit">조회하기</button>
      </Form>
      <TableDiv>
        <Table>
        <THead>
          <TR>
            <TH></TH>
            <TH>검사 ID</TH>
            <TH>일자</TH>
            <TH>시간</TH>
            <TH>호기</TH>
            <TH>검사 휠 위치</TH>
            <TH>검사 결과</TH>
            <TH>기준값</TH>
            <TH>결과값</TH>
            <TH>상세보기</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TH className="idxNum">1</TH>
            <TD>V30001-FL-1681704285</TD>
            <TD>2023-04-20</TD>
            <TD>13:04:45</TD>
            <TD>V30001</TD>
            <TD>FL</TD>
            <TD>정상</TD>
            <TD>11</TD>
            <TD>11</TD>
            <TD><button>상세보기</button></TD>
          </TR>
          <TR>
            <TH className="idxNum">2</TH>
            <TD>V30001-FR-1681704285</TD>
            <TD>2023-04-20</TD>
            <TD>13:04:45</TD>
            <TD>V30001</TD>
            <TD>FR</TD>
            <TD>정상</TD>
            <TD>11</TD>
            <TD>11</TD>
            <TD><button>상세보기</button></TD>
          </TR>
          <TR>
            <TH className="idxNum">3</TH>
            <TD>V30001-RL-1681704285</TD>
            <TD>2023-04-20</TD>
            <TD>13:04:45</TD>
            <TD>V30001</TD>
            <TD>RL</TD>
            <TD>정상</TD>
            <TD>11</TD>
            <TD>11</TD>
            <TD><button>상세보기</button></TD>
          </TR>
          <TR>
            <TH className="idxNum">4</TH>
            <TD>V30001-RR-1681704285</TD>
            <TD>2023-04-20</TD>
            <TD>13:04:45</TD>
            <TD>V30001</TD>
            <TD>RR</TD>
            <TD>정상</TD>
            <TD>11</TD>
            <TD>11</TD>
            <TD><button>상세보기</button></TD>
          </TR>
          <TR>
            <TH className="idxNum">4</TH>
            <TD>V30001-RR-1681704285</TD>
            <TD>2023-04-20</TD>
            <TD>13:04:45</TD>
            <TD>V30001</TD>
            <TD>RR</TD>
            <TD>정상</TD>
            <TD>11</TD>
            <TD>11</TD>
            <TD><button>상세보기</button></TD>
          </TR><TR>
          <TH className="idxNum">4</TH>
          <TD>V30001-RR-1681704285</TD>
          <TD>2023-04-20</TD>
          <TD>13:04:45</TD>
          <TD>V30001</TD>
          <TD>RR</TD>
          <TD>정상</TD>
          <TD>11</TD>
          <TD>11</TD>
          <TD><button>상세보기</button></TD>
        </TR><TR>
          <TH className="idxNum">4</TH>
          <TD>V30001-RR-1681704285</TD>
          <TD>2023-04-20</TD>
          <TD>13:04:45</TD>
          <TD>V30001</TD>
          <TD>RR</TD>
          <TD>정상</TD>
          <TD>11</TD>
          <TD>11</TD>
          <TD><button>상세보기</button></TD>
        </TR><TR>
          <TH className="idxNum">4</TH>
          <TD>V30001-RR-1681704285</TD>
          <TD>2023-04-20</TD>
          <TD>13:04:45</TD>
          <TD>V30001</TD>
          <TD>RR</TD>
          <TD>정상</TD>
          <TD>11</TD>
          <TD>11</TD>
          <TD><button>상세보기</button></TD>
        </TR><TR>
          <TH className="idxNum">4</TH>
          <TD>V30001-RR-1681704285</TD>
          <TD>2023-04-20</TD>
          <TD>13:04:45</TD>
          <TD>V30001</TD>
          <TD>RR</TD>
          <TD>정상</TD>
          <TD>11</TD>
          <TD>11</TD>
          <TD><button>상세보기</button></TD>
        </TR><TR>
          <TH className="idxNum">4</TH>
          <TD>V30001-RR-1681704285</TD>
          <TD>2023-04-20</TD>
          <TD>13:04:45</TD>
          <TD>V30001</TD>
          <TD>RR</TD>
          <TD>정상</TD>
          <TD>11</TD>
          <TD>11</TD>
          <TD><button>상세보기</button></TD>
        </TR><TR>
          <TH className="idxNum">4</TH>
          <TD>V30001-RR-1681704285</TD>
          <TD>2023-04-20</TD>
          <TD>13:04:45</TD>
          <TD>V30001</TD>
          <TD>RR</TD>
          <TD>정상</TD>
          <TD>11</TD>
          <TD>11</TD>
          <TD><button>상세보기</button></TD>
        </TR><TR>
          <TH className="idxNum">4</TH>
          <TD>V30001-RR-1681704285</TD>
          <TD>2023-04-20</TD>
          <TD>13:04:45</TD>
          <TD>V30001</TD>
          <TD>RR</TD>
          <TD>정상</TD>
          <TD>11</TD>
          <TD>11</TD>
          <TD><button>상세보기</button></TD>
        </TR><TR>
          <TH className="idxNum">4</TH>
          <TD>V30001-RR-1681704285</TD>
          <TD>2023-04-20</TD>
          <TD>13:04:45</TD>
          <TD>V30001</TD>
          <TD>RR</TD>
          <TD>정상</TD>
          <TD>11</TD>
          <TD>11</TD>
          <TD><button>상세보기</button></TD>
        </TR><TR>
          <TH className="idxNum">4</TH>
          <TD>V30001-RR-1681704285</TD>
          <TD>2023-04-20</TD>
          <TD>13:04:45</TD>
          <TD>V30001</TD>
          <TD>RR</TD>
          <TD>정상</TD>
          <TD>11</TD>
          <TD>11</TD>
          <TD><button>상세보기</button></TD>
        </TR><TR>
          <TH className="idxNum">4</TH>
          <TD>V30001-RR-1681704285</TD>
          <TD>2023-04-20</TD>
          <TD>13:04:45</TD>
          <TD>V30001</TD>
          <TD>RR</TD>
          <TD>정상</TD>
          <TD>11</TD>
          <TD>11</TD>
          <TD><button>상세보기</button></TD>
        </TR><TR>
          <TH className="idxNum">4</TH>
          <TD>V30001-RR-1681704285</TD>
          <TD>2023-04-20</TD>
          <TD>13:04:45</TD>
          <TD>V30001</TD>
          <TD>RR</TD>
          <TD>정상</TD>
          <TD>11</TD>
          <TD>11</TD>
          <TD><button>상세보기</button></TD>
        </TR><TR>
          <TH className="idxNum">4</TH>
          <TD>V30001-RR-1681704285</TD>
          <TD>2023-04-20</TD>
          <TD>13:04:45</TD>
          <TD>V30001</TD>
          <TD>RR</TD>
          <TD>정상</TD>
          <TD>11</TD>
          <TD>11</TD>
          <TD><button>상세보기</button></TD>
        </TR>
        </TBody>
        <TFoot>
          <TR>
            <TD colSpan={8} />
            <TD colSpan={2}>보기 1-20 / <span>52</span></TD>
          </TR>
        </TFoot>
      </Table>
      <div>페이지네이션 자리</div>
      </TableDiv>
    </ReportSection>
  );
}

export default ReportPage;