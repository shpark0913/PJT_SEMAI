import styled from "styled-components";

const MainGrid = styled.section`
  display: grid;
  width: 98%;
  height: 88vh;
  grid-template-rows: 30% 30% 40%;
  grid-template-columns: 70% 30%;
  gap: 25px;
`;

const OHTResult = styled.section`
  background-color: var(--section-color);
  grid-row: 1/3;
  grid-column: 1/2;
`;

const OHTCheck = styled.section`
  background-color: var(--section-color);
  grid-row: 1/2;
  grid-column: 2/3;
`;

const OHTTransition = styled.section`
  background-color: var(--section-color);
  grid-row: 2/3;
  grid-column: 2/3;
`;

const OHTAllResult = styled.section`
  background-color: var(--section-color);
  grid-row: 3/4;
  grid-column: 1/3;
`;

function DashboardPage() {
  return (
    <MainGrid>
      <OHTResult>OHT Wheel 현황</OHTResult>
      <OHTCheck>검사 중</OHTCheck>
      <OHTTransition>전이 데이터</OHTTransition>
      <OHTAllResult>OHT Wheel 전체 검사 현황</OHTAllResult>
    </MainGrid>
  );
}

export default DashboardPage;
