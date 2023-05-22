import styled from "styled-components";
import { SemesButton } from "../../ButtonComponents";
import {LabelProps} from "../../../_utils/Types";

export const FormTop = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
`;
export const FormInput = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, auto));
  gap: 10px 20px;

  & div {
    grid-column: span 2;
    width: calc(2 * 220px + 20px);
  }

  & > button:last-child {
    justify-self: end;
  }
`;
export const PeriodButton = styled(SemesButton)`
  width: 120px;
  height: 26px;
  margin-right: 20px;
`
export const Label = styled.label<LabelProps>`
  color: var(--emphasize-color);
  height: 26px;
  
  display: flex;
  align-items: center;
  
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
                  <path 
                    fill="${props => props.theme === "dark" ? encodeURIComponent('#A3D1FF') : encodeURIComponent('#0052A4')}" 
                    d="m7 10 5 5 5-5z"/>
                  </svg>') calc(100% - 5px) calc(100% - 4px) no-repeat;
    & > option {
      background-color: var(--background-color);
    }
  }
  
  // calendar CSS
  & > input[type="date"]::-webkit-calendar-picker-indicator {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 25 25">
                  <path 
                    fill="${props => props.theme === "dark" ? encodeURIComponent('#A3D1FF') : encodeURIComponent('#0052A4')}" 
                    d="M22 3h-3V1h-2v2H7V1H5v2H2v20h20V3zm-2 18H4V8h16v13z"/>
                  </svg>') left center no-repeat;
  }
  & > input[type="checkbox"] {
    width: auto;
  }
`