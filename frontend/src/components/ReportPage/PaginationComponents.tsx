import React from 'react';
import styled from "styled-components";

const PaginationLabel=styled.label< {checked: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  
  color: ${props => props.checked? "var(--emphasize-color)" : "inherit"};
  font-weight: ${props => props.checked? "bold" : "inherit"};
  background-color: ${props => props.checked? "rgba(128, 128, 128, 0.3)" : "inherit"};
  
  &:hover {
    background-color: rgba(128, 128, 128, 0.3);
    cursor: pointer;
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

  console.log(page)
  const paginationButtons = [];
  for (let i:number =1; i<=paginationTotalPage; i++) {
    paginationButtons.push(
      <PaginationLabel checked={page === String(i)}>{ i }
        <input type="radio" name="page" value={String(i)} onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleClickPage(e)} checked={page === String(i)}/>
      </PaginationLabel>
    )
  }

  return (
    <>
      { paginationButtons.map(button => button) }
    </>
  );
}

export default PaginationComponents;