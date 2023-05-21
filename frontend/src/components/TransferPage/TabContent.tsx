import React from 'react';

import { useAppSelector } from "../../_hooks/hooks";
import { TransferLoaderType } from "../../_utils/Types";

import {
  TabContentFlex,
  TabContentContainer,
  TabContentMain,
} from "./styles/TabContentComponents";
import TransferBoltImages from "./TransferBoltImages";
import LearningBoltImages from "./LearningBoltImages";
import ConfirmModal from "./ConfirmModal";
import TabContentInfo from "./TabContentInfo";
import BoltImageDetail from "./BoltImageDetail";

function TabContent({BoltImageLists, imageLengthList}: {BoltImageLists: TransferLoaderType[][], imageLengthList: number[]}) {

  const { isConfirmModalOpen, status} = useAppSelector(state => state.transferPage);

  return (
    <TabContentContainer>

      { isConfirmModalOpen ? <ConfirmModal /> : <></> }

      <TabContentFlex>
        <TabContentInfo BoltImageLists={BoltImageLists} imageLengthList={imageLengthList} />
        <TabContentMain>

          { status <= 2 ?
            <TransferBoltImages BoltImageList={BoltImageLists[0][status]} /> :
            <LearningBoltImages BoltImageLists={BoltImageLists[1]} />
          }
          <BoltImageDetail />

        </TabContentMain>
      </TabContentFlex>
    </TabContentContainer>
  );
}

export default TabContent;