import React, { useState } from 'react';
import styled from "styled-components";
import { TransferImage, TransferImageGrid, TransferImageGridContainer } from "./TransferImageComponents";
import { Button, RedButton, SemesButton } from "../ButtonComponents";
import { TransferLoaderType, TransferTabProps} from "../../_utils/Types";
import { useRouteLoaderData} from "react-router-dom";

const TransferTabContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-grow: 1;
  height: 80%;
`;

const TransferMenuContainer = styled.menu`
  padding: 0;
  margin: 0;
  width: 150px;
  flex-shrink: 0;
  
  & > li {
    padding: 12px 20px;
    background-color: var(--tab-menu-color);
    text-align: center;
    margin-bottom: 5px;
    border-radius: 100px 0 0 100px;
    & > span {
      font-size: 13px;
      color: var(--tab-span-font-color);
      background-color: var(--gray400-color);
      border-radius: 20px;
      padding: 2px 7px;
      margin-left: 5px;
    }
    &:hover {
      cursor: pointer;
    }
  }
  
  & >li.isActive {
    background-color: var(--section-color);
    color: var(--emphasize-color);
    font-weight: bold;

    & > span {
      background-color: var(--tab-span-color);
    }
  }
`

const TransferImageContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 30px 20px 20px 30px;
  
  background-color: var(--section-color);
  border-radius: 0 10px 10px 10px;
  
  display: flex;
  flex-direction: column;
  
  & > * {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      & > * {
        margin-right: 15px;
      }
    }
  }
`

const TransferTab = ({handleModalOpen}: TransferTabProps) => {
  const [tabIdx, setTabIdx] = useState(0);

  let BoltImageLists = useRouteLoaderData("transfer") as TransferLoaderType[];
  console.log(BoltImageLists);

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
            <div onClick={() => handleModalOpen(
            {
              imageUrl: image.imgUrl,
              buttons: ButtonList[status.status],
            })}>
              {image.originName}
            </div>
          </TransferImage>
        )
        } </>,
      counts: status.images.length,
    }
  })
  // const tabComponent = [
  //   {
  //     menu: '양호',
  //     content:
  //       <>
  //         <TransferImage><img src="https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1" /><div onClick={() => handleModalOpen(
  //           {
  //                 imageUrl: "https://res.cloudinary.com/rsc/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F0190355-01?pgw=1",
  //                 buttons: <>
  //                   <Button>유실로 이동</Button>
  //                   <Button>풀림으로 이동</Button>
  //                   <SemesButton>학습으로 이동</SemesButton>
  //                   <RedButton>삭제하기</RedButton>
  //                 </>,
  //               })}>안녕</div>
  //         </TransferImage>
  //       </>,
  //     buttons:
  //       <>
  //         <Button>유실로 이동</Button>
  //         <Button>풀림으로 이동</Button>
  //         <SemesButton>학습으로 이동</SemesButton>
  //         <RedButton>삭제하기</RedButton>
  //       </>
  //   },
  //   {
  //     menu: '유실',
  //     content: <div>유실이미지</div>,
  //     buttons:
  //       ,
  //   },
  //   {
  //     menu: '풀림',
  //     content: <div>풀림이미지</div>,
  //     buttons:
  //       ,
  //   },
  //   {
  //     menu: '모호',
  //     content: <div>모호이미지</div>,
  //     buttons:
  //       ,
  //   },
  //   {
  //     menu: '학습',
  //     content: <div>학습이미지</div>,
  //     buttons:
  //       <>
  //         <SemesButton>모델 학습하기</SemesButton>
  //         <RedButton>삭제하기</RedButton>
  //       </>,
  //   },
  // ]

  return (
    <TransferTabContainer>
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
        <label>전체 선택 <input type="checkbox" /></label>
        <TransferImageGridContainer>
          <TransferImageGrid>{tabComponent[tabIdx].content}</TransferImageGrid>
        </TransferImageGridContainer>
        <div>
          { ButtonList[tabIdx] }
          <div>현재 선택 : 1/100</div>
        </div>
      </TransferImageContainer>
    </TransferTabContainer>
  );
}

export default TransferTab;