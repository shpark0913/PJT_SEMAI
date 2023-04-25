import ReactEcharts from "echarts-for-react";
import styled from "styled-components";

interface Props {
  myScore: number;
  name: string;
  order: string;
}

const ChartFrame = styled.div`
  padding-top: 4%;
  width: 30%;
`;

function ChartDark({ myScore, name, order }: Props) {
  const gaugeData = [
    {
      value: myScore,
      // name: name, // 이 부분은 점수에 따라 다른 데이터 보여주자
      detail: {
        valueAnimation: true,
        offsetCenter: ["0%", "0%"],
      },
    },
  ];

  const option = {
    series: [
      {
        type: "gauge",
        color:
          order === "1"
            ? {
                type: "linear",
                colorStops: [
                  { offset: 0, color: "#C741C6" }, // 시작 색상
                  // { offset: 0.5, color: 'yellow' }, // 중간 색상
                  { offset: 1, color: "#F22778" }, // 끝 색상
                ],
              }
            : order === "2"
            ? {
                type: "linear",
                colorStops: [
                  { offset: 0, color: "#687DF2" }, // 시작 색상
                  { offset: 1, color: "#A343E3" }, // 끝 색상
                ],
              }
            : {
                type: "linear",
                colorStops: [
                  { offset: 0, color: "#18D6E9" }, // 시작 색상
                  { offset: 1, color: "#4B6FFE" }, // 끝 색상
                ],
              },
        startAngle: 90, // 시작점
        endAngle: -270, // 끝점
        pointer: {
          // 게이지 화살표 안보이게
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true, // 끝이 둥글게
          clip: false,
          itemStyle: {
            borderWidth: 1,
            // borderColor: "#464646",
          },
        },
        axisLine: {
          lineStyle: {
            // 게이지 두께
            width: 11,
          },
        },
        splitLine: {
          // 눈금 안보이게
          show: false,
        },
        axisTick: {
          // 눈금 안보이게
          show: false,
        },
        axisLabel: {
          // 게이지 인덱스 안보이게
          show: false,
          distance: 10,
        },
        data: gaugeData,
        title: {
          fontSize: 14,
        },
        detail: {
          fontSize: 17,
          color: "#001F3D",
          formatter: "{value}%",
        },
      },
    ],
  };

  return (
    <ChartFrame>
      <ReactEcharts option={option} notMerge={true} style={{ height: "17vh" }} lazyUpdate={true} />
    </ChartFrame>
  );
}

function ChartLight({ myScore, name, order }: Props) {
  const gaugeData = [
    {
      value: myScore,
      // name: name, // 이 부분은 점수에 따라 다른 데이터 보여주자
      detail: {
        valueAnimation: true,
        offsetCenter: ["0%", "0%"],
      },
    },
  ];

  const option = {
    series: [
      {
        type: "gauge",
        color:
          order === "1"
            ? {
                type: "linear",
                colorStops: [
                  { offset: 0, color: "#C741C6" }, // 시작 색상
                  // { offset: 0.5, color: 'yellow' }, // 중간 색상
                  { offset: 1, color: "#F22778" }, // 끝 색상
                ],
              }
            : order === "2"
            ? {
                type: "linear",
                colorStops: [
                  { offset: 0, color: "#687DF2" }, // 시작 색상
                  { offset: 1, color: "#A343E3" }, // 끝 색상
                ],
              }
            : {
                type: "linear",
                colorStops: [
                  { offset: 0, color: "#18D6E9" }, // 시작 색상
                  { offset: 1, color: "#4B6FFE" }, // 끝 색상
                ],
              },
        startAngle: 90, // 시작점
        endAngle: -270, // 끝점
        pointer: {
          // 게이지 화살표 안보이게
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true, // 끝이 둥글게
          clip: false,
          itemStyle: {
            borderWidth: 1,
            // borderColor: "#464646",
          },
        },
        axisLine: {
          lineStyle: {
            // 게이지 두께
            width: 11,
          },
        },
        splitLine: {
          // 눈금 안보이게
          show: false,
        },
        axisTick: {
          // 눈금 안보이게
          show: false,
        },
        axisLabel: {
          // 게이지 인덱스 안보이게
          show: false,
          distance: 10,
        },
        data: gaugeData,
        title: {
          fontSize: 14,
        },
        detail: {
          fontSize: 17,
          color: "#A3D1FF",
          formatter: "{value}%",
        },
      },
    ],
  };

  return (
    <ChartFrame>
      <ReactEcharts option={option} notMerge={true} style={{ height: "17vh" }} lazyUpdate={true} />
    </ChartFrame>
  );
}

export { ChartDark, ChartLight };
