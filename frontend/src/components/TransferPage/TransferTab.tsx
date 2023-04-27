import React, {useState} from 'react';
import styled from "styled-components";

const TransferTabContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-grow: 1;
`;

const TabMenu = styled.menu`
  padding: 0;
  margin: 0;
  width: 150px;
  
  & > li {
    padding: 12px 20px;
    background-color: var(--tab-menu-color);
    text-align: center;
    margin-bottom: 5px;
    border-radius: 100px 0 0 100px;
    & > span {
      font-size: 13px;
      color: var(--tab-span-font-color);
      background-color: var(--gray400-color);
      border-radius: 20px;
      padding: 2px 7px;
      margin-left: 5px;
    }
    &:hover {
      cursor: pointer;
    }
  }
  
  & >li.isActive {
    background-color: var(--section-color);
    color: var(--emphasize-color);
    font-weight: bold;

    & > span {
      background-color: var(--tab-span-color);
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

const data = [
  {
    "status":0,
    "images":[
      {
        "imgUrl" : "/img/good/2023_04_24_15:33_22_SS001_FL_1.png",
        "fileId" : 1,
        "originName" : "2023_04_24_15:33_22_SS001_FL_1.png"
      },
      {
        "imgUrl" : "/img/good/2023_04_24_15:33_22_SS001_FL_2.png",
        "fileId" : 2,
        "originName" : "2023_04_24_15:33_22_SS001_FL_2.png"
      },
      {
        "imgUrl" : "/img/good/2023_04_24_15:33_22_SS001_FL_3.png",
        "fileId" : 3,
        "originName" : "2023_04_24_15:33_22_SS001_FL_3.png"
      },
    ],
  },
  {
    "status":2,
    "images":[
      {
        "imgUrl" : "/img/bolt_lost/2023_04_24_15:33_22_SS001_FL_4.png",
        "fileId" : 4,
        "originName" : "2023_04_24_15:33_22_SS001_FL_4.png"
      },
      {
        "imgUrl" : "/img/bolt_lost/2023_04_24_15:33_22_SS001_FL_5.png",
        "fileId" : 5,
        "originName" : "2023_04_24_15:33_22_SS001_FL_5.png"
      },
      {
        "imgUrl" : "/img/bolt_lost/2023_04_24_15:33_22_SS001_FL_6.png",
        "fileId" : 6,
        "originName" : "2023_04_24_15:33_22_SS001_FL_6.png"
      },
    ],
  },
  {
    "status": 3,
    "images": [
      {
        "imgUrl": "/img/bolt_ambigue/1.png",
        "fileId": 7,
        "originName": "2023.04.13_11:00_P12345"
      },
      {
        "imgUrl": "/img/bolt_ambigue/2.png",
        "fileId": 8,
        "originName": "2023.04.13_11:00_P12345"
      },
      {
        "imgUrl": "/img/bolt_ambigue/3.png",
        "fileId": 9,
        "originName": "2023.04.13_11:00_P12345"
      },
    ],
  }
];

function TransferTab() {
  const [tabIdx, setTabIdx] = useState(0);
  // const TabMenuList = ['정상', '유실', '풀림', '모호'];
  const tabComponent = [
    {
      menu: '양호',
      content: <div>양호이미지</div>
    },
    {
      menu: '유실',
      content: <div>유실이미지</div>
    },
    {
      menu: '풀림',
      content: <div>풀림이미지</div>
    },
    {
      menu: '모호',
      content: <div>모호이미지</div>
    },
    {
      menu: '학습',
      content: <div>학습이미지</div>
    },
    
  ]


  return (
    <TransferTabContainer>
      <TabMenu>
        { tabComponent.map((tab, idx) =>
          <li
          className={idx === tabIdx ? "isActive" : "" }
          onClick={ () => setTabIdx(idx) }
          >
            {tab.menu} <span>13</span>
          </li>
        ) }
      </TabMenu>
      <TransferImageContainer> {tabComponent[tabIdx].content} </TransferImageContainer>
    </TransferTabContainer>
  );
}

export default TransferTab;