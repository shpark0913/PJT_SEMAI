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
  // const [selected, setSelected] = useState<TransferBoltImageObject[][]>([[], [], []]);

  // const { TransferClassButton, TransferLearningButton, DeleteImagesButton } = TransferButtons();
  // const ButtonLists: JSX.Element[] = [<>
  //   { selected[0].length ? TransferClassButton(0, 1, selected[0].map(d => d.fileId)) : null }
  //   { selected[0].length && TransferClassButton(0, 2, selected[0].map(d => d.fileId)) }
  //   { selected[0].length && TransferLearningButton(selected[0].map(d => d.fileId)) }
  //   { selected[0].length && DeleteImagesButton(selected[0].map(d => d.fileId)) }
  // </>, <>
  //   { selected[1].length && TransferClassButton(1, 0, selected[1].map(d => d.fileId)) }
  //   { selected[1].length && TransferClassButton(1, 2, selected[1].map(d => d.fileId)) }
  //   { selected[1].length && TransferLearningButton(selected[1].map(d => d.fileId)) }
  //   { selected[1].length && DeleteImagesButton(selected[1].map(d => d.fileId)) }
  // </>, <>
  //   { selected[2].length && TransferClassButton(2, 0, selected[2].map(d => d.fileId)) }
  //   { selected[2].length && TransferClassButton(2, 1, selected[2].map(d => d.fileId)) }
  //   { selected[2].length && TransferLearningButton(selected[2].map(d => d.fileId)) }
  //   { selected[2].length && DeleteImagesButton(selected[2].map(d => d.fileId)) }
  // </>];

  const BoltImageElement = BoltImageLists.map((data) =>
        <>
          {data.images.map((image) =>
            <TransferBoltImage key={`bolt_images-${image.fileId}`} >
              <label>
                <input type="checkbox" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  console.log(e.target.checked);
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
    // <TabContentFlex>
    //   <TabContentInfos>
    //     <div>
    //       <label>전체 선택 <input type="checkbox"  /></label>
    //       <div>{`현재 선택 : ${selected[tabIndex].length}/${BoltImageLists[tabIndex].images.length}`}</div>
    //     </div>
    //     <div>{ ButtonLists[tabIndex] }</div>
    //   </TabContentInfos>
    //   <TabContentMain>
    //     <BoltImagesGridContainer className={isDetailOpen? "active" : ""}>
    //       <BoltImagesGrid className={isDetailOpen? "active open" : "open"}>
    //         {BoltImageElement[tabIndex]}
    //       </BoltImagesGrid>
    //     </BoltImagesGridContainer>
    //     <BoltImageDetailContainer className={isDetailOpen? "active" : ""}>
    //       <CloseButton onClick={() => dispatch(setIsDetailOpen(false))}><KeyboardDoubleArrowRightIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
    //       <img src={ImageUrl(detailInfo.imgUrl)} alt="bolt detail"/>
    //       <div>{detailInfo.originName}</div>
    //     </BoltImageDetailContainer>
    //   </TabContentMain>
    // </TabContentFlex>
  );
}

export default TransferBoltImages;