import Axios from "../_utils/Axios";
import { Button } from "../components/ButtonComponents";
import PredictTable from "../components/PredictPage/PredictTable";
import React from "react";
import { ReactComponent as ScatterCircle } from "../assets/ScatterCircle.svg";
import ScatterGraph from "../components/PredictPage/ScatterGraph";
import Title from "../components/Title";
import axios from "axios";
import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

export async function loader() {
  let abnormalWheels;
  async function f() {
    const response = await Axios.get(`report/anomaly`);
    abnormalWheels = response.data.data;
  }
  await f();

  return abnormalWheels;
}

type PredictTitleType = {
  title: string;
  num: number | string;
};

const ScatterCircleSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: space-evenly;
`;

const ScatterCircleDiv = styled.div`
  display: flex;
  align-items: center;

  > span {
    margin-left: 5px;
  }
`;

const PredictGridContainer = styled.main`
  display: grid;
  grid-template-columns: 47% auto;
  gap: 50px;
  height: 100%;
  padding: 30px;
  overflow-x: hidden;
  position: relative;
`;

// 좌측 표
const TableSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

// 우측 그래프
const GraphSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

const PredictTitleDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const WheelNumberDiv = styled.div`
  text-align: center;
  padding-top: 10px;
  padding-bottom: 20px;
  font-size: 18px;

  & > abbr {
    color: var(--emphasize-color);
    font-weight: bold;
    font-size: 22px;
  }
`;

// 표와 그래프에서 같이 쓰는 제목
const PredictTitle = ({ title, num }: PredictTitleType) => {
  return (
    <PredictTitleDiv>
      <Title title={title}></Title>
      <WheelNumberDiv>
        <abbr>{num}</abbr> / 400
      </WheelNumberDiv>
    </PredictTitleDiv>
  );
};

const CustomInput = styled.input`
  border: 1px solid var(--emphasize-color);
  border-radius: 5px;
  width: 40px;
  color: var(--font-color);
  margin: 0px 15px 0px 5px;
`;

function PredictPage() {
  const [predictWheelNum, setPredictWheelNum] = useState("-");
  const [lostNum, SetLostNum] = useState("");
  const [brokenNum, SetBrokenNum] = useState("");
  const [looseNum, SetLooseNum] = useState("");
  const onLostNumHandler = (event: any) => SetLostNum(event.target.value.replace(/[^0-9]/g, ""));
  const onBrokenNumHandler = (event: any) =>
    SetBrokenNum(event.target.value.replace(/[^0-9]/g, ""));
  const onLooseNumHandler = (event: any) => SetLooseNum(event.target.value.replace(/[^0-9]/g, ""));
  const [graphData, setGraphData] = useState([
    // x, y, z 축 범위 설정
    // viewpoint가 0이면 blue(예측 데이터), 1이면 red(누적된 실제 데이터)
    { loose: 0, broken: 0, lost: 0, viewpoint: 0.7 },
    { loose: 300, broken: 120, lost: 200, viewpoint: 0.7 },

    // 아래는 추가적인 데이터
    { lost: 68, loose: 160, broken: 20, viewpoint: 1 },
    { lost: 115, loose: 207, broken: 30, viewpoint: 1 },
    { lost: 86, loose: 195, broken: 47, viewpoint: 1 },
    { lost: 142, loose: 210, broken: 74, viewpoint: 1 },
    { lost: 74, loose: 180, broken: 38, viewpoint: 1 },
    { lost: 90, loose: 187, broken: 42, viewpoint: 1 },
    { lost: 139, loose: 261, broken: 87, viewpoint: 1 },
    { lost: 114, loose: 205, broken: 53, viewpoint: 1 },
    { lost: 86, loose: 170, broken: 32, viewpoint: 1 },
    { lost: 76, loose: 182, broken: 39, viewpoint: 1 },
    { lost: 118, loose: 210, broken: 56, viewpoint: 1 },
    { lost: 125, loose: 218, broken: 61, viewpoint: 1 },
    { lost: 123, loose: 179, broken: 38, viewpoint: 1 },
    { lost: 105, loose: 231, broken: 69, viewpoint: 1 },
    { lost: 74, loose: 205, broken: 53, viewpoint: 1 },
    { lost: 77, loose: 183, broken: 40, viewpoint: 1 },
    { lost: 158, loose: 223, broken: 64, viewpoint: 1 },
    { lost: 131, loose: 264, broken: 89, viewpoint: 1 },
    { lost: 74, loose: 155, broken: 23, viewpoint: 1 },
    { lost: 55, loose: 206, broken: 54, viewpoint: 1 },
    { lost: 89, loose: 187, broken: 42, viewpoint: 1 },
    { lost: 98, loose: 197, broken: 48, viewpoint: 1 },
    { lost: 61, loose: 151, broken: 21, viewpoint: 1 },
    { lost: 104, loose: 205, broken: 53, viewpoint: 1 },
    { lost: 130, loose: 237, broken: 72, viewpoint: 1 },
    { lost: 71, loose: 163, broken: 28, viewpoint: 1 },
    { lost: 115, loose: 219, broken: 61, viewpoint: 1 },
    { lost: 105, loose: 206, broken: 54, viewpoint: 1 },
    { lost: 78, loose: 172, broken: 33, viewpoint: 1 },
    { lost: 107, loose: 209, broken: 55, viewpoint: 1 },
    { lost: 108, loose: 210, broken: 56, viewpoint: 1 },
    { lost: 118, loose: 222, broken: 63, viewpoint: 1 },
    { lost: 32, loose: 115, broken: 0, viewpoint: 1 },
    { lost: 157, loose: 271, broken: 93, viewpoint: 1 },
    { lost: 93, loose: 191, broken: 45, viewpoint: 1 },
    { lost: 94, loose: 192, broken: 45, viewpoint: 1 },
    { lost: 129, loose: 236, broken: 72, viewpoint: 1 },
    { lost: 121, loose: 226, broken: 66, viewpoint: 1 },
    { lost: 116, loose: 220, broken: 62, viewpoint: 1 },
    { lost: 96, loose: 194, broken: 47, viewpoint: 1 },
    { lost: 123, loose: 209, broken: 67, viewpoint: 1 },
    { lost: 119, loose: 203, broken: 64, viewpoint: 1 },
    { lost: 103, loose: 184, broken: 52, viewpoint: 1 },
    { lost: 106, loose: 188, broken: 55, viewpoint: 1 },
    { lost: 123, loose: 208, broken: 67, viewpoint: 1 },
    { lost: 88, loose: 165, broken: 41, viewpoint: 1 },
    { lost: 96, loose: 204, broken: 47, viewpoint: 1 },
    { lost: 110, loose: 202, broken: 57, viewpoint: 1 },
    { lost: 107, loose: 218, broken: 55, viewpoint: 1 },
    { lost: 153, loose: 276, broken: 89, viewpoint: 1 },
    { lost: 125, loose: 221, broken: 69, viewpoint: 1 },
    { lost: 110, loose: 222, broken: 57, viewpoint: 1 },
    { lost: 116, loose: 199, broken: 62, viewpoint: 1 },
    { lost: 66, loose: 148, broken: 25, viewpoint: 1 },
    { lost: 95, loose: 144, broken: 46, viewpoint: 1 },
    { lost: 75, loose: 169, broken: 31, viewpoint: 1 },
    { lost: 124, loose: 160, broken: 68, viewpoint: 1 },
    { lost: 102, loose: 182, broken: 51, viewpoint: 1 },
    { lost: 128, loose: 234, broken: 71, viewpoint: 1 },
    { lost: 69, loose: 161, broken: 27, viewpoint: 1 },
    { lost: 93, loose: 192, broken: 45, viewpoint: 1 },
    { lost: 83, loose: 178, broken: 37, viewpoint: 1 },
    { lost: 90, loose: 187, broken: 42, viewpoint: 1 },
    { lost: 75, loose: 169, broken: 31, viewpoint: 1 },
    { lost: 108, loose: 210, broken: 56, viewpoint: 1 },
    { lost: 105, loose: 206, broken: 54, viewpoint: 1 },
    { lost: 92, loose: 191, broken: 44, viewpoint: 1 },
    { lost: 79, loose: 174, broken: 34, viewpoint: 1 },
    { lost: 117, loose: 221, broken: 63, viewpoint: 1 },
    { lost: 112, loose: 215, broken: 59, viewpoint: 1 },
    { lost: 104, loose: 206, broken: 53, viewpoint: 1 },
    { lost: 104, loose: 206, broken: 53, viewpoint: 0 },
  ]);

  const abnormalWheels: any = useLoaderData();
  let abnormalData: any[] = [];
  abnormalWheels.map((abnormalWheel: any) => {
    if (abnormalWheel.anomalyFlag === -1) {
      abnormalData.push(abnormalWheel);
    }
  });

  return (
    <PredictGridContainer>
      <TableSection>
        <PredictTitle title="이상 위험 휠" num={abnormalData.length} />
        <PredictTable abnormalWheels={abnormalWheels} />
      </TableSection>

      <GraphSection>
        <PredictTitle
          title="차주 교체 예상 휠"
          num={predictWheelNum !== "-" ? Math.round(Number(predictWheelNum)) : "-"}
        />
        <div>
          <label htmlFor="lost">유실 :</label>
          <CustomInput type="text" id="lost" value={lostNum} onChange={onLostNumHandler} />
          <label htmlFor="broken">파단 :</label>
          <CustomInput type="text" id="broken" value={brokenNum} onChange={onBrokenNumHandler} />
          <label htmlFor="loose">풀림 :</label>
          <CustomInput type="text" id="loose" value={looseNum} onChange={onLooseNumHandler} />
          <Button
            style={{ width: "45px", height: "28px" }}
            onClick={event => {
              event.preventDefault();
              Axios.get(`report/predict`, {
                params: {
                  lost: lostNum,
                  loose: looseNum,
                  broken: brokenNum,
                },
              })
                .then(response => {
                  setPredictWheelNum(response.data.data.predictNum);
                  const newData = {
                    lost: response.data.data.lost,
                    loose: response.data.data.loose,
                    broken: response.data.data.broken,
                    viewpoint: 0,
                  };
                  const lastData = [...graphData];
                  lastData[lastData.length - 1].viewpoint = 1;
                  lastData.push(newData);
                  setGraphData(lastData);
                })
                .catch(error => console.log("error", error));
            }}
          >
            조회
          </Button>
        </div>
        <ScatterGraph data={graphData} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <ScatterCircleSection>
            <ScatterCircleDiv>
              <ScatterCircle fill="blue" />
              <span>차주 교체 예상 휠</span>
            </ScatterCircleDiv>
            <ScatterCircleDiv>
              <ScatterCircle fill="red" />
              <span>과거 실제 교체 휠</span>
            </ScatterCircleDiv>
            <ScatterCircleDiv>
              <ScatterCircle fill="yellow" />
              <span>기준 좌표</span>
            </ScatterCircleDiv>
          </ScatterCircleSection>
        </div>
      </GraphSection>
    </PredictGridContainer>
  );
}

export default PredictPage;
