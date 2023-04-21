import DashboardTitle from "./DashboardTitle";
import styled from "styled-components";

const OHTResultContainer = styled.section`
  display: flex;
  flex-direction: column;
  grid-row: 1/3;
  grid-column: 1/2;
  padding: 10px;
`;

const OHTResultSec = styled.div`
  background-color: var(--section-color);
  flex: 1;
`;

function OHTResult() {
  return (
    <OHTResultContainer>
      <DashboardTitle title="OHT 휠 검사 결과" />
      <OHTResultSec>안녕</OHTResultSec>
    </OHTResultContainer>
  );
}

export default OHTResult;
