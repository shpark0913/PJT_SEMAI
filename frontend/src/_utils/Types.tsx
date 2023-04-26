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

export type ReportTableProps = {   // 레포트 페이지의 테이블 중 모달 open
  handleModalOpen: (arg :DetailInfoType) => void;
}

export type DetailInfoType = {   // 디테일 페이지에 들어오는 값들의 type
  ohtSn?: string
}

export type DetailModalProps = {
  detailInfo: DetailInfoType;
  setIsModalOpen: (arg: boolean) => void;
}