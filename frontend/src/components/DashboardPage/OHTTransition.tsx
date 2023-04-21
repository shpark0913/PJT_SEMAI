import { ChartDark, ChartLight } from "./DashboardChart";

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
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: var(--section-color);
  height: 90%;
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
      <DashboardTitle title="전이 학습 데이터 수집 현황" />
      {chart}
    </OHTTransitionContainer>
  );
}

export default OHTTransition;
