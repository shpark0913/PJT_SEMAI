import ReactEcharts from "echarts-for-react";
import styled from "styled-components";

interface Props {
  myScore: number;
  name: string;
  order: string;
}

const ChartFrame = styled.div`
  width: 30%;
  padding: 15px 0px;
`;

function MyInterestChart({ myScore, name, order }: Props) {
  const gaugeData = [
    {
      value: myScore,
      // name: myScore + "%", // 이 부분은 점수에 따라 다른 데이터 보여주자
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
        color: order === "1" ? "skyblue" : order === "2" ? "pink" : "yellow",
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
          fontSize: 18,
          color: "inherit",
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

export default MyInterestChart;
