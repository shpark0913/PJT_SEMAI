import styled from 'styled-components';
import {ButtonProps} from "../_utils/Types";


const Button = styled.button<ButtonProps>`
  background: linear-gradient(to right bottom, var(--gray800-color), var(--gray600-color));
  width: ${props => props.width? props.width : "100px"};
  height: ${props => props.height? props.height : "30px"};
  border: 1px solid var(--gray600-color);
  border-radius: 7px;
  position: relative;
  
  &:hover::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 0;
    left: 0;
  }
`

const RedButton = styled(Button)`
  background: linear-gradient(to right bottom, var(--danger-color-light), var(--danger-color));
  border: 1px solid var(--danger-color);
  color: #FCFCFC;
`

export { Button, RedButton }
