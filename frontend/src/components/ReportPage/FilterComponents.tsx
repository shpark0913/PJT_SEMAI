import styled from "styled-components";

const Label = styled.label`
  color: var(--emphasize-color);
  margin-right: 25px;
  height: 100%;
  
  // 선택 요소들의 공통사항
  & > * {
    height: 100%;
    width: 130px;
    background-color: transparent;
    color: var(--font-color);
    border-radius: 5px;
    border: 1px solid var(--emphasize-color);
    margin-left: 10px;
    padding: 7px;
  }
  
  // 셀렉트 CSS
  & > select {
    appearance:none;
    
    & > option {
      background-color: var(--background-color);
      padding: 50px;
    }
  }
  
  // calendar CSS
  & > input[type="date"] {

  }
`

export { Label }