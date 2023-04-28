import React, {useCallback, useState} from 'react';
import styled from "styled-components";
import Title from "../components/Title";
import TransferTab from "../components/TransferPage/TransferTab";
import { ModalImageType } from "../_utils/Types";
import {useBodyScrollLock} from "../_hooks/useBodyScrollLock";
import ImageModal from "../components/DetailModal/ImageModal";

const TransferSection = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
`

function TransferPage() {
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  let [scrollY, setScrollY] = useState<number>(0);
  let [detailInfo, setDetailInfo] = useState<ModalImageType>({});        // 선택한 레포트의 상세내역을 전달할 객체
  const { lockScroll, openScroll } = useBodyScrollLock();

  /** 모달이 열리면 실행되는 함수 */
  const handleModalOpen = useCallback((detailInfo: ModalImageType) => {
    setScrollY(window.scrollY);
    setIsModalOpen(true);
    setDetailInfo(detailInfo);
    lockScroll();
  }, [lockScroll])

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setDetailInfo({});
    openScroll();
  }, [openScroll]);

  return (
    <TransferSection>
      { isModalOpen && <ImageModal detailInfo={detailInfo} handleModalClose={handleModalClose} /> }

      <Title title="전이학습" />
      <TransferTab handleModalOpen={handleModalOpen}></TransferTab>
    </TransferSection>
  );
}

export default TransferPage;