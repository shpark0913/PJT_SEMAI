import styled from 'styled-components';

const ModalBackground = styled.div`
  width: 100%;
  height: calc(100% + var(--nav-height));
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 5, 10, 0.37);
  backdrop-filter: blur(5px);
  z-index: 1;
`;

const DetailContainer = styled.div`
  width: 70%;
  height: calc(100% + var(--nav-height));
  background-color: var(--background-color);
  box-shadow: -6px 0 23px 8px rgba(173, 173, 173, 0.25);
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  
  padding: 30px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: var(--emphasize-color);
  font-weight: bold;
  transition: background-color 100ms ease-out;
  
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  
  &:hover {
    background-color: rgba(128, 128, 128, 0.3);
  }
`
export { ModalBackground, DetailContainer, CloseButton }