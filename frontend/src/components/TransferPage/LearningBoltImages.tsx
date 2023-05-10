import React, {useState} from 'react';
import {TransferLoaderType} from "../../_utils/Types";
import {TransferImageDetailContainer, TransferImagesDetailWrapper} from "./TransferTabComponents";
import {TransferImageGrid, TransferImageGridContainer} from "./TransferImageComponents";
import {CloseButton} from "../Modal/ModalComponents";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {Form} from "react-router-dom";

function LearningBoltImages({tabIndex, BoltImageLists, isDetailOpen, setIsDetailOpen}: {tabIndex: number, BoltImageLists: TransferLoaderType[],
  isDetailOpen: boolean, setIsDetailOpen: (arg: boolean) => void
}) {

  console.log(BoltImageLists);

  const [detailInfo, setDetailInfo] = useState<{imgUrl: string, originName: string}>({
    imgUrl: "",
    originName: "",
  })


  return (
    <Form style={{display: "flex", flexDirection: "column", height: "100%"}}>
      <label>전체 선택 <input type="checkbox" /></label>
      <TransferImagesDetailWrapper>

        <TransferImageGridContainer className={isDetailOpen? "active" : ""}>
          <TransferImageGrid className={isDetailOpen? "active" : ""}>이미지 띄울 곳</TransferImageGrid>
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