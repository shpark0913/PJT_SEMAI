import styled from "styled-components";
import { SemesButton } from "../../ButtonComponents";

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