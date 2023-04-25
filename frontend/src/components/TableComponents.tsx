import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  min-width: 950px;
  overflow-y: auto;
  flex-grow: 1;
  flex-shrink: 0;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const THead = styled.thead`
  border-top: solid var(--emphasize-color);
  border-top-width: 3px;
  border-bottom: 1px solid var(--emphasize-color);
`;

const THeadMain = styled.thead`
  position: sticky;
  top: 0;
  width: 100%;
  &::before {
    content: "";
    position: absolute;
    top: -3px;
    left: 0px;
    right: 0px;
    height: 3px;
    background-color: var(--emphasize-color);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0px;
    right: 0px;
    height: 1px;
    background-color: var(--emphasize-color);
  }
`;

const TBody = styled.tbody`
  text-align: center;

  & td {
    border-right: 1px solid var(--gray600-color);
    border-bottom: 1px solid var(--gray600-color);
  }
  & tr:last-child td {
    border-bottom: none;
  }
`;

const TFoot = styled.tfoot`
  text-align: center;
  border-top: 1px solid var(--emphasize-color);
  border-bottom: 3px solid var(--emphasize-color);
  background-color: var(--background-dark-color);
`;

const TR = styled.tr`
  height: 35px;
`;

const TH = styled.th`
  background-color: var(--background-dark-color);
  border-right: 1px solid var(--emphasize-color);
  border-bottom: 1px solid var(--emphasize-color);
  color: var(--emphasize-color);

  &:nth-last-of-type(1) {
    border-right: none;
  }

  &.idxNum {
    width: 40px;
    border-right: 1px solid var(--emphasize-color);
  }
`;

const TD = styled.td`
  &:nth-last-of-type(1) {
    border-right: none;
  }
`;

export { TableContainer, Table, THead, TBody, TFoot, TR, TH, TD }
