import React, {useState} from 'react';
import styled from "styled-components";

import { TransferLoaderType } from "../../_utils/Types";
import ImageUrl from "../../_utils/ImageUrl";
import {useAppDispatch, useAppSelector} from "../../_hooks/hooks";
import {
  setDetailInfo,
  setIsDetailOpen,
  setSelectedTrain
} from "../../_store/slices/transferPageSlice";

import {TransferBoltImage, BoltImagesGrid, BoltImagesGridContainer} from "./styles/BoltImageComponents";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ClassName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  
  &:hover {
    cursor: pointer;
  }
  & > h1 {
    margin-bottom: 0;
    margin-right: 5px;
  }
  &~hr {
    border: 0.5px solid var(--background-color);
    margin: 15px 0;
    &:last-of-type {
      display: none;
    }
  }
`

const NumberSpan = styled.span`
  font-size: 13px;
  color: var(--tab-span-font-color);
  background-color: var(--tab-span-color);
  border-radius: 20px;
  padding: 2px 7px;
  margin-left: 5px;
`;

function LearningBoltImages({BoltImageLists}: { BoltImageLists: TransferLoaderType[] }) {

  const dispatch = useAppDispatch();
  const { isDetailOpen, statusNameList, selectedTrain } = useAppSelector(state => state.transferPage);
  const [isTabOpen, setIsTabOpen] = useState<boolean[]>([true, true, true]);

  const styleFunc = (status: number): React.CSSProperties => {
    return {
      width: "24px",
      fill: "var(--emphasize-color)",
      transition: "transform 200ms ease-in",
      transform: isTabOpen[status] ? "rotate(0)" : "rotate(-90deg)",
    }
  }

  return (
    <BoltImagesGridContainer className={isDetailOpen? "active" : ""}>
      { BoltImageLists.map((data) =>
        <>
          {/* 클래스 이름.. */}
          <ClassName key={`bolt-images_by-class-${statusNameList[data.status]}`} onClick={() => {
            setIsTabOpen(prev => {
              let newList = [...prev];
              newList[data.status] = !newList[data.status];
              return [...newList]
            });
          }}>
            <ExpandMoreIcon sx={styleFunc(data.status)} />
            <h1>
              {statusNameList[data.status]}
            </h1>
            <NumberSpan>{data.images.length}</NumberSpan>
          </ClassName>

          <BoltImagesGrid className={`${isDetailOpen? "active" : ""} ${isTabOpen[data.status] ? "open" : ""}`}>
            { data.images.map((image) =>
              <TransferBoltImage key={`bolt_images_learn-${image.fileId}`} >
                <label>
                  <input type="checkbox" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    console.log(e.target.checked);
                    if (e.target.checked) {
                      const tmpList = [...selectedTrain[data.status]];
                      tmpList.push(image)
                      dispatch(setSelectedTrain({idx: data.status, list: tmpList}))
                    }
                    else {
                      const tmpList = [...selectedTrain[data.status]];
                      const newTmpList = tmpList.filter(existed => existed.fileId !== image.fileId);
                      dispatch(setSelectedTrain({idx: data.status, list: newTmpList}))
                    }
                  }} checked={ !!selectedTrain[data.status].find(val => val.fileId === image.fileId) } />
                  <img src={ImageUrl(image.imgUrl)} alt="bolt" />
                </label>

                <div onClick={() => {
                  dispatch(setIsDetailOpen(true));
                  dispatch(setDetailInfo({imgUrl: image.imgUrl, originName: image.originName, fileId: image.fileId}))
                } }>
                  {image.originName}
                </div>
              </TransferBoltImage>
            )}
          </BoltImagesGrid>
          <hr />

        </>)
      }
    </BoltImagesGridContainer>
  );
}

export default LearningBoltImages;