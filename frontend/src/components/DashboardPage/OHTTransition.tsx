import DashboardTitle from "./DashboardTitle";
import styled from "styled-components";

const OHTTransitionContainer = styled.section`
  display: flex;
  flex-direction: column;
  grid-row: 2/3;
  grid-column: 2/3;
  padding: 10px;
`;

const OHTTransitionSec = styled.div`
  flex: 1;
  background-color: var(--section-color);
  height: 90%;
`;

function OHTTransition() {
  return (
    <OHTTransitionContainer>
      <DashboardTitle title="전이 학습 데이터 수집 현황" />
      <OHTTransitionSec>안녕</OHTTransitionSec>
    </OHTTransitionContainer>
  );
}

export default OHTTransition;
