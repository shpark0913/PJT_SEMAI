import OHTResultMenu from "./OHTResultMenu";
import Title from "../Title";
import styled from "styled-components";
import { useState } from "react";

type TabMenuType = {
  isActive: boolean;
};

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

const TitleContainer = styled.div`
  display: flex;
  width: 15%;
  justify-content: space-between;
  align-items: flex-start;
`;

const TabMenuDiv = styled.div<TabMenuType>`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${props => (props.isActive ? "var(--emphasize-color)" : "var(--font-color)")};
  font-size: 14px;
  padding-top: 3%;
  margin-bottom: 7px;
  font-weight: ${props => (props.isActive ? "900" : "300")};
  border-bottom: ${props => (props.isActive ? "2px solid var(--emphasize-color)" : "none")};
`;

const TabMenuContainer = styled.div`
  display: flex;
  width: 25%;
  justify-content: space-between;
  align-items: flex-start;
`;

const OHTAllResultSec = styled.div`
  flex: 1;
  overflow: auto;
`;

function OHTAllResult() {
  // isActive가 true이면 전체, false이면 에러
  const [isActive, SetIsActive] = useState(true);
  const ClickHandler = (isActive: any) => {
    SetIsActive(!isActive);
  };
  return (
    <OHTAllResultContainer>
      <TitleContainer>
        <Title title="OHT 휠 검사 현황" />
        <TabMenuContainer>
          <TabMenuDiv isActive={isActive} onClick={isActive => ClickHandler(!isActive)}>
            전체
          </TabMenuDiv>
          <TabMenuDiv isActive={!isActive} onClick={isActive => ClickHandler(isActive)}>
            에러
          </TabMenuDiv>
        </TabMenuContainer>
      </TitleContainer>
      <OHTAllResultSec>
        <OHTResultMenu isActive={isActive} />
      </OHTAllResultSec>
    </OHTAllResultContainer>
  );
}

export default OHTAllResult;
