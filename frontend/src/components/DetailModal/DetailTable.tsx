import React from 'react';
import {DetailInfoType} from "../../_utils/Types";
import {Table, TBody, TD, TH, TR} from "../TableComponents";

function DetailTable({detailInfo}: {detailInfo: DetailInfoType}) {
  return (
    <Table className="detail">
      <TBody>
        <TR>
          <TH>검사 ID</TH>
          <TD>{ detailInfo.wheelCheckId }</TD>
        </TR>
        <TR>
          <TH>일자</TH>
          <TD>{ detailInfo.wheelCheckDate }</TD>
        </TR>
        <TR>
          <TH>시간</TH>
          <TD>{ detailInfo.wheelCheckTime }</TD>
        </TR>
        <TR>
          <TH>호기</TH>
          <TD>{ detailInfo.ohtSn }</TD>
        </TR>
        <TR>
          <TH>휠 위치</TH>
          <TD>{ detailInfo.wheelPosition }</TD>
        </TR>
        <TR>
          <TH>판정 결과</TH>
          <TD>{ detailInfo.wheelStatus }</TD>
        </TR>
        <TR>
          <TH>기준값</TH>
          <TD>11</TD>
        </TR>
        <TR>
          <TH>결과값</TH>
          <TD>{ detailInfo.boltGoodCount }</TD>
        </TR>
        <TR>
          <TH>Raw Image</TH>
          <TD></TD>
        </TR>
        <TR>
          <TH>Marked Image</TH>
          <TD></TD>
        </TR>
      </TBody>
    </Table>
  );
}

export default DetailTable;