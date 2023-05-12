import React, {useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../_hooks/hooks";
import {TransferBoltImageObject, TransferLoaderType} from "../../_utils/Types";
import ImageUrl from "../../_utils/ImageUrl";
import {setIsDetailOpen} from "../../_store/slices/transferPageSlice";

import {BoltImageDetailContainer, TabContentContainer, TabContentMain} from "./TransferTabComponents";
import TransferBoltImages from "./TransferBoltImages";
import LearningBoltImages from "./LearningBoltImages";
import TransferButtons from "./TransferButtons";
import {TabContentFlex, TabContentInfos} from "./TabContentComponents";
import {CloseButton} from "../Modal/ModalComponents";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

function TabContent({BoltImageLists, imageLengthList}: {BoltImageLists: TransferLoaderType[][], imageLengthList: number[]}) {
  const dispatch = useAppDispatch();
  const { isDetailOpen, tabIndex, detailInfo } = useAppSelector(state => state.transferPage);

  // const [selectGood, setSelectGood] = useState<TransferBoltImageObject[]>([]);
  // const [selectLose, setSelectLose] = useState<TransferBoltImageObject[]>([]);
  // const [selectBreak, setSelectBreak] = useState<TransferBoltImageObject[]>([]);
  // const [selectLearn, setSelectLearn] = useState<TransferBoltImageObject[]>([]);

  const [selected, setSelected] = useState<TransferBoltImageObject[][]>([[], [], [], []]);

  const { TransferClassButton, TransferLearningButton, DeleteImagesButton } = TransferButtons();
  const ButtonLists: JSX.Element[] = [
    selected[0].length ?
      <>
        { TransferClassButton(0, 1, selected[0].map(d => d.fileId)) }
        { TransferClassButton(0, 2, selected[0].map(d => d.fileId)) }
        { TransferLearningButton(selected[0].map(d => d.fileId)) }
        { DeleteImagesButton(selected[0].map(d => d.fileId)) }
      </> : <></>,
    selected[1].length ?
      <>
        { TransferClassButton(1, 0, selected[1].map(d => d.fileId)) }
        { TransferClassButton(1, 2, selected[1].map(d => d.fileId)) }
        { TransferLearningButton(selected[1].map(d => d.fileId)) }
        { DeleteImagesButton(selected[1].map(d => d.fileId)) }
      </> : <></>,
    selected[2].length ?
      <>
        { TransferClassButton(2, 0, selected[2].map(d => d.fileId)) }
        { TransferClassButton(2, 1, selected[2].map(d => d.fileId)) }
        { TransferLearningButton(selected[2].map(d => d.fileId)) }
        { DeleteImagesButton(selected[2].map(d => d.fileId)) }
      </> : <></>,
    selected[3].length ?
      <>
        { TransferLearningButton(selected[3].map(d => d.fileId)) }
        { DeleteImagesButton(selected[3].map(d => d.fileId)) }
      </> : <></>,
  // <>
  //   { selected[1].length && TransferClassButton(1, 0, selected[1].map(d => d.fileId)) }
  //   { selected[1].length && TransferClassButton(1, 2, selected[1].map(d => d.fileId)) }
  //   { selected[1].length && TransferLearningButton(selected[1].map(d => d.fileId)) }
  //   { selected[1].length && DeleteImagesButton(selected[1].map(d => d.fileId)) }
  // </>, <>
  //   { selected[2].length && TransferClassButton(2, 0, selected[2].map(d => d.fileId)) }
  //   { selected[2].length && TransferClassButton(2, 1, selected[2].map(d => d.fileId)) }
  //   { selected[2].length && TransferLearningButton(selected[2].map(d => d.fileId)) }
  //   { selected[2].length && DeleteImagesButton(selected[2].map(d => d.fileId)) }
  // </>, <>
  //   { selected[2].length && TransferLearningButton(selected[2].map(d => d.fileId)) }
  //   { selected[2].length && DeleteImagesButton(selected[2].map(d => d.fileId)) }
  // </>
  ];

  // const ButtonLists: JSX.Element[] = [
  //   selectGood.length ?
  //     <>
  //       { TransferClassButton(0, 1, selectGood.map(d => d.fileId)) }
  //       { TransferClassButton(0, 2, selectGood.map(d => d.fileId)) }
  //       { TransferLearningButton(selectGood.map(d => d.fileId)) }
  //       { DeleteImagesButton(selectGood.map(d => d.fileId)) }
  //     </> : <></>,
  //   selectLose.length ?
  //     <>
  //       { TransferClassButton(1, 0, selectLose.map(d => d.fileId)) }
  //       { TransferClassButton(1, 2, selectLose.map(d => d.fileId)) }
  //       { TransferLearningButton(selectLose.map(d => d.fileId)) }
  //       { DeleteImagesButton(selectLose.map(d => d.fileId)) }
  //     </> : <></>,
  //   selectBreak.length ?
  //     <>
  //       { TransferClassButton(2, 0, selectLose.map(d => d.fileId)) }
  //       { TransferClassButton(2, 1, selectLose.map(d => d.fileId)) }
  //       { TransferLearningButton(selectBreak.map(d => d.fileId)) }
  //       { DeleteImagesButton(selectBreak.map(d => d.fileId)) }
  //     </> : <></>,
  //   selectLearn.length ?
  //     <>
  //       { TransferLearningButton(selectLearn.map(d => d.fileId)) }
  //       { DeleteImagesButton(selectLearn.map(d => d.fileId)) }
  //     </> : <></>,
  //   // <>
  //   //   { selected[1].length && TransferClassButton(1, 0, selected[1].map(d => d.fileId)) }
  //   //   { selected[1].length && TransferClassButton(1, 2, selected[1].map(d => d.fileId)) }
  //   //   { selected[1].length && TransferLearningButton(selected[1].map(d => d.fileId)) }
  //   //   { selected[1].length && DeleteImagesButton(selected[1].map(d => d.fileId)) }
  //   // </>, <>
  //   //   { selected[2].length && TransferClassButton(2, 0, selected[2].map(d => d.fileId)) }
  //   //   { selected[2].length && TransferClassButton(2, 1, selected[2].map(d => d.fileId)) }
  //   //   { selected[2].length && TransferLearningButton(selected[2].map(d => d.fileId)) }
  //   //   { selected[2].length && DeleteImagesButton(selected[2].map(d => d.fileId)) }
  //   // </>, <>
  //   //   { selected[2].length && TransferLearningButton(selected[2].map(d => d.fileId)) }
  //   //   { selected[2].length && DeleteImagesButton(selected[2].map(d => d.fileId)) }
  //   // </>
  // ];

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
      {/*{ tabIndex < 3 ?*/}
      {/*  <TransferBoltImages BoltImageLists={BoltImageLists[0]} /> :*/}
      {/*  <LearningBoltImages BoltImageLists={BoltImageLists[0]} imageLength={imageLength} />*/}
      {/*}*/}
    </TabContentContainer>
  );
}

export default TabContent;