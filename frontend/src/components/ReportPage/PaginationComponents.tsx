import React from 'react';
import styled, {css} from "styled-components";
import {useAppSelector} from "../../_hooks/hooks";

const PaginationFieldset = styled.fieldset`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0;
`

const PaginationLabel=styled.label< {checked?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 5px;
  
  color: ${props => props.checked? "var(--background-color)" : "inherit"};
  font-weight: ${props => props.checked? "bold" : "inherit"};
  background-color: ${props => props.checked? "var(--emphasize-color)" : "inherit"};
  
  transition: background-color 200ms ease-in;
  
  ${ props => !props.checked && css`
    &:hover {
      background-color: var(--shadow-color);
      cursor: pointer;
    }`
  }
  
  & > input {
    vertical-align: middle;
    appearance: none;
    width: 0;
    height: 0;
    margin: 0;
    flex-shrink: 1;
    background-color: transparent;
  }
`

function PaginationComponents({paginationTotalPage, handleSubmit}: {paginationTotalPage: number, handleSubmit: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  const { queryObj } = useAppSelector(state => state.reportPage);
  let { page } = queryObj;
  const paginationButtons = [];
  for (let i:number =1; i<=paginationTotalPage; i++) {
    paginationButtons.push(
      <PaginationLabel key={`pagination-${i}`}  checked={ page === String(i)}> { i }
        <input
          type="radio"
          name="page"
          value={String(i)}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleSubmit(e)}
          // onClick={(e:React.MouseEvent<HTMLInputElement>) => alert(`${e.target}, ${e.currentTarget.name}`)}
          checked={ page === String(i)}
        />
      </PaginationLabel>
    )
  }

  /*
   * page를 -1해서 0~9, 10~19, 20~29... 이렇게 끊어보자
   * page를 10으로 나누었을 때 몫을 보자(Math.floor)
   */
  let nowPageDivTen = Math.floor((parseInt(page)-1) / 10);     // 현재 위치 기준으로 10개
  let lastPageDivTen = Math.floor((paginationTotalPage - 1) / 10);   // 마지막 기준 10개

  const LeftArrow =
    <PaginationLabel key={`pagination-left_arrow`}>{`<`}
      <input type="radio" name="page" value={ (nowPageDivTen - 1) * 10 + 1 } onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleSubmit(e)}/>
    </PaginationLabel>
  const ToFirstArrow =
    <PaginationLabel key={`pagination-first_arrow`}>{`<<`}
      <input type="radio" name="page" value={ 1 } onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleSubmit(e)}/>
    </PaginationLabel>

  const RightArrow =
    <PaginationLabel key={`pagination-right_arrow`}>{`>`}
      <input type="radio" name="page" value={ ( nowPageDivTen + 1 ) * 10 + 1 } onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleSubmit(e)}/>
    </PaginationLabel>
  const ToLastArrow =
    <PaginationLabel key={`pagination-last_arrow`}>{`>>`}
      <input type="radio" name="page" value={ paginationTotalPage } onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleSubmit(e)}/>
    </PaginationLabel>

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

export default PaginationComponents;