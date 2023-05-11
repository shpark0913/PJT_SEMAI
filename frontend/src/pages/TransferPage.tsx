import React, { useMemo } from 'react';
import {useLoaderData} from "react-router-dom";
import styled from "styled-components";

import {TransferLoaderType} from "../_utils/Types";

import {
  TransferContainer,
  TransferImageContainer,
} from "../components/TransferPage/TransferTabComponents";
import TransferBoltImages from "../components/TransferPage/TransferBoltImages";
import LearningBoltImages from "../components/TransferPage/LearningBoltImages";
import TabMenu from "../components/TransferPage/TabMenu";
import {useAppSelector} from "../_hooks/hooks";


const TransferSection = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
`

function TransferPage() {
  let BoltImageLists = useLoaderData() as TransferLoaderType[][];
  const ImageLengthList: number[] = useMemo(() => BoltImageLists[0].map((data) => data.images.length)
        .concat((BoltImageLists[1].reduce((acc, cur) => acc + cur.images.length, 0))
    ), [BoltImageLists]);
  const tabIndex = useAppSelector(state => state.transferPage.tabIndex);

  console.log(BoltImageLists);

  return (
    <TransferSection>
      <TransferContainer>
        <TabMenu
          imageLengthList={ImageLengthList}
        />

        <TransferImageContainer>
          { tabIndex < 3 ?
            <TransferBoltImages tabIndex={tabIndex} BoltImageLists={BoltImageLists[0]} /> :
            <LearningBoltImages BoltImageLists={BoltImageLists[0]} />
          }

        </TransferImageContainer>
      </TransferContainer>
    </TransferSection>
  );
}

export default TransferPage;