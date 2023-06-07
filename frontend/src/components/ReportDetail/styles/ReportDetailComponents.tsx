import styled from "styled-components";

export const BlurBackground = styled.div<{ scrollY: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: ${props => props.scrollY + "px"};
  left: 0;
  background: rgba(0, 5, 10, 0.37);
  backdrop-filter: blur(5px);
  z-index: 1;
`;

export const ReportDetailContainer = styled.div`
  background-color: var(--background-color);
  position: absolute;
  top: 0;
  right: 0;
  width: 800px;
  height: 100%;
  padding: 30px;
  overflow-y: auto;
  transition: width 600ms ease, transform 600ms ease, box-shadow 600ms ease;
  z-index: 100;

  &.open {
    transform: translateX(0);
    box-shadow: -15px 0 10px -10px var(--shadow-color);
  }
  &.close {
    transform: translateX(200%);
    box-shadow: none;
  }

  display: flex;
  flex-direction: column;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  color: var(--emphasize-color);
  font-weight: bold;
  font-size: 20px;
  transition: background-color 100ms ease-out;
  
  width: 40px;
  height: 40px;
  border-radius: 50%;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background-color: var(--shadow-color);
  }
`;