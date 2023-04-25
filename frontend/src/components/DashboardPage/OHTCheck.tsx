import { ReactComponent as Check } from "../../assets/Check.svg";
import { ReactComponent as NotCheck } from "../../assets/NotCheck.svg";
import Title from "../Title";
import styled from "styled-components";

type OHTCheckGaugeType = {
  isSuccessed: boolean;
  wheel: string;
};

type OHTCheckPercentBarType = {
  checkBar: boolean[];
};

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

const OHTCheckGauge = styled.div<OHTCheckGaugeType>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const OHTCheckBar = styled.div`
  width: 100%;
  background-color: var(--background-color);
  position: absolute;
  height: 7px;
  top: 31%;
  z-index: 1;
`;

const OHTCheckPercentBar = styled.div<OHTCheckPercentBarType>`
  width: ${props =>
    props.checkBar[3]
      ? "100%"
      : props.checkBar[2]
      ? "60%"
      : props.checkBar[1]
      ? "40%"
      : props.checkBar[0]
      ? "20%"
      : "0%"};
  background-color: var(--emphasize-color);
  height: 100%;
  top: 29%;
  z-index: 3;
`;

function OHTCheck() {
  const checkBar: boolean[] = [true, true, true, false];

  const OHTCheckGaugeFtn = ({ isSuccessed, wheel }: OHTCheckGaugeType) => {
    return (
      <OHTCheckGauge isSuccessed={isSuccessed} wheel={wheel}>
        {isSuccessed ? <Check /> : <NotCheck fill="var(--background-color)" />}
        <p>{wheel}</p>
      </OHTCheckGauge>
    );
  };

  return (
    <OHTCheckSec>
      <Title title="현재 검사 OHT" />
      <OHTCheckContainer>
        <OHTCheckTitle>
          <OHTCheckContent style={{ color: "var(--emphasize-color)", marginRight: "5px" }}>
            호기 ID
          </OHTCheckContent>
          <OHTCheckContent>V30001-FL-1681704285</OHTCheckContent>
        </OHTCheckTitle>
        <OHTCheckGaugeDiv>
          <OHTCheckBar>
            <OHTCheckPercentBar checkBar={checkBar}></OHTCheckPercentBar>
          </OHTCheckBar>
          <OHTCheckGaugeFtn isSuccessed={checkBar[0]} wheel="FL" />
          <OHTCheckGaugeFtn isSuccessed={checkBar[1]} wheel="FF" />
          <OHTCheckGaugeFtn isSuccessed={checkBar[2]} wheel="RL" />
          <OHTCheckGaugeFtn isSuccessed={checkBar[3]} wheel="RR" />
        </OHTCheckGaugeDiv>
      </OHTCheckContainer>
    </OHTCheckSec>
  );
}

export default OHTCheck;
