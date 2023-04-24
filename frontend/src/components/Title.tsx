import { TitleProps } from "../_utils/Types";
import { ReactComponent as TitleRect } from "../assets/TitleRect.svg";
import styled from "styled-components";

const TitleH1 = styled.h1`
  color: var(--emphasize-color);
  background-color: var(--background-color);
  display: flex;
  align-items: center;
`;

function Title({ title }: TitleProps) {
  return (
    <TitleH1>
      <TitleRect fill="var(--emphasize-color)" style={{ marginRight: "5px" }} /> {title}
    </TitleH1>
  );
}

export default Title;
