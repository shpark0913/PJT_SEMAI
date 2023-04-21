import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const THead = styled.thead`
  border-top: 3px solid var(--emphasize-color);
  border-bottom: 1px solid var(--emphasize-color);
`;

const TBody = styled.tbody`
  text-align: center;
`;

const TFoot = styled.tfoot`
  border-top: 1px solid var(--emphasize-color);
  border-bottom: 3px solid var(--emphasize-color);
  background-color: var(--background-dark-color);
`;

const TR = styled.tr`
  height: 30px;
`;

const TH = styled.th`
  background-color: var(--background-dark-color);
  border-right: 1px solid var(--emphasize-color);
  border-bottom: 1px solid var(--emphasize-color);
  &:nth-last-of-type(1) {
    border-right: none;
  }
  &.idxNum {
    width: 40px;
    border-right: 1px solid var(--emphasize-color);
  }
`;

const TD = styled.td`
  border-right: 1px solid var(--gray600-color);
  border-bottom: 1px solid var(--gray600-color);
  &:nth-last-of-type(1) {
    border-right: none;
  }
`

export { Table, THead, TBody, TFoot, TR, TH, TD }
