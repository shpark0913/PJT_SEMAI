import DashboardTitle from "./DashboardTitle";
import styled from "styled-components";

const OHTCheckContainer = styled.section`
  display: flex;
  flex-direction: column;
  grid-row: 1/2;
  grid-column: 2/3;
  padding: 10px;
`;

const OHTCheckSec = styled.div`
  flex: 1;
  background-color: var(--section-color);
  height: 90%;
`;

function OHTCheck() {
  return (
    <OHTCheckContainer>
      <DashboardTitle title="현재 검사 OHT" />
      <OHTCheckSec>안녕</OHTCheckSec>
    </OHTCheckContainer>
  );
}

export default OHTCheck;
