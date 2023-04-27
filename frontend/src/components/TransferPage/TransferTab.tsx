import React from 'react';
import styled from "styled-components";

const TransferTabContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-grow: 1;
`;

const TabMenu = styled.menu`
  padding: 0;
  margin: 0;
  width: 120px;
  
  & > li {
    padding: 10px 15px;
    background-color: var(--background-dark-color);
    text-align: center;
    margin-bottom: 5px;
    border-radius: 100px 0 0 100px;
    &:hover {
      cursor: pointer;
    }
    & > span {
      font-size: 13px;
      color: #FCFCFC;
      background-color: var(--emphasize-color-hover);
      border-radius: 20px;
      padding: 2px 7px;
      margin-left: 5px;
    }
  }
  
`

const TransferImageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  overflow-y: auto;
  background-color: var(--section-color);
  border-radius: 0 10px 10px 10px;
`

function TransferTab() {
  return (
    <TransferTabContainer>
      <TabMenu>
        <li>정상 <span>0</span></li>
        <li>유실 <span>13</span></li>
        <li>파단 <span>100</span></li>
        <li>풀림 <span>27</span></li>
        <li>모호 <span>13</span></li>
        <li>학습 <span>3</span></li>
      </TabMenu>
      <TransferImageContainer>여기에 본문 내용</TransferImageContainer>
    </TransferTabContainer>
  );
}

export default TransferTab;