import React, {useState} from 'react';
import {TransferBoltImageObject, TransferLoaderType} from "../../_utils/Types";
import {NumberSpan, TransferImageDetailContainer, TransferImagesDetailWrapper} from "./TransferTabComponents";
import {TransferBoltImage, TransferImageGrid, TransferImageGridContainer} from "./TransferImageComponents";
import {CloseButton} from "../Modal/ModalComponents";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import styled from "styled-components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageUrl from "../../_utils/ImageUrl";

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
function LearningBoltImages({BoltImageLists, isDetailOpen, setIsDetailOpen, TabMenuList}:
                              { BoltImageLists: TransferLoaderType[],
                                isDetailOpen: boolean,
                                setIsDetailOpen: (arg: boolean) => void,
                                TabMenuList: string[] }) {

  const [isTabOpen, setIsTabOpen] = useState<boolean[]>([false, false, false]);
  const [detailInfo, setDetailInfo] = useState<TransferBoltImageObject>({
    imgUrl: "",
    originName: "",
    fileId: 0
  })

  const styleFunc = (status: number): React.CSSProperties => {
    return {
      width: "24px",
      fill: "var(--emphasize-color)",
      transition: "transform 200ms ease-in",
      transform: isTabOpen[status] ? "rotate(0)" : "rotate(-90deg)",
    }
  }

  console.log(BoltImageLists)
  const BoltImageElement = BoltImageLists.map((data) =>
    <>
      {/* 클래스 이름.. */}
      <ClassName onClick={() => {
        setIsTabOpen(prev => {
          let newList = [...prev];
          newList[data.status] = !newList[data.status];
          return [...newList]
        });
      }}>
        <ExpandMoreIcon sx={styleFunc(data.status)} />
        <h1>
          {TabMenuList[data.status]}
        </h1>
        <NumberSpan>{data.images.length}</NumberSpan>
      </ClassName>

      {/* 클래스별 이미지 */}
      {/*<TransferImageGrid className={isDetailOpen?*/}
      {/*  isTabOpen[data.status]? "active open" : "active"*/}
      {/*  : isTabOpen[data.status]? "open" : "" }>*/}
      <TransferImageGrid className={`${isDetailOpen? "active" : ""} ${isTabOpen[data.status] ? "open" : ""}`}>
        { data.images.map((image) =>
        <TransferBoltImage key={`bolt_images-${image.fileId}`}>
          <img src={ImageUrl(image.imgUrl)} alt="bolt" />
          <div onClick={() => {
            setIsDetailOpen(true);
            setDetailInfo({imgUrl: image.imgUrl, originName: image.originName, fileId: image.fileId})
          }}
          >
          {image.originName}
          </div>
        </TransferBoltImage> )}
      </TransferImageGrid>
      <hr />

    </>
  )

  console.log(BoltImageElement);


  return (
    <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
      <label>전체 선택 <input type="checkbox" /></label>
      <TransferImagesDetailWrapper>

        <TransferImageGridContainer className={isDetailOpen? "active" : ""}>
          { BoltImageElement }
        </TransferImageGridContainer>
        <TransferImageDetailContainer className={isDetailOpen? "active" : ""}>
          <CloseButton onClick={() => setIsDetailOpen(false)}><KeyboardDoubleArrowRightIcon sx={{height: "35px", width: "35px"}} /></CloseButton>
          <img src={ImageUrl(detailInfo.imgUrl)} alt="bolt detail"/>
          <div>{detailInfo.originName}</div>
        </TransferImageDetailContainer>
      </TransferImagesDetailWrapper>
      <div>
        {/*{ ButtonList[tabIndex] }*/}
        {/*<div>현재 선택 : 1/100</div>*/}
      </div>
    </div>
  );
}

export default LearningBoltImages;