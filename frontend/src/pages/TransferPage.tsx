import React from 'react';
import styled from "styled-components";

import TransferTab from "../components/TransferPage/TransferTab";

const TransferSection = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
`

function TransferPage() {
  return (
    <TransferSection>
      {/*{ isModalOpen && <ImageModal detailInfo={detailInfo} handleModalClose={handleModalClose} /> }*/}

      <TransferTab />
    </TransferSection>
  );
}

export default TransferPage;