import React from "react";
import ScatterGraph from "../components/PredictPage/ScatterGraph";
import styled from "styled-components";

const GraphDiv = styled.div`
  display: flex;
  background-color: #ededed;
  width: 50vw;
  justify-content: center;
  align-items: center;
`;

function PredictPage() {
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
    <GraphDiv>
      <ScatterGraph data={data} />
    </GraphDiv>
  );
}

export default PredictPage;
