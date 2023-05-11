import React from 'react';
import {TransferImageContainer} from "./TransferTabComponents";
import TransferBoltImages from "./TransferBoltImages";
import LearningBoltImages from "./LearningBoltImages";
import {useAppSelector} from "../../_hooks/hooks";
import {TransferLoaderType} from "../../_utils/Types";

function TabContent({BoltImageLists}: {BoltImageLists: TransferLoaderType[][]}) {
  const { tabIndex } = useAppSelector(state => state.transferPage);

  return (
    <TransferImageContainer>
      { tabIndex < 3 ?
        <TransferBoltImages tabIndex={tabIndex} BoltImageLists={BoltImageLists[0]} /> :
        <LearningBoltImages BoltImageLists={BoltImageLists[0]} />
      }
    </TransferImageContainer>
  );
}

export default TabContent;