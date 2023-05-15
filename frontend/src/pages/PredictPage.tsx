import React from "react";
import ScatterGraph from "../components/PredictPage/ScatterGraph";
import styled from "styled-components";

type PredictTitleType = {
  title: string;
  num: number;
};

const PredictGridContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 60% auto;
`;

// 좌측 표
const TableDiv = styled.div``;

// 우측 그래프
const GraphDiv = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  justify-content: center;
  align-items: center;
`;

// 표와 그래프에서 같이 쓰는 제목
const PredictTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PredictTitle = ({ title, num }: PredictTitleType) => {
  return (
    <PredictTitleDiv>
      <h4 style={{ marginRight: "7px" }}>{title}</h4>
      <p style={{ marginTop: "10px" }}>{num}/400</p>
    </PredictTitleDiv>
  );
};

function PredictPage() {
  // 그래프에 표시할 변수
  const data = [
    // x, y, z 축 범위 설정
    // viewpoint가 0이면 blue(예측 데이터), 1이면 red(누적된 실제 데이터)
    { loose: 0, broken: 0, lost: 0, viewpoint: 0.7 },
    { loose: 400, broken: 400, lost: 400, viewpoint: 0.7 },

    // 아래는 추가적인 데이터
    { loose: 50, broken: 42, lost: 16, viewpoint: 1 },
    { loose: 55, broken: 44, lost: 30, viewpoint: 1 },
    { loose: 52, broken: 56, lost: 22, viewpoint: 1 },
    { loose: 53, broken: 54, lost: 16, viewpoint: 1 },
    { loose: 54, broken: 52, lost: 28, viewpoint: 1 },
    { loose: 55, broken: 53, lost: 19, viewpoint: 1 },
    { loose: 49, broken: 34, lost: 16, viewpoint: 1 },
    { loose: 56, broken: 35, lost: 24, viewpoint: 1 },
    { loose: 47, broken: 40, lost: 34, viewpoint: 0 },
  ];
  return (
    <PredictGridContainer>
      <TableDiv>
        <PredictTitle title="이상 위험 휠" num={114}></PredictTitle>
      </TableDiv>
      <GraphDiv>
        <PredictTitle title="차주 교체 예상 휠" num={14}></PredictTitle>
        <ScatterGraph data={data} />
      </GraphDiv>
    </PredictGridContainer>
  );
}

export default PredictPage;
