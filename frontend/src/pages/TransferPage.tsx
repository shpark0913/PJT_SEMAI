import React from 'react';
import styled from "styled-components";
import Title from "../components/Title";
import TransferTab from "../components/TransferPage/TransferTab";

const TransferSection = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
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

function TransferPage() {
  return (
    <TransferSection>
      <Title title="전이학습" />
      <TransferTab></TransferTab>
    </TransferSection>
  );
}

export default TransferPage;