import React, { useMemo } from 'react';
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";

import { TransferLoaderType } from "../_utils/Types";

import { TransferContainer } from "../components/TransferPage/TransferTabComponents";
import TabMenu from "../components/TransferPage/TabMenu";
import TabContent from "../components/TransferPage/TabContent";


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

  console.log(BoltImageLists);

  return (
    <TransferSection>
      <TransferContainer>
        <TabMenu imageLengthList={ImageLengthList} />
        <TabContent BoltImageLists={BoltImageLists} imageLengthList={ImageLengthList} />
      </TransferContainer>
    </TransferSection>
  );
}

export default TransferPage;