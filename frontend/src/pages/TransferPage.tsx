import React, {useState} from 'react';
import styled from "styled-components";
import {
  TransferContainer,
  TransferImageContainer,
  TransferMenuContainer
} from "../components/TransferPage/TransferTabComponents";
import TransferBoltImages from "../components/TransferPage/TransferBoltImages";
import {useLoaderData} from "react-router-dom";
import {TransferLoaderType} from "../_utils/Types";
import LearningBoltImages from "../components/TransferPage/LearningBoltImages";

const TransferSection = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
`

function TransferPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  let BoltImageLists = useLoaderData() as TransferLoaderType[][];
  console.log(BoltImageLists);
  const TabMenuList = ['양호', '유실', '파단', '학습'];

  return (
    <TransferSection>

      <TransferContainer>
        <TransferMenuContainer>
          { TabMenuList.map((menu, idx) =>
            <li
              key={`transfer-tab-menu-${idx}`}
              className={idx === tabIndex ? "isActive" : "" }
              onClick={ () => {
                setTabIndex(idx);
                setIsDetailOpen(false);
              } }
            >
              {TabMenuList[idx]}<span>{idx < 3 ? BoltImageLists[0][idx].images.length : ""}</span>
            </li>
          ) }
        </TransferMenuContainer>

        <TransferImageContainer>
          { tabIndex < 3 ?
            <TransferBoltImages tabIndex={tabIndex} BoltImageLists={BoltImageLists[0]} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} /> :
            <LearningBoltImages tabIndex={tabIndex} BoltImageLists={BoltImageLists[1]} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} />
          }


        </TransferImageContainer>
      </TransferContainer>

    </TransferSection>
  );
}

export default TransferPage;