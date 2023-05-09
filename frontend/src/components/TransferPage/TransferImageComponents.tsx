import styled from "styled-components";

const TransferImageGridContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
  width: 100%;
`;

const TransferImageGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`

const TransferImage = styled.div`
  width: 100%;
  //background-color: #e6e6e6;
  display: flex;
  flex-direction: column;
  
  & > img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    margin-bottom: 5px;
    cursor: pointer;
  }
  & > div {
    word-break:break-word;
    font-size: 15px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`

export { TransferImageGridContainer, TransferImageGrid, TransferImage }