import React, {useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../_hooks/hooks";
import {TransferBoltImageObject, TransferLoaderType} from "../../_utils/Types";
import ImageUrl from "../../_utils/ImageUrl";
import {setIsDetailOpen} from "../../_store/slices/transferPageSlice";

import { TabContentFlex,
  TabContentInfos,
  TabContentContainer,
  TabContentMain,
  BoltImageDetailContainer } from "./TabContentComponents";
import TransferBoltImages from "./TransferBoltImages";
import LearningBoltImages from "./LearningBoltImages";
import TransferButtons from "./TransferButtons";
import {CloseButton} from "../Modal/ModalComponents";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

function TabContent({BoltImageLists, imageLengthList}: {BoltImageLists: TransferLoaderType[][], imageLengthList: number[]}) {
  const dispatch = useAppDispatch();
  const { ConfirmModal, OpenConfirmModal, TransferClassButton, TransferLearningButton, DeleteImagesButton } = TransferButtons();
  const { isDetailOpen, tabIndex, detailInfo } = useAppSelector(state => state.transferPage);
  const [selected, setSelected] = useState<TransferBoltImageObject[][]>([[], [], [], []]);

  const OpenButtonLists: JSX.Element[] = [
    selected[0].length ?
      <>
        { OpenConfirmModal(1) }
        { OpenConfirmModal(2) }
        { OpenConfirmModal(3) }
        { OpenConfirmModal(4) }
      </> : <></>,
  ];

  const ButtonLists: JSX.Element[] = [
    selected[0].length ?
      <>
        { TransferClassButton(0, 1, selected[0].map(d => d.fileId)) }
        { TransferClassButton(0, 2, selected[0].map(d => d.fileId)) }
        { TransferLearningButton(selected[0].map(d => d.fileId)) }
        { DeleteImagesButton(0, selected[0], setSelected) }
      </> : <></>,
    selected[1].length ?
      <>
        { TransferClassButton(1, 0, selected[1].map(d => d.fileId)) }
        { TransferClassButton(1, 2, selected[1].map(d => d.fileId)) }
        { TransferLearningButton(selected[1].map(d => d.fileId)) }
        { DeleteImagesButton(1, selected[1], setSelected) }
      </> : <></>,
    selected[2].length ?
      <>
        { TransferClassButton(2, 0, selected[2].map(d => d.fileId)) }
        { TransferClassButton(2, 1, selected[2].map(d => d.fileId)) }
        { TransferLearningButton(selected[2].map(d => d.fileId)) }
        { DeleteImagesButton(2, selected[2], setSelected) }
      </> : <></>,
    selected[3].length ?
      <>
        { TransferLearningButton(selected[3].map(d => d.fileId)) }
        { DeleteImagesButton(3, selected[3], setSelected) }
      </> : <></>,
  ];

  return (
    <TabContentContainer>
      <TabContentFlex>
        <TabContentInfos>
          <div>
            <label>전체 선택 <input type="checkbox"/></label>
            <div>{`현재 선택 : ${selected[tabIndex].length}/${imageLengthList[tabIndex]}`}</div>
          </div>
          <div>{ ButtonLists[tabIndex] }</div>
        </TabContentInfos>
        <TabContentMain>
          { tabIndex < 3 ?
            <TransferBoltImages BoltImageLists={BoltImageLists[0]} selected={selected[tabIndex]} setSelected={setSelected} /> :
            <LearningBoltImages BoltImageLists={BoltImageLists[1]} imageLength={imageLengthList[3]} selected={selected[tabIndex]} setSelected={setSelected} />
          }
          <BoltImageDetailContainer className={isDetailOpen? "active" : ""}>
            <CloseButton onClick={() => dispatch(setIsDetailOpen(false))}><KeyboardDoubleArrowRightIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
            <img src={ImageUrl(detailInfo.imgUrl)} alt="bolt detail"/>
            <div>{detailInfo.originName}</div>
          </BoltImageDetailContainer>

        </TabContentMain>
      </TabContentFlex>
    </TabContentContainer>
  );
}

export default TabContent;