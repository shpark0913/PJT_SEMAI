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
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  let BoltImageLists = useLoaderData() as TransferLoaderType[][];
  const TabMenuList = ['양호', '유실', '파단', '학습'];
  console.log(BoltImageLists);

  return (
    <TransferSection>

      <TransferContainer>
        <TransferMenuContainer>
          { TabMenuList.map((menu, idx) =>
            <li
              key={`transfer-tab-menu_${idx}`}
              className={idx === tabIndex ? "isActive" : "" }
              onClick={ () => {
                setTabIndex(idx);
                setIsDetailOpen(false);
              } }
            >
              {TabMenuList[idx]}
              <span>{idx < 3 ?
                BoltImageLists[0][idx].images.length :
                BoltImageLists[1].reduce((acc, cur) => acc + cur.images.length, 0) }
              </span>
            </li>
          ) }
        </TransferMenuContainer>

        <TransferImageContainer>
          { tabIndex < 3 ?
            <TransferBoltImages tabIndex={tabIndex} BoltImageLists={BoltImageLists[0]} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} /> :
            // 이거 나중에 BoltImageLists[1]로 변경해야됨!!
            <LearningBoltImages tabIndex={tabIndex} BoltImageLists={BoltImageLists[0]} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} TabMenuList={TabMenuList} />
          }

        </TransferImageContainer>
      </TransferContainer>

    </TransferSection>
  );
}

export default TransferPage;