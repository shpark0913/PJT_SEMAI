import React from 'react';

import {TransferBoltImageObject, TransferLoaderType} from "../../_utils/Types";
import ImageUrl from "../../_utils/ImageUrl";
import {setDetailInfo, setIsDetailOpen} from "../../_store/slices/transferPageSlice";
import {useAppDispatch, useAppSelector} from "../../_hooks/hooks";

import {TransferBoltImage, BoltImagesGrid, BoltImagesGridContainer} from "./TransferImageComponents";




function TransferBoltImages({BoltImageLists, selected, setSelected}: 
                              { BoltImageLists: TransferLoaderType[],
                                selected: TransferBoltImageObject[],
                                setSelected: React.Dispatch<React.SetStateAction<TransferBoltImageObject[][]>>
                              }) {

  const dispatch = useAppDispatch();
  const { isDetailOpen, tabIndex } = useAppSelector(state => state.transferPage);

  const BoltImageElement = BoltImageLists.map((data) =>
        <>
          {data.images.map((image) =>
            <TransferBoltImage key={`bolt_images-${image.fileId}`} >
              <label>
                <input type="checkbox" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.checked) {
                    setSelected(prev => {
                      const tmp = [...prev];
                      tmp[data.status] = [...tmp[data.status], image];
                      return tmp;
                    })
                  }
                  else {
                    setSelected(prev => {
                      const tmp = [...prev];
                      tmp[data.status] = tmp[data.status].filter((tmpData) => tmpData.fileId !== image.fileId);
                      return tmp;
                    })
                  }
                }} checked={ !!selected.find(val => val.fileId === image.fileId) } />
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
        </>
  )


  return (
    <BoltImagesGridContainer className={isDetailOpen? "active" : ""}>
      <BoltImagesGrid className={isDetailOpen? "active open" : "open"}>
        {BoltImageElement[tabIndex]}
      </BoltImagesGrid>
    </BoltImagesGridContainer>
  );
}

export default TransferBoltImages;