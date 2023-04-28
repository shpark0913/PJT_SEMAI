import React, { useState } from 'react';
import styled from "styled-components";
import { TransferImage, TransferImageGrid, TransferImageGridContainer } from "./TransferImageComponents";
import {Button, RedButton, SemesButton} from "../ButtonComponents";

const TransferTabContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-grow: 1;
  height: 80%;
`;

const TransferMenuContainer = styled.menu`
  padding: 0;
  margin: 0;
  width: 150px;
  flex-shrink: 0;
  
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
  height: auto;
  padding: 30px 20px 20px 30px;
  
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
      & > * {
        margin-right: 15px;
      }
    }
  }
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
      content:
        <>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
          <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div>안녕</div></TransferImage>
        </>,
      buttons: 
        <>
          <Button>유실로 이동</Button>
          <Button>풀림으로 이동</Button>
          <SemesButton>학습으로 이동</SemesButton>
          <RedButton>삭제하기</RedButton>
        </>
    },
    {
      menu: '유실',
      content: <div>유실이미지</div>,
      buttons:
        <>
          <Button>양호로 이동</Button>
          <Button>풀림으로 이동</Button>
          <SemesButton>학습으로 이동</SemesButton>
          <RedButton>삭제하기</RedButton>
        </>,
    },
    {
      menu: '풀림',
      content: <div>풀림이미지</div>,
      buttons:
        <>
          <Button>양호로 이동</Button>
          <Button>유실로 이동</Button>
          <SemesButton>학습으로 이동</SemesButton>
          <RedButton>삭제하기</RedButton>
        </>,
    },
    {
      menu: '모호',
      content: <div>모호이미지</div>,
      buttons:
        <>
          <Button>양호로 이동</Button>
          <Button>유실로 이동</Button>
          <Button>풀림으로 이동</Button>
          <RedButton>삭제하기</RedButton>
        </>,
    },
    {
      menu: '학습',
      content: <div>학습이미지</div>,
      buttons:
        <>
          <SemesButton>모델 학습하기</SemesButton>
          <RedButton>삭제하기</RedButton>
        </>,
    },

  ]

  return (
    <TransferTabContainer>
      <TransferMenuContainer>
        { tabComponent.map((tab, idx) =>
          <li
            key={`transfer-tab-menu-${idx}`}
            className={idx === tabIdx ? "isActive" : "" }
            onClick={ () => setTabIdx(idx) }
          >
            {tab.menu} <span>13</span>
          </li>
        ) }
      </TransferMenuContainer>

      <TransferImageContainer>
        <label>전체 선택 <input type="checkbox" /></label>
        <TransferImageGridContainer>
          <TransferImageGrid>{tabComponent[tabIdx].content}</TransferImageGrid>
        </TransferImageGridContainer>
        <div>
          {/*<Button>유실로 이동</Button>*/}
          {/*<Button>풀림으로 이동</Button>*/}
          {/*<SemesButton>학습으로 이동</SemesButton>*/}
          {/*<RedButton>삭제하기</RedButton>*/}
          { tabComponent[tabIdx].buttons }
          <div>현재 선택 : 1/100</div>
        </div>
      </TransferImageContainer>
    </TransferTabContainer>
  );
}

export default TransferTab;