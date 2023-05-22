import React, { useMemo } from "react";

import {useAppSelector} from "../../_hooks/hooks";
import useSubmitForm from "../../_hooks/useSubmitForm";

import {PaginationFieldset, PaginationLabel} from "./styles/PaginationComponents";

function Pagination({paginationTotalPage}: {paginationTotalPage: number}) {
  const { page } = useAppSelector(state => state.reportPage.queryObj);
  const { submitForm } = useSubmitForm();

  /** [1, 2, 3, ... , 19] 이런 식의 페이지 이동 버튼 생성 */
  const paginationButtons = useMemo(() => {
    const tmp = [];
    for (let i: number = 1; i <= paginationTotalPage; i++) {
      tmp.push(
        <PaginationLabel key={`pagination-${i}`} checked={page === String(i)}> {i}
          <input
            type="radio"
            name="page"
            value={String(i)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => submitForm(e)}
            checked={page === String(i)}
          />
        </PaginationLabel>,
      );
    }
    return tmp;
  }, [paginationTotalPage, page])

  /*
   * page를 -1해서 0~9, 10~19, 20~29... 이렇게 끊어보자
   * page를 10으로 나누었을 때 몫을 보자(Math.floor)
   */
  let nowPageDivTen = useMemo(() => Math.floor((parseInt(page)-1) / 10), [page]);     // 현재 위치 기준으로 10개
  let lastPageDivTen = useMemo(() => Math.floor((paginationTotalPage - 1) / 10), [paginationTotalPage]);   // 마지막 기준 10개

  // 이전 10개 단위 페이지로 넘어가는 버튼
  const LeftArrow = useMemo(() =>
      <PaginationLabel key={`pagination-left_arrow`}>{`<`}
        <input type="radio" name="page" value={ (nowPageDivTen - 1) * 10 + 1 } onChange={(e:React.ChangeEvent<HTMLInputElement>) => submitForm(e)}/>
      </PaginationLabel>, [nowPageDivTen]);
  // 가장 처음부분 (1-10)으로 넘어가는 버튼
  const ToFirstArrow = useMemo(() =>
      <PaginationLabel key={`pagination-first_arrow`}>{`<<`}
        <input type="radio" name="page" value={ 1 } onChange={(e:React.ChangeEvent<HTMLInputElement>) => submitForm(e)}/>
      </PaginationLabel>, [nowPageDivTen])

  // 다음 10개 단위 페이지로 넘어가는 버튼
  const RightArrow = useMemo(()=>
      <PaginationLabel key={`pagination-right_arrow`}>{`>`}
        <input type="radio" name="page" value={ ( nowPageDivTen + 1 ) * 10 + 1 } onChange={(e:React.ChangeEvent<HTMLInputElement>) => submitForm(e)}/>
      </PaginationLabel>, [nowPageDivTen]);
  // 가장 마지막 페이지로 넘어가는 버튼
  const ToLastArrow = useMemo(() =>
      <PaginationLabel key={`pagination-last_arrow`}>{`>>`}
        <input type="radio" name="page" value={ paginationTotalPage } onChange={(e:React.ChangeEvent<HTMLInputElement>) => submitForm(e)}/>
      </PaginationLabel>, [paginationTotalPage])

  return (
    <PaginationFieldset>
      { nowPageDivTen > 0 ? ToFirstArrow : <></> }
      { nowPageDivTen > 0 ? LeftArrow : <></> }
      {
        paginationButtons.filter((button, idx) => {
          return Math.floor(idx / 10) === nowPageDivTen
        })
      }
      { nowPageDivTen < lastPageDivTen ? RightArrow : <></> }
      { nowPageDivTen < lastPageDivTen ? ToLastArrow : <></> }
    </PaginationFieldset>
  );
}

export default Pagination;