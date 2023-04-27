import React from 'react';
import styled from "styled-components";
import Title from "../components/Title";
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
      <Title title="전이학습" />
      <TransferTab></TransferTab>
    </TransferSection>
  );
}

export default TransferPage;