import { DarkMode, LightMode } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from '../index';

import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { RootState } from "../_store/store";
import { Switch } from "@mui/joy";
import styled from "styled-components";
import { toggleTheme } from "../_store/slices/themeSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../_hooks/hooks";

type ToggleThemeProps = {
  isDark: boolean;
  setIsDark: (theme: boolean) => void;
  dispatch: (toggleTheme: any) => void;
};

const Nav = styled.nav`
  height: var(--nav-height);
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
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
`;

const NavLeftDiv = styled.div``;

const NavRightDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > * {
    margin-right: 30px;
  }
  & > *:last-child {
    margin-right: 0;
  }
`;

const Profile = styled.div`
  font-weight: bold;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: var(--emphasize-color);
`;

function handleToggleTheme({ isDark, setIsDark, dispatch }: ToggleThemeProps) {
  if (isDark) {
    document.documentElement.setAttribute("data-theme", "light");
    dispatch(toggleTheme("light"));
    setIsDark(false);
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    dispatch(toggleTheme("dark"));
    setIsDark(true);
  }
}

let today = new Date();
let year = String(today.getFullYear());
let month = String(today.getMonth() + 1).padStart(2, "0");
let day = String(today.getDate()).padStart(2, "0");
let TodayDate = `${year}-${month}-${day}`;

function NavBar() {
  let [isDark, setIsDark] = useState(
    useSelector((state: RootState) => state.theme.theme === "dark"),
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useAppSelector(state => state.user.userName);

  return (
    <Nav>
      <NavLeftDiv>
        <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/">
          대시보드
        </NavLink>
        <NavLink to={`/report?ohtSn=ALL&date=${TodayDate}&time=ALL&wheelPosition=ALL&page=1`}>
          레포트
        </NavLink>
        <NavLink to="/transfer">전이학습</NavLink>
      </NavLeftDiv>

      <NavRightDiv>
        <Profile>
          {userName}{" "}
          <span style={{ fontSize: "15px", fontWeight: "normal" }}>님</span>
        </Profile>
        <Switch
          checked={isDark}
          onChange={(): void => handleToggleTheme({ isDark, setIsDark, dispatch })}
          slotProps={{
            input: { "aria-label": "Dark mode" },
            thumb: {
              children: isDark ? (
                <DarkMode sx={{ fontSize: "20px" }} />
              ) : (
                <LightMode sx={{ fontSize: "20px" }} />
              ),
            },
          }}
          size="sm"
          color={isDark ? "primary" : "neutral"}
          sx={{
            "--Switch-thumbSize": "25px",
          }}
        />
        <LogoutButton
          aria-label="logout"
          onClick={ event => {
            persistor.purge();
            navigate("/login");
          }}
        >
          <LogoutIcon />
        </LogoutButton>
      </NavRightDiv>
    </Nav>
  );
}

export default NavBar;
