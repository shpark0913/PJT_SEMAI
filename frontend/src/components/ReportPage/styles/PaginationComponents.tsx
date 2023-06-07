import styled, {css} from "styled-components";

export const PaginationFieldset = styled.fieldset`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0;
`
export const PaginationLabel=styled.label< {checked?: boolean}>`
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