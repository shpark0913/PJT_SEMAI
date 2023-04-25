import OHTResultMenu from "./OHTResultMenu";
import Title from "../Title";
import styled from "styled-components";

const OHTAllResultContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  grid-row: 3/4;
  grid-column: 1/3;
  margin-top: 10px;
  width: 100%;
  height: 100%;
`;

const OHTAllResultSec = styled.div`
  flex: 1;
  overflow: auto;
`;

function OHTAllResult() {
  return (
    <OHTAllResultContainer>
      <Title title="OHT 휠 검사 현황" />
      <OHTAllResultSec>
        <OHTResultMenu />
      </OHTAllResultSec>
    </OHTAllResultContainer>
  );
}

export default OHTAllResult;
