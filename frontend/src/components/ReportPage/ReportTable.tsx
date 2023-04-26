import React from 'react';
import {Table, TableContainer, TBody, TD, TFoot, TH, THead, TR} from "../TableComponents";
import { ReportTableProps } from "../../_utils/Types";
import { Button } from "../ButtonComponents";

function ReportTable({ handleModalOpen }: ReportTableProps) {
  return (
    <TableContainer>
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
            <TD><Button width="65px" height="23px" onClick={() => handleModalOpen({
              boltGoodCount: 11,
              wheelStatus: '정상',
              wheelCheckDate: "2023-04-20",
              wheelCheckTime: "13:04:45",
              wheelCheckId: "V30001-FL-1681704285",
              wheelPosition: "FL",
              ohtSn: "V30001"})}>상세보기</Button></TD>
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
            <TD colSpan={2}>보기 1-20 / <span style={{color: "var(--emphasize-color)", fontWeight: "bold"}}>52</span></TD>
          </TR>
        </TFoot>
      </Table>
      <div>페이지네이션 자리</div>
    </TableContainer>
  );
}

export default ReportTable;