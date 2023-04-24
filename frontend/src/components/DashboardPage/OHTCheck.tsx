import { ReactComponent as Check } from "../../assets/Check.svg";
import DashboardTitle from "./DashboardTitle";
import { ReactComponent as NotCheck } from "../../assets/NotCheck.svg";
import styled from "styled-components";

const OHTCheckSec = styled.section`
  display: flex;
  flex-direction: column;
  grid-row: 1/2;
  grid-column: 2/3;
  padding: 10px;
`;

const OHTCheckContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: var(--section-color);
`;

const OHTCheckTitle = styled.div`
  display: flex;
  flex: 0.4;
  align-items: center;
  justify-content: center;
`;

const OHTCheckContent = styled.div`
  display: flex;
  background-color: var(--background-color);
  margin: 0;
  padding: 10px 25px;
`;

const OHTCheckGaugeDiv = styled.div`
  flex: 0.6;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  position: relative;
`;

const OHTCheckGauge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const OHTCheckBar = styled.div`
  width: 100%;
  background-color: var(--emphasize-color);
  position: absolute;
  height: 7px;
  top: 29%;
  z-index: 1;
`;

function OHTCheck() {
  const checkBar: boolean[] = [true, true, false, false];
  console.log(checkBar);
  console.log("3번째 : ", checkBar[3]);
  // switch (checkBar) {
  //   case checkBar[3] === true:
  //     console.log(2)
  //     break
  // }

  return (
    <OHTCheckSec>
      <DashboardTitle title="현재 검사 OHT" />
      <OHTCheckContainer>
        <OHTCheckTitle>
          <OHTCheckContent style={{ color: "var(--emphasize-color)", marginRight: "5px" }}>
            호기 ID
          </OHTCheckContent>
          <OHTCheckContent>V30001-FL-1681704285</OHTCheckContent>
        </OHTCheckTitle>
        <OHTCheckGaugeDiv>
          <OHTCheckBar>&nbsp;</OHTCheckBar>

          <OHTCheckGauge>
            <Check />
            <p>FL</p>
          </OHTCheckGauge>

          <OHTCheckGauge>
            <Check />
            <p>FF</p>
          </OHTCheckGauge>

          <OHTCheckGauge>
            <Check />
            <p>RL</p>
          </OHTCheckGauge>

          <OHTCheckGauge>
            <NotCheck />
            <p>RR</p>
          </OHTCheckGauge>
        </OHTCheckGaugeDiv>
      </OHTCheckContainer>
    </OHTCheckSec>
  );
}

export default OHTCheck;
