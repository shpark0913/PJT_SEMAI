import Title from "../Title";
import styled from "styled-components";

type WheelNameType = {
  wheelName: string;
};

type OHTResultDivType = {
  ratio: number;
};

type WheelDivType = {
  url: string;
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
const WheelDiv = styled.div<WheelDivType>`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-image: url(${props => props.url});
`;
const OHTWheel = ({ wheelName }: WheelNameType) => {
  return (
    <WheelDiv url="https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20200420_40%2F1587370627039aLqHU_JPEG%2FETC1868%25283%2529.jpg&type=a340">
      <h4>{wheelName}</h4>
    </WheelDiv>
  );
};

function OHTResult(props: any) {
  const data = props.data;
  const indexList = [0, 1, 2, 3];

  return (
    <OHTResultSec>
      <Title title="OHT 휠 검사 결과" />
      <OHTResultContainer>
        <OHTResultDiv ratio={57}>
          <h3 style={{ color: "var(--emphasize-color)" }}>검사 정보</h3>
          <OHTInfoGrid>
            <InfoTitleDiv>검사 호기</InfoTitleDiv>
            <InfoContentDiv>{data[0].oht_sn}</InfoContentDiv>
            <InfoTitleDiv>검사 일시</InfoTitleDiv>
            <InfoContentDiv>
              {data[0].ohtCheckDatetime[0]}-{String(data[0].ohtCheckDatetime[1]).padStart(2, "0")}-
              {String(data[0].ohtCheckDatetime[2]).padStart(2, "0")}{" "}
              {String(data[0].ohtCheckDatetime[3]).padStart(2, "0")}:
              {String(data[0].ohtCheckDatetime[4]).padStart(2, "0")}:
              {String(data[0].ohtCheckDatetime[5]).padStart(2, "0")}
            </InfoContentDiv>
            <InfoTitleDiv>최종 교체</InfoTitleDiv>
            <InfoContentDiv>
              {data[0].ohtChangeDate[0]}-{String(data[0].ohtChangeDate[1]).padStart(2, "0")}-
              {String(data[0].ohtChangeDate[2]).padStart(2, "0")}{" "}
              {String(data[0].ohtChangeDate[3]).padStart(2, "0")}:
              {String(data[0].ohtChangeDate[4]).padStart(2, "0")}:
              {String(data[0].ohtChangeDate[5]).padStart(2, "0")}
            </InfoContentDiv>
            <InfoTitleDiv>볼트 현황</InfoTitleDiv>
            <InfoContentDiv>
              <VoltInfoGrid>
                <InfoTitleDiv></InfoTitleDiv>
                <InfoTitleDiv>유실</InfoTitleDiv>
                <InfoTitleDiv>모호</InfoTitleDiv>
                <InfoTitleDiv>양호</InfoTitleDiv>
                {indexList.map(item => {
                  return (
                    <>
                      <InfoTitleDiv>{data[item].wheelPosition}</InfoTitleDiv>
                      <InfoContentDiv>{data[item].boltLoseCount}</InfoContentDiv>
                      <InfoContentDiv>{data[item].boltLoseCount}</InfoContentDiv>
                      <InfoContentDiv>{data[item].boltGoodCount}</InfoContentDiv>
                    </>
                  );
                })}
              </VoltInfoGrid>
            </InfoContentDiv>
          </OHTInfoGrid>
        </OHTResultDiv>
        <OHTResultDiv ratio={40}>
          <h3 style={{ color: "var(--emphasize-color)" }}>휠 상세 이미지</h3>
          <OHTWheelsDiv>
            {indexList.map(item => {
              return <OHTWheel wheelName={data[item].wheelPosition} />;
            })}
          </OHTWheelsDiv>
        </OHTResultDiv>
      </OHTResultContainer>
    </OHTResultSec>
  );
}

export default OHTResult;
