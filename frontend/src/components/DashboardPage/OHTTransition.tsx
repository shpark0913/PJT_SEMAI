import { ChartDark, ChartLight } from "./DashboardChart";

import Title from "../Title";
import styled from "styled-components";

const OHTTransitionContainer = styled.section`
  display: flex;
  flex-direction: column;
  grid-row: 2/3;
  grid-column: 2/3;
  padding: 10px;
`;

const OHTTransitionSec = styled.div`
  flex: 0.7;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: var(--section-color);
  height: 100%;
`;

const TransitionSortDiv = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: var(--section-color);
`;

function OHTTransition() {
  const theme: string | null = document.documentElement.getAttribute("data-theme");
  let chart;

  if (theme === "light") {
    chart = (
      <OHTTransitionSec>
        <ChartLight name="양호" myScore={94} order="1" />
        <ChartLight name="유실" myScore={28} order="2" />
        <ChartLight name="모호" myScore={78} order="3" />
      </OHTTransitionSec>
    );
  } else {
    chart = (
      <OHTTransitionSec>
        <ChartDark name="양호" myScore={94} order="1" />
        <ChartDark name="유실" myScore={28} order="2" />
        <ChartDark name="모호" myScore={78} order="3" />
      </OHTTransitionSec>
    );
  }

  return (
    <OHTTransitionContainer>
      <Title title="전이 학습 데이터 수집 현황" />
      {chart}
      <TransitionSortDiv>
        <h4>양호</h4>
        <h4>유실</h4>
        <h4>모호</h4>
      </TransitionSortDiv>
    </OHTTransitionContainer>
  );
}

export default OHTTransition;
