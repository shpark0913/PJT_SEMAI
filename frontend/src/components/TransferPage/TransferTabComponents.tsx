import styled from "styled-components";

const TransferContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-grow: 1;
  height: 80%;
`;

const TransferImageContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 30px 20px 20px 30px;
  
  background-color: var(--section-color);
  border-radius: 0 10px 10px 10px;
  
  display: flex;
  flex-direction: column;
  
  & > * {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      //& > * {
      //  margin-right: 15px;
      //}
    }
  }
`

const TransferImagesDetailWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;
export const TransferImageDetailContainer = styled.div`
  display: none;
  padding-left: 30px;
  box-shadow: -15px 0 10px -10px var(--shadow-color);
  &.active {
    display: inline-block;
    grid-column: 6/9;
    width: 100%;
  }
`;

const NumberSpan = styled.span`
  font-size: 13px;
  color: var(--tab-span-font-color);
  background-color: var(--tab-span-color);
  border-radius: 20px;
  padding: 2px 7px;
  margin-left: 5px;
`;

export { TransferContainer, TransferImageContainer, TransferImagesDetailWrapper, NumberSpan }