import React, {useState} from 'react';

import { useAppSelector } from "../../_hooks/hooks";
import {TransferBoltImageObject, TransferLoaderType} from "../../_utils/Types";

import {
  TabContentFlex,
  TabContentContainer,
  TabContentMain,
} from "./styledComponents/TabContentComponents";
import TransferBoltImages from "./TransferBoltImages";
import LearningBoltImages from "./LearningBoltImages";
import ConfirmModal from "./ConfirmModal";
import TabContentInfo from "./TabContentInfo";
import BoltImageDetail from "./BoltImageDetail";

function TabContent({BoltImageLists, imageLengthList}: {BoltImageLists: TransferLoaderType[][], imageLengthList: number[]}) {

  const { isConfirmModalOpen, status} = useAppSelector(state => state.transferPage);

  const [selected, setSelected] = useState<TransferBoltImageObject[][]>([[], [], [], []]);

  return (
    <TabContentContainer>

      { isConfirmModalOpen ? <ConfirmModal /> : <></> }

      <TabContentFlex>
        <TabContentInfo BoltImageLists={BoltImageLists} imageLengthList={imageLengthList} />
        <TabContentMain>

          { status <= 2 ?
            <TransferBoltImages BoltImageList={BoltImageLists[0][status]} /> :
            <LearningBoltImages BoltImageLists={BoltImageLists[1]} imageLength={imageLengthList[3]} selected={selected[status]} setSelected={setSelected} />
          }
          <BoltImageDetail />

        </TabContentMain>
      </TabContentFlex>
    </TabContentContainer>
  );
}

export default TabContent;