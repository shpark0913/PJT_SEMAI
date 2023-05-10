import React from 'react';
import {ReportObjectType} from "../../_utils/Types";
import {Table, TBody, TD, TH, TR} from "../TableComponents";
import useDate from "../../_hooks/useDate";

function DetailTable({detailInfo}: {detailInfo: ReportObjectType}) {
  let { wheelReportId, dateFormat, timeFormat } = useDate();
  const IMG_URL = process.env.REACT_APP_IMG_URL
  return (
    <Table className="detail">
      <TBody>
        <TR>
          <TH>검사 ID</TH>
          <TD>{`${detailInfo.ohtSn}-${detailInfo.wheelPosition}-${wheelReportId(detailInfo.wheelCheckDate)}`}</TD>
        </TR>
        <TR>
          <TH>일자</TH>
          <TD>{`${dateFormat(detailInfo.wheelCheckDate.slice(0, 3))}`}</TD>
        </TR>
        <TR>
          <TH>시간</TH>
          <TD>{`${timeFormat(detailInfo.wheelCheckDate.slice(3, 6))}`}</TD>
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
          <TD>{ detailInfo.boltGoodCount === 11 ? '정상' : 'NG' }</TD>
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
          <TD><img width="100%" src={`${IMG_URL}${detailInfo.originUrl}`} alt=""/></TD>
        </TR>
        <TR>
          <TH>Marked Image</TH>
          <TD><img width="100%" src={`${IMG_URL}${detailInfo.markingUrl}`} alt=""/></TD>
        </TR>
      </TBody>
    </Table>
  );
}

export default DetailTable;