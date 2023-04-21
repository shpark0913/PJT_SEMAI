import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import styled from "styled-components";

type ToggleThemeProps = {
  theme: string;
  setTheme: (theme: string) => void;
};

/** 테마 변경, 추후 toggle 버튼으로 바꿀 예정 */
function handleToggleTheme({ theme, setTheme }: ToggleThemeProps) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    setTheme("light");
  } else {
    // light 모드
    document.documentElement.setAttribute("data-theme", "dark");
    setTheme("dark");
  }
}

const Nav = styled.nav`
  height: var(--nav-height);
  display: flex;
  flex-shrink: 0;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 18px;
  border-bottom: 1px solid var(--emphasize-color);
  & a {
    margin-right: 30px;
    font-weight: bold;
    
    &.active {
      color: var(--emphasize-color);
    }
  }
  
  & button {
    background-color: transparent;
    color: var(--check-color);
    font-size: 20px;
  }
`;

function NavBar() {
  let [theme, setTheme] = useState("dark");

  return (
    <Nav>
      <NavLink className={({isActive}) => isActive? "active" : ""} to="/">대시보드</NavLink>
      <NavLink to="/report">레포트</NavLink>
      <NavLink to="/transfer">전이학습</NavLink>
      <NavLink to="/login">로그인</NavLink>
      <button onClick={(): void => handleToggleTheme({ theme, setTheme })}>☢</button>
    </Nav>
  );
}

export default NavBar;
