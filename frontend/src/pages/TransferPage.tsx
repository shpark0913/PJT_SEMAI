import React, { useMemo } from 'react';
import { useLoaderData } from "react-router-dom";

import { TransferLoaderType } from "../_utils/Types";

import TabMenu from "../components/TransferPage/TabMenu";
import TabContent from "../components/TransferPage/TabContent";
import { TransferSection, TransferContainer } from "../components/TransferPage/styledComponents/TransferPageComponents";


function TransferPage() {
  let BoltImageLists = useLoaderData() as TransferLoaderType[][];

  const ImageLengthList: number[] = useMemo(() =>
      BoltImageLists[0].map((data) => data.images.length)
        .concat((BoltImageLists[1].reduce((acc, cur) => acc + cur.images.length, 0))
    ), [BoltImageLists]);

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