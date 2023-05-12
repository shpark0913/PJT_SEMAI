import React from 'react';
import styled, {css} from "styled-components";

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

function PaginationComponents({paginationTotalPage, handleClickPage, page}: {paginationTotalPage: number, handleClickPage: (e: React.ChangeEvent<HTMLInputElement>) => void, page: string}) {
  const paginationButtons = [];
  for (let i:number =1; i<=paginationTotalPage; i++) {
    paginationButtons.push(
      <PaginationLabel key={`pagination-${i}`}  checked={page === String(i)}> { i }
        <input type="radio" name="page" value={String(i)} onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleClickPage(e)} checked={page === String(i)}/>
      </PaginationLabel>
    )
  }

  console.log(paginationButtons)

  /*
   * page를 -1해서 0~9, 10~19, 20~29... 이렇게 끊어보자
   * page를 10으로 나누었을 때 몫을 보자(Math.floor)
   *
   */
  let nowPageDivTen = Math.floor((parseInt(page)-1) / 10);
  let lastPageDivTen = Math.floor(paginationTotalPage / 10);

  const LeftArrow =
    <PaginationLabel key={`pagination-left_Arrow`}>{`<`}
      <input type="radio" name="page" value={ (nowPageDivTen - 1) * 10 + 1 } onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleClickPage(e)}/>
    </PaginationLabel>

  const RightArrow =
    <PaginationLabel key={`pagination-right_Arrow`}>{`>`}
      <input type="radio" name="page" value={ ( nowPageDivTen + 1 ) * 10 + 1 } onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleClickPage(e)}/>
    </PaginationLabel>

  console.log(nowPageDivTen)
  return (
    <PaginationFieldset>
      { nowPageDivTen > 0 ? LeftArrow : <></> }
      {
        paginationButtons.filter((button, idx) => {
          console.log(`결과 : ${Math.floor(idx / 10) === nowPageDivTen}, 인덱스 : ${idx}, 키값 : ${button.key}`)
          return Math.floor(idx / 10) === nowPageDivTen
        })
      }
      { nowPageDivTen < lastPageDivTen ? RightArrow : <></> }
    </PaginationFieldset>
  );
}

export default PaginationComponents;