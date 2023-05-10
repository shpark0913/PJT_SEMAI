import React, {useState} from 'react';
import {TransferBoltImageObject, TransferLoaderType} from "../../_utils/Types";
import {TransferImageDetailContainer, TransferImagesDetailWrapper} from "./TransferTabComponents";
import {TransferBoltImage, TransferImageGrid, TransferImageGridContainer} from "./TransferImageComponents";
import {CloseButton} from "../Modal/ModalComponents";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {Form} from "react-router-dom";
import Title from "../Title";

function LearningBoltImages({tabIndex, BoltImageLists, isDetailOpen, setIsDetailOpen, TabMenuList}:
                              { tabIndex: number,
                                BoltImageLists: TransferLoaderType[],
                                isDetailOpen: boolean,
                                setIsDetailOpen: (arg: boolean) => void,
                                TabMenuList: string[] }) {

  const [detailInfo, setDetailInfo] = useState<TransferBoltImageObject>({
    imgUrl: "",
    originName: "",
    fileId: 0
  })

  console.log(BoltImageLists)
  const BoltImageElement = BoltImageLists.map((data) =>
    <>
      <Title title={TabMenuList[data.status]} />
      <TransferImageGrid className={isDetailOpen? "active" : ""}>{ data.images.map((image) =>
        <TransferBoltImage key={`bolt_images-${image.fileId}`}>
          <img src={image.imgUrl} alt="bolt" />
          <div onClick={() => {
            setIsDetailOpen(true);
            setDetailInfo({imgUrl: image.imgUrl, originName: image.originName, fileId: image.fileId})
          }}
          >
            {image.originName}
          </div>
        </TransferBoltImage> )
      }</TransferImageGrid>

    </>
  )

  console.log(BoltImageElement);


  return (
    <Form style={{display: "flex", flexDirection: "column", height: "100%"}}>
      <label>전체 선택 <input type="checkbox" /></label>
      <TransferImagesDetailWrapper>

        <TransferImageGridContainer className={isDetailOpen? "active" : ""}>
          {/*<TransferImageGrid className={isDetailOpen? "active" : ""}>{BoltImageElement}</TransferImageGrid>*/}
          { BoltImageElement }
        </TransferImageGridContainer>
        <TransferImageDetailContainer className={isDetailOpen? "active" : ""}>
          <CloseButton onClick={() => setIsDetailOpen(false)}><KeyboardDoubleArrowRightIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
          <img src={detailInfo.imgUrl} alt="bolt detail"/>
          <div>{detailInfo.originName}</div>
        </TransferImageDetailContainer>
      </TransferImagesDetailWrapper>
      <div>
        {/*{ ButtonList[tabIndex] }*/}
        {/*<div>현재 선택 : 1/100</div>*/}
      </div>
    </Form>
  );
}

export default LearningBoltImages;