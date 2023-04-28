import styled from 'styled-components';

const Modal = styled.div< {scrollY?: number}>`
  height: 100vh;
  width: 100%;
  position: absolute;
  top: ${props => props.scrollY? props.scrollY +'px' : 0 };
  left: 0;
  z-index: 1;
`

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 5, 10, 0.37);
  backdrop-filter: blur(5px);
  z-index: 1;
`;

const ModalReportContainer = styled.div`
  width: 70%;
  min-width: 800px;
  height: 100%;
  background-color: var(--background-color);
  box-shadow: -6px 0 23px 8px rgba(173, 173, 173, 0.25);
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  padding: 30px 50px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: var(--emphasize-color);
  font-weight: bold;
  font-size: 20px;
  transition: background-color 100ms ease-out;
  
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 25px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background-color: rgba(128, 128, 128, 0.3);
  }
`

const ModalImageContainer = styled.div`
  width: 70%;
  min-width: 800px;
  height: 80vh;
  background-color: var(--background-color);
  box-shadow: -6px 0 23px 8px rgba(173, 173, 173, 0.25);
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px 50px;
  border-radius: 10px;
`

export { Modal, ModalBackground, ModalReportContainer, ModalImageContainer, CloseButton }