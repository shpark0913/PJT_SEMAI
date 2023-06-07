import styled from "styled-components";

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

const ModalContainer = styled.div`
  width: 70%;
  min-width: 800px;
  height: 80vh;
  
  background-color: var(--background-color);
  box-shadow: -6px 0 23px 8px rgba(173, 173, 173, 0.25);
  padding: 30px 50px;
  border-radius: 10px;
  
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  display: flex;
  flex-direction: column;
`

export { Modal, ModalBackground, ModalReportContainer, ModalContainer }