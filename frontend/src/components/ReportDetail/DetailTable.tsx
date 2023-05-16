import React from 'react';
import {ReportObjectType} from "../../_utils/Types";
import {Table, TBody, TD, TH, TR} from "../TableComponents";
import useDate from "../../_hooks/useDate";
import ImageUrl from "../../_utils/ImageUrl";

function DetailTable({detailInfo}: {detailInfo: ReportObjectType}) {
  let { wheelReportId, dateFormat, timeFormat } = useDate();

  return (
    <Table className="detail">
      <TBody>
        <TR>
          <TH>검사 ID</TH>
          <TD colSpan={2}>{`${detailInfo.ohtSn}-${detailInfo.wheelPosition}-${wheelReportId(detailInfo.wheelCheckDate.slice(0, 6))}`}</TD>
        </TR>
        <TR>
          <TH>일자</TH>
          <TD colSpan={2}>{`${dateFormat(detailInfo.wheelCheckDate.slice(0, 3))}`}</TD>
        </TR>
        <TR>
          <TH>시간</TH>
          <TD colSpan={2}>{`${timeFormat(detailInfo.wheelCheckDate.slice(3, 6))}`}</TD>
        </TR>
        <TR>
          <TH>호기</TH>
          <TD colSpan={2}>{ detailInfo.ohtSn }</TD>
        </TR>
        <TR>
          <TH>휠 위치</TH>
          <TD colSpan={2}>{ detailInfo.wheelPosition }</TD>
        </TR>
        <TR>
          <TH>판정 결과</TH>
          <TD colSpan={2}>{ detailInfo.boltGoodCount === 11 ? '정상' : 'NG' }</TD>
        </TR>
        <TR>
          <TH>기준값</TH>
          <TD colSpan={2}>11</TD>
        </TR>
        <TR>
          <TH rowSpan={3}>결과값</TH>
          <TH>양호</TH>
          <TD>{ detailInfo.boltGoodCount }</TD>
          {/*<TD>{ detailInfo.boltGoodCount }</TD>*/}
        </TR>
        <TR>
          {/*<TD></TD>*/}
          <TH>유실</TH>
          <TD>{ detailInfo.boltOutCount }</TD>
        </TR>
        <TR>
          {/*<TD></TD>*/}
          <TH>파단</TH>
          <TD>{ detailInfo.boltLoseCount }</TD>
        </TR>
        <TR>
          <TH>Marked Image</TH>
          <TD colSpan={2}><img width="100%" src={ImageUrl(detailInfo.markingUrl)} alt=""/></TD>
        </TR>
        <TR>
          <TH>Raw Image</TH>
          <TD colSpan={2}><img width="100%" src={ImageUrl(detailInfo.originUrl)} alt=""/></TD>
        </TR>
      </TBody>
    </Table>
  );
}

export default DetailTable;