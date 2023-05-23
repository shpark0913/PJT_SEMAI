import styled from "styled-components";

export const TransferMenuContainer = styled.menu`
  padding: 0;
  margin: 0;
  width: 150px;
  flex-shrink: 0;
`;

export const TabMenuLi = styled.li`
  padding: 12px 20px;
  background-color: var(--tab-menu-color);
  text-align: center;
  margin-bottom: 5px;
  border-radius: 100px 0 0 100px;

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
  
  &.isActive {
    background-color: var(--section-color);
    color: var(--emphasize-color);
    font-weight: bold;
    & > span {
      background-color: var(--tab-span-color);
    }
  }
`;

export const LengthSpan = styled.span`
  font-size: 13px;
  color: var(--tab-span-font-color);
  background-color: var(--gray400-color);
  border-radius: 20px;
  padding: 2px 7px;
  margin-left: 5px;
  
  &.isActive {
    background-color: var(--tab-span-color);
  }
`;