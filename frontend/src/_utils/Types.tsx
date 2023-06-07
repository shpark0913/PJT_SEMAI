// ============== component types ================
export type TitleProps = {
  title: string;
};
export type ButtonProps = {
  // 버튼 컴포넌트 Props
  width?: string;
  height?: string;
};
export type LabelProps = {
  // 레포트 페이지 - form 태그들의 label 컴포넌트
  theme: string;
};

// ==================== slice types ========================
export type TransferPageSliceType = {
  status: number;
  statusNameList: string[];
  detailInfo: TransferBoltImageObject;
  isDetailOpen: boolean;
  isConfirmModalOpen: boolean;
  type: {
    preType: number;
    nextType: number;
  };
  selectedClass: TransferBoltImageObject[][];
  selectedTrain: TransferBoltImageObject[][];
};
export type ReportPageSliceType = {
  queryObj: {
    ohtSn: string;
    startDate: string;
    endDate: string;
    time: string;
    wheelPosition: string;
    page: string;
    descFlag: string;
    errorFlag: string;
  }
};

export type ReportDetailSliceType = {
  reportDetail: ReportObjectType;
  isDetailOpen: boolean
}

// ==================== Report page types ==================
export type ReportObjectType = {
  // 디테일 페이지에 들어오는 값들의 type
  ohtSn: string;
  boltGoodCount: number; // 양호
  boltOutCount: number;  // 유실
  boltLoseCount: number; // 파단
  totalGoodCount: number,   // 이번 달 양호 볼트
  totalOutCount: number,    // 이번 달 유실 볼트
  totalLoseCount: number,   // 이번 달 파단 볼트
  totalLooseCount: number,  // 이번 달 풀림 볼트
  wheelCheckDate: number[];
  wheelCheckId: number;
  wheelPosition: string;
  markingUrl: string;
  originUrl: string;
};

export type ReportLoaderType = {
  result: ReportObjectType[];
  totalPage: number;
};

// ================ transfer page props ===================
export type TransferBoltImageObject = {
  fileId: number;
  imgUrl: string;
  originName: string;
};
export type TransferLoaderType = {
  images: TransferBoltImageObject[];
  status: number;
};

export type ImageModalProps = {
  detailInfo: ModalImageType;
  handleModalClose: () => void;
};

export type ModalImageType = {
  imageUrl?: string;
  buttons?: JSX.Element;
};

/** 테마 토글 props */
export type ToggleThemeProps = {
  isDark: boolean;
  setIsDark: (theme: boolean) => void;
  dispatch: (toggleTheme: any) => void;
};