import Title from "../Title";
import styled from "styled-components";

type WheelNameType = {
  wheelName: string;
};

type OHTResultDivType = {
  ratio: number;
};

const OHTResultSec = styled.section`
  display: flex;
  flex-direction: column;
  grid-row: 1/3;
  grid-column: 1/2;
  padding: 10px;
`;

// 화면 공통
const OHTResultContainer = styled.div`
  background-color: var(--section-color);
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  height: 100%;
`;

const OHTResultDiv = styled.div<OHTResultDivType>`
  width: ${props => props.ratio}%;
  display: flex;
  flex-direction: column;
`;

// 화면 좌측 구성
const OHTInfoGrid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 12% 12% 12% auto;
  grid-template-columns: 30% auto;
  row-gap: 2%;
  column-gap: 1%;
`;

const InfoTitleDiv = styled.div`
  color: var(--emphasize-color);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
`;

const InfoContentDiv = styled.div`
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VoltInfoGrid = styled.div`
  display: grid;
  padding: 10px;
  width: 100%;
  height: 100%;
  grid-template-rows: 20% 20% 20% 20% auto;
  grid-template-columns: 25% 25% 25% auto;
  row-gap: 1%;
  column-gap: 1%;
`;

// 화면 우측 구성
const OHTWheelsDiv = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 48% 48%;
  grid-template-columns: 48% 48%;
  gap: 4%;
`;
const WheelDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-image: url(https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20200420_40%2F1587370627039aLqHU_JPEG%2FETC1868%25283%2529.jpg&type=a340);
`;
const OHTWheel = ({ wheelName }: WheelNameType) => {
  return (
    <WheelDiv>
      <h4>{wheelName}</h4>
    </WheelDiv>
  );
};

function OHTResult() {
  return (
    <OHTResultSec>
      <Title title="OHT 휠 검사 결과" />
      <OHTResultContainer>
        <OHTResultDiv ratio={57}>
          <h3 style={{ color: "var(--emphasize-color)" }}>검사 정보</h3>
          <OHTInfoGrid>
            <InfoTitleDiv>검사 호기</InfoTitleDiv>
            <InfoContentDiv>V30001</InfoContentDiv>
            <InfoTitleDiv>검사 일시</InfoTitleDiv>
            <InfoContentDiv>23-04-17 13:04:45</InfoContentDiv>
            <InfoTitleDiv>최종 교체</InfoTitleDiv>
            <InfoContentDiv>230211 13:00:02</InfoContentDiv>
            <InfoTitleDiv>볼트 현황</InfoTitleDiv>
            <InfoContentDiv>
              <VoltInfoGrid>
                <InfoTitleDiv></InfoTitleDiv>
                <InfoTitleDiv>유실</InfoTitleDiv>
                <InfoTitleDiv>모호</InfoTitleDiv>
                <InfoTitleDiv>양호</InfoTitleDiv>
                <InfoTitleDiv>FL</InfoTitleDiv>
                <InfoContentDiv>-</InfoContentDiv>
                <InfoContentDiv>-</InfoContentDiv>
                <InfoContentDiv>-</InfoContentDiv>
                <InfoTitleDiv>FR</InfoTitleDiv>
                <InfoContentDiv>-</InfoContentDiv>
                <InfoContentDiv>-</InfoContentDiv>
                <InfoContentDiv>-</InfoContentDiv>
                <InfoTitleDiv>RL</InfoTitleDiv>
                <InfoContentDiv>-</InfoContentDiv>
                <InfoContentDiv>-</InfoContentDiv>
                <InfoContentDiv>-</InfoContentDiv>
                <InfoTitleDiv>RR</InfoTitleDiv>
                <InfoContentDiv>-</InfoContentDiv>
                <InfoContentDiv>-</InfoContentDiv>
                <InfoContentDiv>-</InfoContentDiv>
              </VoltInfoGrid>
            </InfoContentDiv>
          </OHTInfoGrid>
        </OHTResultDiv>
        <OHTResultDiv ratio={40}>
          <h3 style={{ color: "var(--emphasize-color)" }}>휠 상세 이미지</h3>
          <OHTWheelsDiv>
            <OHTWheel wheelName="FL" />
            <OHTWheel wheelName="FR" />
            <OHTWheel wheelName="RL" />
            <OHTWheel wheelName="RR" />
          </OHTWheelsDiv>
        </OHTResultDiv>
      </OHTResultContainer>
    </OHTResultSec>
  );
}

export default OHTResult;
