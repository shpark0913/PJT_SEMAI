import styled from "styled-components";

export const TabContentContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 30px;
  
  background-color: var(--section-color);
  border-radius: 0 10px 10px 10px;
  
  display: flex;
  flex-direction: column;
  
  & > * {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
`

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

export const TabContentMain = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

export const BoltImageDetailContainer = styled.div`
  display: none;
  padding-left: 30px;
  box-shadow: -15px 0 10px -10px var(--shadow-color);


  
  &.active {
    grid-column: 6/9;
    width: 100%;

    display: flex;
    flex-direction: column;
  }
`;
export const BoltImageDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  
    & > div {
      font-weight: bold;
    }
`
export const BoltImageDetailImg = styled.img`
  width: 80%;
  text-align: center;
  margin-bottom: 20px;
`