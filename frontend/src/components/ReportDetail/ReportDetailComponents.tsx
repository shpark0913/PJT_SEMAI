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