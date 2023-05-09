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

const TransferSection = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
`

function TransferPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  let BoltImageLists = useLoaderData() as TransferLoaderType[];
  console.log(BoltImageLists);
  const TabMenuList = ['양호', '유실', '풀림', '모호'];

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
              {TabMenuList[idx]}<span>{BoltImageLists[idx].images.length}</span>
            </li>
          ) }
        </TransferMenuContainer>

        <TransferImageContainer>
          <TransferBoltImages tabIndex={tabIndex} BoltImageLists={BoltImageLists} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} />
        </TransferImageContainer>
      </TransferContainer>

    </TransferSection>
  );
}

export default TransferPage;