import DashboardTitle from "./DashboardTitle";
import OHTResultMenuBar from "./OHTResultMenuBar";
import styled from "styled-components";

const OHTAllResultContainer = styled.section`
  display: flex;
  flex-direction: column;
  grid-row: 3/4;
  grid-column: 1/3;
  margin-top: 10px;
`;

const OHTAllResultSec = styled.div`
  flex: 1;
`;

function OHTAllResult() {
  return (
    <OHTAllResultContainer>
      <DashboardTitle title="OHT 휠 검사 현황" />
      <OHTResultMenuBar />
      <OHTAllResultSec>안녕</OHTAllResultSec>
    </OHTAllResultContainer>
  );
}

export default OHTAllResult;
