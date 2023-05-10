import React, {useState} from 'react';
import {TransferImageDetailContainer, TransferImagesDetailWrapper} from "./TransferTabComponents";
import {TransferBoltImage, TransferImageGrid, TransferImageGridContainer} from "./TransferImageComponents";
import {Form} from "react-router-dom";
import {Button, RedButton, SemesButton} from "../ButtonComponents";
import {TransferBoltImageObject, TransferLoaderType} from "../../_utils/Types";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {CloseButton} from "../Modal/ModalComponents";

function TransferBoltImages({tabIndex, BoltImageLists, isDetailOpen, setIsDetailOpen}:
                              { tabIndex: number,
                                BoltImageLists: TransferLoaderType[],
                                isDetailOpen: boolean,
                                setIsDetailOpen: (arg: boolean) => void }) {

  const ButtonLists: JSX.Element[] = [<>
    <Button>유실로 이동</Button>
    <Button>풀림으로 이동</Button>
    <SemesButton>학습으로 이동</SemesButton>
    <RedButton>삭제하기</RedButton>
  </>, <>
    <Button>양호로 이동</Button>
    <Button>풀림으로 이동</Button>
    <SemesButton>학습으로 이동</SemesButton>
    <RedButton>삭제하기</RedButton>
  </>, <>
    <Button>양호로 이동</Button>
    <Button>유실로 이동</Button>
    <SemesButton>학습으로 이동</SemesButton>
    <RedButton>삭제하기</RedButton>
  </>, <>
    <Button>양호로 이동</Button>
    <Button>유실로 이동</Button>
    <Button>풀림으로 이동</Button>
    <RedButton>삭제하기</RedButton>
  </>];
  const BoltImageElement = BoltImageLists.map((status) =>
        <> {
          status.images.map((image) =>
            <TransferBoltImage key={`bolt_images-${image.fileId}`}><img src={image.imgUrl} alt="bolt" />
              <div onClick={() => {
                setIsDetailOpen(true);
                setDetailInfo({imgUrl: image.imgUrl, originName: image.originName, fileId: image.fileId})
              } }>
                {image.originName}
              </div>
            </TransferBoltImage>
          )
        } </>
  )

  const [detailInfo, setDetailInfo] = useState<TransferBoltImageObject>({
    imgUrl: "",
    originName: "",
    fileId: 0
  })

  return (
    <Form style={{display: "flex", flexDirection: "column", height: "100%"}}>
      <label>전체 선택 <input type="checkbox" /></label>
      <TransferImagesDetailWrapper>
        <TransferImageGridContainer className={isDetailOpen? "active" : ""}>
          <TransferImageGrid className={isDetailOpen? "active" : ""}>{BoltImageElement[tabIndex]}</TransferImageGrid>
        </TransferImageGridContainer>
        <TransferImageDetailContainer className={isDetailOpen? "active" : ""}>
          <CloseButton onClick={() => setIsDetailOpen(false)}><KeyboardDoubleArrowRightIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
          <img src={detailInfo.imgUrl} alt="bolt detail"/>
          <div>{detailInfo.originName}</div>
        </TransferImageDetailContainer>
      </TransferImagesDetailWrapper>
      <div>
        { ButtonLists[tabIndex] }
        <div>현재 선택 : 1/100</div>
      </div>
    </Form>
  );
}

export default TransferBoltImages;