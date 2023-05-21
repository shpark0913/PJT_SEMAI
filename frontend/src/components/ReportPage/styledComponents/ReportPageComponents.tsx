import styled from "styled-components";

export const ReportSection = styled.section`
  padding: 30px;
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`;
export const ReportFormContainer = styled.div`
  width: 100%;
  transition: all 500ms ease;
  overflow-x: auto;

  &.open {
    width: 55%;
    overflow-x: auto;
  }
`;