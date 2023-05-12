import styled from "styled-components";

export const TabContentFlex = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const TabContentInfos = styled.div`
  width: 100%;
  height: 35px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  & > div{
    display: flex;
    &:last-of-type > button {
      margin-right: 10px;
    }
  }
`;