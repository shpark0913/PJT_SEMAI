import styled from "styled-components";

const OHTResultMenuBarDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 33px;
  border-top: 3px solid var(--section-color);
  border-bottom: 2px solid var(--section-color);
  background-color: var(--background-dark-color);
  color: var(--emphasize-color);
  font-weight: bold;
`;

function OHTResultMenuBar() {
  return (
    <OHTResultMenuBarDiv>
      <span>날짜</span>
      <span>시간</span>
      <span>호기 ID</span>
      <span>판정 결과</span>
      <span>FL</span>
      <span>FR</span>
      <span>RL</span>
      <span>RR</span>
    </OHTResultMenuBarDiv>
  );
}

export default OHTResultMenuBar;
