import React, {useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../_hooks/hooks";
import {TransferBoltImageObject, TransferLoaderType} from "../../_utils/Types";
import ImageUrl from "../../_utils/ImageUrl";
import {setIsDetailOpen} from "../../_store/slices/transferPageSlice";

import {
  TabContentFlex,
  TabContentInfos,
  TabContentContainer,
  TabContentMain,
  BoltImageDetailContainer, BoltImageDetail, BoltImageDetailWrapper
} from "./styledComponents/TabContentComponents";
import TransferBoltImages from "./TransferBoltImages";
import LearningBoltImages from "./LearningBoltImages";
import TransferButtons from "./TransferButtons";
import {CloseButton} from "../Modal/ModalComponents";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
// import useConfirmModal from "../../_hooks/useConfirmModal";
import ConfirmModal from "./ConfirmModal";

function TabContent({BoltImageLists, imageLengthList}: {BoltImageLists: TransferLoaderType[][], imageLengthList: number[]}) {

  const dispatch = useAppDispatch();
  const { isConfirmModalOpen, isDetailOpen, status, detailInfo } = useAppSelector(state => state.transferPage);
  const { ConfirmTransferClassButton } = TransferButtons();
  const [selected, setSelected] = useState<TransferBoltImageObject[][]>([[], [], [], []]);

  return (
    <TabContentContainer>

      { isConfirmModalOpen ? <ConfirmModal selected={selected[status]} setSelected={setSelected} /> : <></> }

      <TabContentFlex>
        <TabContentInfos>
          <div>
            <label>전체 선택 <input type="checkbox"/></label>
            <div>{`현재 선택 : ${selected[status].length}/${imageLengthList[status]}`}</div>
          </div>
          <div> {ConfirmTransferClassButton(status)} </div>
        </TabContentInfos>
        <TabContentMain>
          { status < 3 ?
            <TransferBoltImages BoltImageLists={BoltImageLists[0]} selected={selected[status]} setSelected={setSelected} /> :
            <LearningBoltImages BoltImageLists={BoltImageLists[1]} imageLength={imageLengthList[3]} selected={selected[status]} setSelected={setSelected} />
          }
          <BoltImageDetailContainer className={isDetailOpen? "active" : ""}>
            <CloseButton onClick={() => dispatch(setIsDetailOpen(false))}><KeyboardDoubleArrowRightIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
            <BoltImageDetailWrapper>
              <BoltImageDetail src={ImageUrl(detailInfo.imgUrl)} alt="bolt detail"/>
              <div>{detailInfo.originName}</div>
            </BoltImageDetailWrapper>
          </BoltImageDetailContainer>

        </TabContentMain>
      </TabContentFlex>
    </TabContentContainer>
  );
}

export default TabContent;