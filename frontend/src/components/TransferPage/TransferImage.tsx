import React, {useState} from 'react';
import {TransferImageDetailContainer, TransferImagesDetailWrapper} from "./TransferTabComponents";
import {TransferBoltImage, TransferImageGrid, TransferImageGridContainer} from "./TransferImageComponents";
import {Form} from "react-router-dom";
import {Button, RedButton, SemesButton} from "../ButtonComponents";
import {TransferLoaderType} from "../../_utils/Types";

function TransferImage({tabIndex, BoltImageLists}: {tabIndex: number, BoltImageLists: TransferLoaderType[] }) {
  console.log(BoltImageLists)
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const tabComponent = BoltImageLists.map((status) => {
    return {
      content:
        <> {
          status.images.map((image) =>
            <TransferBoltImage key={`bolt_images-${image.fileId}`}><img src={image.imgUrl} alt="bolt" />
              <div onClick={() => setIsDetailOpen(true) }>
                {image.originName}
              </div>
            </TransferBoltImage>
          )
        } </>
    }
  })

  const ButtonList: JSX.Element[] = [<>
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

  return (
    <Form style={{display: "flex", flexDirection: "column", height: "100%"}}>
      <label>전체 선택 <input type="checkbox" /></label>
      <TransferImagesDetailWrapper>
        <TransferImageGridContainer className={isDetailOpen? "active" : ""}>
          <TransferImageGrid className={isDetailOpen? "active" : ""}>{tabComponent[tabIndex].content}</TransferImageGrid>
        </TransferImageGridContainer>
        <TransferImageDetailContainer className={isDetailOpen? "active" : ""}>
          이미지 미리보기 영역
        </TransferImageDetailContainer>
      </TransferImagesDetailWrapper>
      <div>
        { ButtonList[tabIndex] }
        <div>현재 선택 : 1/100</div>
      </div>
    </Form>
  );
}

export default TransferImage;