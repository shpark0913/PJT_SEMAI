import React from 'react';
import {TransferContentContainer} from "./TransferTabComponents";
import TransferBoltImages from "./TransferBoltImages";
import LearningBoltImages from "./LearningBoltImages";
import {useAppSelector} from "../../_hooks/hooks";
import {TransferLoaderType} from "../../_utils/Types";

function TabContent({BoltImageLists, ImageLength}: {BoltImageLists: TransferLoaderType[][], ImageLength: number}) {
  const { tabIndex } = useAppSelector(state => state.transferPage);

  return (
    <TransferContentContainer>
      { tabIndex < 3 ?
        <TransferBoltImages BoltImageLists={BoltImageLists[0]} /> :
        <LearningBoltImages BoltImageLists={BoltImageLists[0]} ImageLength={ImageLength} />
      }
    </TransferContentContainer>
  );
}

export default TabContent;