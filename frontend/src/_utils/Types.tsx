export type TitleProps = {
  title: string;
};

export type ButtonProps = {
  width?: string;
  height?: string;
}

export type LabelProps = {
  theme: string;
}

export type ReportTableProps = {
  handleModalOpen: (arg :DetailInfoType) => void;
}

export type DetailInfoType = {
  ohtSn?: string
}

export type DetailModalProps = {
  detailInfo: DetailInfoType;
  setIsModalOpen: (arg: boolean) => void;
}