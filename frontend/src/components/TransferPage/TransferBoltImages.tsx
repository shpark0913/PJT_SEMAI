import React from 'react';

import { TransferLoaderType } from "../../_utils/Types";
import ImageUrl from "../../_utils/ImageUrl";
import {setDetailInfo, setIsDetailOpen, setSelectedClass} from "../../_store/slices/transferPageSlice";
import {useAppDispatch, useAppSelector} from "../../_hooks/hooks";

import {TransferBoltImage, BoltImagesGrid, BoltImagesGridContainer} from "./styledComponents/BoltImageComponents";




function TransferBoltImages({ BoltImageList }: { BoltImageList: TransferLoaderType }) {

  const dispatch = useAppDispatch();
  const { isDetailOpen, status, selectedClass } = useAppSelector(state => state.transferPage);
  const selected = selectedClass[status]

  return (
    <BoltImagesGridContainer className={isDetailOpen? "active" : ""}>
      <BoltImagesGrid className={isDetailOpen? "active open" : "open"}>
        { BoltImageList.images.map((image) =>
            <TransferBoltImage key={`bolt_images-${image.fileId}`} >
              <label>
                <input type="checkbox" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.checked) {    // 선택이 된거면? 배열에 추가
                    const tmpList = [...selected];
                    tmpList.push(image)
                    dispatch(setSelectedClass({idx: status, list: tmpList}))
                  }
                  else {                     // 선택 해제라면 배열에서 삭제
                    const tmpList = [...selected];
                    const newTmpList = tmpList.filter(existed => existed.fileId !== image.fileId);
                    dispatch(setSelectedClass({idx: status, list: newTmpList}))
                  }
                }} checked={ !!selected.find(val => val.fileId === image.fileId) } />
                <img src={ImageUrl(image.imgUrl)} alt="bolt" />
              </label>
              <div onClick={() => {
                dispatch(setIsDetailOpen(true));
                dispatch(setDetailInfo({imgUrl: image.imgUrl, originName: image.originName, fileId: image.fileId}))
              }}>
                {image.originName}
              </div>
            </TransferBoltImage>
          )}
      </BoltImagesGrid>
    </BoltImagesGridContainer>
  );
}

export default TransferBoltImages;