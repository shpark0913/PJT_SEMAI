import React, { useState } from 'react';
import { Link } from "react-router-dom";

type ToggleThemeProps = {
  theme: string,
  setTheme: (theme: string)=> void,
}

/** 테마 변경, 추후 toggle 버튼으로 바꿀 예정 */
function handleToggleTheme ({theme, setTheme}: ToggleThemeProps) {
  if (theme === 'dark') {
    document.documentElement.setAttribute("data-theme", "light");
    setTheme("light");
  } else {
    // light 모드
    document.documentElement.setAttribute("data-theme", "dark");
    setTheme("dark");
  }
}

function NavBar() {
  let [theme, setTheme] = useState("dark");

  return (
    <nav>
      <Link to='/'>대시보드</Link>
      <Link to='/report'>레포트</Link>
      <Link to='/transfer'>전이학습</Link>
      <Link to='/login'>로그인</Link>
      <button onClick={():void => handleToggleTheme({theme, setTheme})}>테마 토글</button>
    </nav>
  );
}

export default NavBar;