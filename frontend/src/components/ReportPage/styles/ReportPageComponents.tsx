import styled from "styled-components";
import { Form } from "react-router-dom";

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
    width: calc(100vw - 830px);
    overflow-x: auto;
  }
`;
export const ReportForm = styled(Form)`
  height: 100%;
  width: 100%;
  min-width: 850px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 30px;
`;
export const NoData = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
`;