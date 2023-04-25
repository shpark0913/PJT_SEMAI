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
    padding: 5px;
  }
  
  // 셀렉트 CSS
  & > select {
    appearance:none;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20">
  <path fill="${encodeURIComponent('#fff')}" 
  d="m7 10 5 5 5-5z"/>
</svg>') calc(100% - 5px) calc(100% - 7px) no-repeat;
    
    & > option {
      background-color: var(--background-color);
    }
  }
  
  // calendar CSS
  & > input[type="date"]::-webkit-calendar-picker-indicator {
    //color: rgba(0, 0, 0, 0);
    //opacity: 1;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 25 25">
  <path fill="${encodeURIComponent('#fff')}" 
  d="M22 3h-3V1h-2v2H7V1H5v2H2v20h20V3zm-2 18H4V8h16v13z" />
</svg>') left center no-repeat;
    //border-width: thin;
  }
`

export { Label }