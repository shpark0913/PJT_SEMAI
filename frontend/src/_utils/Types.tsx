// ============== component types ================
import React from "react";

export type TitleProps = {
  title: string;
};
export type ButtonProps = {  // 버튼 컴포넌트 Props
  width?: string;
  height?: string;
}
export type LabelProps = {   // 레포트 페이지 - form 태그들의 label 컴포넌트
  theme: string;
}

// ==================== slice types ========================
export type TransferPageSliceType = {
  tabIndex: number,
  isDetailOpen: boolean,
  tabMenuList: string[],
  detailInfo: TransferBoltImageObject,
  isConfirmModalOpen: boolean,
  type: {
    preType: number,
    nextType: number
  }
}
export type ReportPageSliceType = {
  queryObj: {
    ohtSn: string,
    startDate: string,
    endDate: string,
    time: string,
    wheelPosition: string,
    page: string,
    descFlag: string,
    errorFlag: string,
  };
}


// ==================== Report page types ==================
export type ReportObjectType = {   // 디테일 페이지에 들어오는 값들의 type
  ohtSn?: string,
  boltGoodCount?: number,    // good은 양호
  wheelCheckDate: number[],
  wheelCheckId?: number,
  wheelPosition?: string,
  markingUrl?: string,
  originUrl?: string,
  boltOutCount?: number,     // out은 유실
  boltLoseCount?: number,    // lose는 파단
}
export type QueryType = {
  query: URLSearchParams,
}
export type ReportLoaderType = {
  result: ReportObjectType[],
  totalPage: number;
}
export type ReportTableProps = {   // 레포트 페이지의 테이블 중 모달 open
  handleModalOpen: (e :React.MouseEvent<HTMLTableRowElement>, wheelCheckId: number) => void;
}
export type ReportModalProps = {
  detailInfo: ReportObjectType;
  handleModalClose: () => void;
  scrollY: number;
}

// 전이학습 페이지 type
export type TransferBoltImageObject = {
  fileId: number,
  imgUrl: string,
  originName: string
}
export type TransferLoaderType = {
  images: TransferBoltImageObject[],
  status: number
}

export type ImageModalProps = {
  detailInfo: ModalImageType;
  handleModalClose: () => void;
}

export type ModalImageType = {
  imageUrl?: string;
  buttons?: JSX.Element;
}

/** 테마 토글 props */
export type ToggleThemeProps = {
  isDark: boolean;
  setIsDark: (theme: boolean) => void;
  dispatch: (toggleTheme: any) => void;
};
