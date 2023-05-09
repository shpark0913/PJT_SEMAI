import React, { useState } from 'react';
import { TransferImage, TransferImageGrid, TransferImageGridContainer } from "./TransferImageComponents";
import {
  TransferContainer,
  TransferMenuContainer,
  TransferImageContainer,
  TransferImagesDetailWrapper, TransferImageDetailContainer
} from "./TransferTabComponents"
import { Button, RedButton, SemesButton } from "../ButtonComponents";
import { TransferLoaderType } from "../../_utils/Types";
import {Form, useRouteLoaderData} from "react-router-dom";


const TransferTab = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  let BoltImageLists = useRouteLoaderData("transfer") as TransferLoaderType[];

  const TabMenuList = ['양호', '유실', '풀림', '모호'];
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

  const tabComponent = BoltImageLists.map((status) => {
    return {
      menu: TabMenuList[status.status],
      content:
        <> {
        status.images.map((image) =>
          <TransferImage key={`bolt_images-${image.fileId}`}><img src={image.imgUrl} alt="bolt" />
            <div onClick={() => setIsDetailOpen(true) }>
              {image.originName}
            </div>
          </TransferImage>
        )
        } </>,
      counts: status.images.length,
    }
  })

  return (
    <TransferContainer>

      <TransferMenuContainer>
        { tabComponent.map((tab, idx) =>
          <li
            key={`transfer-tab-menu-${idx}`}
            className={idx === tabIdx ? "isActive" : "" }
            onClick={ () => setTabIdx(idx) }
          >
            {tab.menu} <span>{tab.counts}</span>
          </li>
        ) }
      </TransferMenuContainer>

      <TransferImageContainer>
        <Form style={{display: "flex", flexDirection: "column", height: "100%"}}>
          <label>전체 선택 <input type="checkbox" /></label>
          <TransferImagesDetailWrapper>
            <TransferImageGridContainer className={isDetailOpen? "active" : ""}>
              <TransferImageGrid className={isDetailOpen? "active" : ""}>{tabComponent[tabIdx].content}</TransferImageGrid>
            </TransferImageGridContainer>
            <TransferImageDetailContainer className={isDetailOpen? "active" : ""}>
              이미지 미리보기 영역
            </TransferImageDetailContainer>
          </TransferImagesDetailWrapper>
          <div>
            { ButtonList[tabIdx] }
            <div>현재 선택 : 1/100</div>
          </div>
        </Form>
      </TransferImageContainer>
    </TransferContainer>
  );
}

export default TransferTab;