import React, { useEffect, useState } from "react";

import Axios from "../_utils/Axios";
import { Label } from "../components/ReportPage/styles/FormInputsComponents";
import PredictTable from "../components/PredictPage/PredictTable";
import { ReactComponent as ScatterCircle } from "../assets/ScatterCircle.svg";
import ScatterGraph from "../components/PredictPage/ScatterGraph";
import { SemesButton } from "../components/ButtonComponents";
import Title from "../components/Title";
import axios from "axios";
import { setDetailClose } from "../_store/slices/reportDetailSlice";
import styled from "styled-components";
import { useAppDispatch } from "../_hooks/hooks";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  let abnormalWheels: any;
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

/////////////////////////// 좌,우측 화면 공용 styled component ///////////////////////////
// AI 분석 페이지 최상단 main 태그
const PredictGridContainer = styled.main`
  display: grid;
  grid-template-columns: 47% auto;
  gap: 50px;
  height: 100%;
  padding: 30px;
  overflow-x: hidden;
  position: relative;
`;

/** 좌, 우측 화면의 제목 및 휠 개수 표시하는 컴포넌트 */
const PredictTitle = ({ title, num }: PredictTitleType) => {
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
  return (
    <PredictTitleDiv>
      <Title title={title}></Title>
      <WheelNumberDiv>
        <abbr>{num}</abbr> / 400
      </WheelNumberDiv>
    </PredictTitleDiv>
  );
};

/////////////////////////// 좌측 화면 : 이상 위험 휠 관련 styled component ///////////////////////////
// 좌측 화면 최상단 section 태그
const TableSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

/////////////////////////// 우측 화면 : 차주 교체 예상 휠 관련 styled component ///////////////////////////
// 우측 화면 최상단 section 태그
const GraphSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  //justify-content: space-between;
`;

// 차주 교체 예상 휠을 산정하기 위한 변수를 입력하는 input 태그(유실, 파단, 풀림)
// const CustomInput = styled.input`
//   border: 1px solid var(--emphasize-color);
//   border-radius: 5px;
//   width: 40px;
//   color: var(--font-color);
//   margin: 0px 15px 0px 5px;
// `;

// 그래프 하단에서 그래프의 각 색상이 무엇을 의미하는지 나타내는 section 태그
const ScatterCircleSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: space-evenly;
`;

// ScatterCircleSection 내에서 1개의 색상이 의미하는 것을 각각 나타내는 div 태그
const ScatterCircleDiv = styled.div`
  display: flex;
  align-items: center;

  > span {
    margin-left: 5px;
  }
`;

function PredictPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setDetailClose()); // 초기에, report detail이 열려있다면 닫아주기
  }, []);
  /////////////////////////// 좌측 화면 :  이상 위험 휠 관련 ///////////////////////////
  // abnormalWheels : 모든 휠들의 누적 검사 결과 (양호, 유실, 파단, 풀림 상태의 볼트의 누적 개수 및 가장 최근의 검사 ID 포함)
  const abnormalWheels: any = useLoaderData();
  let abnormalData: any[] = []; // 가장 최근 검사에서 이상이 발견된 휠들로 이뤄진 배열
  abnormalWheels.map((abnormalWheel: any) => {
    if (abnormalWheel.anomalyFlag === -1 || 1) {
      if (
        abnormalWheel.totalLoseCount +
          abnormalWheel.totalLooseCount +
          abnormalWheel.totalOutCount !==
        0
      ) {
        abnormalData.push(abnormalWheel);
      }
    }
  });

  const [lostNum, SetLostNum] = useState(""); // 유실된 볼트 개수

  const [brokenNum, SetBrokenNum] = useState(""); // 파손된 볼트 개수

  const [looseNum, SetLooseNum] = useState(""); // 풀린 볼트 개수

  /////////////////////////// 우측 화면 : 차주 교체 예상 휠 관련 ///////////////////////////
  // 차주 교체 예상 휠 개수
  const [predictWheelNum, setPredictWheelNum] = useState("-");

  /** 유실된 볼트 개수를 입력(정규식을 이용해 숫자만 입력 가능하도록 설정함) */
  const onLostNumHandler = (event: any) => SetLostNum(event.target.value.replace(/[^0-9]/g, ""));

  /** 파손된 볼트 개수를 입력(정규식을 이용해 숫자만 입력 가능하도록 설정함) */
  const onBrokenNumHandler = (event: any) =>
    SetBrokenNum(event.target.value.replace(/[^0-9]/g, ""));

  /** 풀린 볼트 개수를 입력(정규식을 이용해 숫자만 입력 가능하도록 설정함) */
  const onLooseNumHandler = (event: any) => SetLooseNum(event.target.value.replace(/[^0-9]/g, ""));

  // 3차원 Scatter 함수에 표시할 좌표들
  const [graphData, setGraphData] = useState([
    // x, y, z 축 범위 설정 (viewpoint가 0이면 blue(예측 데이터), 1이면 red(누적된 실제 데이터))
    { loose: 0, broken: 0, lost: 0, viewpoint: 0.7 },
    { loose: 300, broken: 120, lost: 200, viewpoint: 0.7 },

    // 아래는 추가적인 데이터 (실제로 그래프에 표시되는 좌표들, 아직 더미 데이터)
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
  const persistRoot = localStorage.getItem("persist:root");
  const user = persistRoot ? JSON.parse(persistRoot).user : undefined;
  const token = user ? JSON.parse(user).token : "";
  const AI_URL = process.env.REACT_APP_AI_URL;

  return (
    <PredictGridContainer>
      <TableSection>
        <PredictTitle title="이상 위험 휠" num={abnormalData.length} />
        <PredictTable abnormalWheels={abnormalWheels} />
      </TableSection>

      <GraphSection>
        <PredictTitle
          title="차주 교체 예상 휠"
          num={predictWheelNum !== "-" ? Math.round(Number(predictWheelNum)) : "-"} // 유실, 파단, 풀림 개수를 입력한 후 조회해야 차주 교체 예상 휠 개수(반올림된 값)가 보임. 그 전에는 "-"로 표시
        />

        <div style={{ display: "flex", marginBottom: "20px" }}>
          <Label htmlFor="lost">
            유실 :
            <input
              style={{ width: "90px", marginRight: "10px" }}
              type="text"
              id="lost"
              value={lostNum}
              onChange={onLostNumHandler}
              autoComplete="off"
            />
          </Label>
          <Label htmlFor="broken">
            파단 :
            <input
              style={{ width: "90px", marginRight: "10px" }}
              type="text"
              id="broken"
              value={brokenNum}
              onChange={onBrokenNumHandler}
              autoComplete="off"
            />
          </Label>
          <Label htmlFor="loose">
            풀림 :
            <input
              style={{ width: "90px", marginRight: "10px" }}
              type="text"
              id="loose"
              value={looseNum}
              onChange={onLooseNumHandler}
              autoComplete="off"
            />
          </Label>
          <SemesButton
            style={{ width: "60px", height: "26px" }}
            onClick={event => {
              event.preventDefault();
              axios
                .get(`${AI_URL}report/predict`, {
                  params: {
                    lost: lostNum,
                    loose: looseNum,
                    broken: brokenNum,
                  },
                  headers: {
                    accesstoken: token,
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
          </SemesButton>
        </div>
        <ScatterGraph data={graphData} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <ScatterCircleSection>
            <ScatterCircleDiv>
              <ScatterCircle fill="blue" />
              <span>금주 이상 볼트 개수</span>
            </ScatterCircleDiv>
            <ScatterCircleDiv>
              <ScatterCircle fill="red" />
              <span>과거 이상 볼트 개수</span>
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
