import { setCheckId, setInquire } from "../../_store/slices/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import React from "react";
import { ReactComponent as RefreshBtn } from "../../assets/refreshBtn.svg";
import Title from "../Title";
import { redirect } from "react-router";
import styled from "styled-components";

type WheelNameType = {
  wheelName: string;
  url: string;
};

type OHTResultDivType = {
  ratio: number;
};

type WheelDivType = {
  url: string;
};

const OHTResultSec = styled.section`
  display: flex;
  flex-direction: column;
  grid-row: 1/3;
  grid-column: 1/2;
  padding: 10px;
`;

// 화면 공통
const OHTResultContainer = styled.div`
  background-color: var(--section-color);
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  height: 100%;
`;

const OHTResultDiv = styled.div<OHTResultDivType>`
  width: ${props => props.ratio}%;
  display: flex;
  flex-direction: column;
`;

// 화면 좌측 구성
const OHTInfoGrid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 12% 12% 12% auto;
  grid-template-columns: 30% auto;
  row-gap: 2%;
  column-gap: 1%;
`;

const InfoTitleDiv = styled.div`
  color: var(--emphasize-color);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
`;

const InfoContentDiv = styled.div`
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VoltInfoGrid = styled.div`
  display: grid;
  padding: 10px;
  width: 100%;
  height: 100%;
  grid-template-rows: 20% 20% 20% 20% auto;
  grid-template-columns: 20% 20% 20% 20% auto;
  row-gap: 1%;
  column-gap: 1%;
`;

// 화면 우측 구성
const OHTWheelsDiv = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 48% 48%;
  grid-template-columns: 47% 47%;
  gap: 4%;
`;
const WheelDiv = styled.div<WheelDivType>`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
`;
const OHTWheel = ({ wheelName, url }: WheelNameType) => {
  const IMG_URL = process.env.REACT_APP_IMG_URL;
  return (
    <WheelDiv url={`${IMG_URL}${url}`}>
      <h4>{wheelName}</h4>
    </WheelDiv>
  );
};

const TitleContainer = styled.div`
  display: flex;
`;

function OHTResult(props: any) {
  const data = props.data;
  const indexList = [0, 1, 2, 3];
  const dispatch = useDispatch();
  const sseId = useSelector((state: any) => {
    return state.dashboard.sseId;
  });
  const isInquire = useSelector((state: any) => state.dashboard.inquire);
  return (
    <OHTResultSec>
      <TitleContainer>
        <Title title="OHT 휠 검사 결과" />
        <h1 style={{ marginLeft: "6px", paddingTop: "1px" }}>
          <RefreshBtn
            fill="var(--emphasize-color)"
            style={{ cursor: "pointer" }}
            onClick={() => {
              console.log("checkId", sseId);
              dispatch(setCheckId(sseId));
              dispatch(setInquire(false));
            }}
          />
        </h1>
      </TitleContainer>
      <OHTResultContainer>
        <OHTResultDiv ratio={57}>
          <h3 style={{ color: "var(--emphasize-color)" }}>검사 정보</h3>
          <OHTInfoGrid>
            <InfoTitleDiv>검사 호기</InfoTitleDiv>
            <InfoContentDiv>{data[0].oht_sn}</InfoContentDiv>
            <InfoTitleDiv>검사 일시</InfoTitleDiv>
            <InfoContentDiv>
              {data[0].ohtCheckDatetime[0]}-{String(data[0].ohtCheckDatetime[1]).padStart(2, "0")}-
              {String(data[0].ohtCheckDatetime[2]).padStart(2, "0")}{" "}
              {String(data[0].ohtCheckDatetime[3]).padStart(2, "0")}:
              {String(data[0].ohtCheckDatetime[4]).padStart(2, "0")}:
              {String(data[0].ohtCheckDatetime[5]).padStart(2, "0")}
            </InfoContentDiv>
            <InfoTitleDiv>최종 교체</InfoTitleDiv>
            <InfoContentDiv>
              {data[0].ohtChangeDate[0]}-{String(data[0].ohtChangeDate[1]).padStart(2, "0")}-
              {String(data[0].ohtChangeDate[2]).padStart(2, "0")}{" "}
              {String(data[0].ohtChangeDate[3]).padStart(2, "0")}:
              {String(data[0].ohtChangeDate[4]).padStart(2, "0")}:
              {String(data[0].ohtChangeDate[5]).padStart(2, "0")}
            </InfoContentDiv>
            <InfoTitleDiv>볼트 현황</InfoTitleDiv>
            <InfoContentDiv>
              <VoltInfoGrid>
                <InfoTitleDiv></InfoTitleDiv>
                <InfoTitleDiv>유실</InfoTitleDiv>
                <InfoTitleDiv>풀림</InfoTitleDiv>
                <InfoTitleDiv>모호</InfoTitleDiv>
                <InfoTitleDiv>양호</InfoTitleDiv>
                {indexList.map((item, idx) => {
                  return (
                    <React.Fragment key={idx}>
                      <InfoTitleDiv>{data[item].wheelPosition}</InfoTitleDiv>
                      <InfoContentDiv>{data[item].boltOutCount}</InfoContentDiv>
                      <InfoContentDiv>{data[item].boltLoseCount}</InfoContentDiv>
                      <InfoContentDiv>{data[item].unclassifiedCount}</InfoContentDiv>
                      <InfoContentDiv>{data[item].boltGoodCount}</InfoContentDiv>
                    </React.Fragment>
                  );
                })}
              </VoltInfoGrid>
            </InfoContentDiv>
          </OHTInfoGrid>
        </OHTResultDiv>
        <OHTResultDiv ratio={40}>
          <h3 style={{ color: "var(--emphasize-color)" }}>휠 상세 이미지</h3>
          <OHTWheelsDiv>
            {indexList.map((item, idx) => {
              return (
                <OHTWheel wheelName={data[item].wheelPosition} key={idx} url={data[item].image} />
              );
            })}
          </OHTWheelsDiv>
        </OHTResultDiv>
      </OHTResultContainer>
    </OHTResultSec>
  );
}

export default OHTResult;
