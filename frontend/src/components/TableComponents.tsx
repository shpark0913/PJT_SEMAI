import styled from "styled-components";

type TRType = {
  NG?: number;
};

const TableContainer = styled.div`
  margin-bottom: 10px;
  width: 100%;
  
  min-width: 950px;
  overflow-y: auto;
  flex-grow: 1;
  flex-shrink: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  &.detail {
    border-left: 3px solid var(--emphasize-color);
    & tr:last-of-type th {
      border-bottom: none;
    }

    & th {
      width: 25%;
    }
    & td {
      text-align: left;
      padding-left: 20px;
    }
  }
`;

const THead = styled.thead`
  border-top: 3px solid var(--emphasize-color);
  border-bottom: 1px solid var(--emphasize-color);
`;

const THeadMain = styled.thead`
  position: sticky;
  z-index: 2;
  top: 0;
  width: 100%;
  &::before {
    content: "";
    position: absolute;
    top: -3px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: var(--emphasize-color);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
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

const TR = styled.tr<TRType>`
  height: 35px;
  background-color: ${props => (props.NG ? "rgba(255, 255, 10, 0.6)" : "none")};
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

export { TableContainer, Table, THead, TBody, TFoot, TR, TH, TD, THeadMain };
