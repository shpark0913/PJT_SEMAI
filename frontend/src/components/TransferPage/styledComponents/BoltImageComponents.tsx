import styled from "styled-components";

const BoltImagesGridContainer = styled.div`
  grid-column: 1/9;
  &.active {
    grid-column: 1/6;
  }
  overflow-y: auto;
  padding-right: 10px;
  width: 100%;
`;

const BoltImagesGrid = styled.div`
  display: none;
  width: 100%;

  grid-template-columns: repeat(8, 1fr);
  gap: 20px;
  
  &.open{
    display: grid;
  }
  &.active {
    grid-template-columns: repeat(5, 1fr);
  }
`

const TransferBoltImage = styled.div`
  width: 100%;
  //background-color: #e6e6e6;
  display: flex;
  flex-direction: column;
  position: relative;
  
  & img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    margin-bottom: 5px;
    cursor: pointer;
  }
  & div {
    word-break:break-word;
    font-size: 15px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  & > input[type="checkbox"] {
    position: absolute;
    top: 0;
    left: 0;
    margin: 5px 0 0 5px;
    width: 30px;
    height: 30px;
  }
`

export { BoltImagesGridContainer, BoltImagesGrid, TransferBoltImage }