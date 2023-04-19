import styled from "styled-components";

const MainGrid = styled.section`
  display: grid;
  width: 100%;
  height: 95vh;
  /* grid-template-rows: repeat(4, 25vh);
  grid-template-columns: ; */
  gap: 25px;
`;

const OHTWheel = styled.section`
  background-color: skyblue;
  grid-row: ;
  grid-column: ;
`;

const OnInspection = styled.section`
  background-color: greenyellow;
`;

const Transition = styled.section`
  background-color: blueviolet;
`;

const AllOHTWheel = styled.section`
  background-color: pink;
`;

function DashboardPage() {
  return (
    <MainGrid>
      <OHTWheel>OHT Wheel 현황</OHTWheel>
      <OnInspection>검사 중</OnInspection>
      <Transition>전이 데이터</Transition>
      <AllOHTWheel>OHT Wheel 전체 검사 현황</AllOHTWheel>
    </MainGrid>
  );
}

export default DashboardPage;
