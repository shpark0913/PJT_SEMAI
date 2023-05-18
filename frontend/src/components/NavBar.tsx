import { DarkMode, LightMode } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { RootState, persistor } from "../_store/store";
import { useDispatch, useSelector } from "react-redux";

import BuildIcon from "@mui/icons-material/Build";
import { Checkbox } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import { Switch } from "@mui/joy";
import { ToggleThemeProps } from "../_utils/Types";
import { styled as muistyled } from "@mui/system";
import styled from "styled-components";
import { toggleTheme } from "../_store/slices/themeSlice";
import { useAppSelector } from "../_hooks/hooks";
import useDate from "../_hooks/useDate";
import {toast} from "react-toastify";

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

const StyledMenu = muistyled(Menu)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
`;

const CenteredMenuItem = muistyled(MenuItem)`
  && {
    display: flex;
    width: 120px;
    align-items: center;
    justify-content: space-around;
    transition: 'none !important'
  }
`;

const NavLeftDiv = styled.div``;

const NavRightDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > * {
    margin-right: 20px;
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
  color: #3d9eff;
  font-weight: bold;
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

function NavBar() {
  let [isDark, setIsDark] = useState(
    useSelector((state: RootState) => state.theme.theme === "dark"),
  );
  let { todayFormat } = useDate();
  let TodayDate = todayFormat();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useAppSelector(state => state.user.userName);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Nav>
      <NavLeftDiv>
        <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/">
          대시보드
        </NavLink>
        <NavLink
          to={`/report?ohtSn=ALL&startDate=${TodayDate}&endDate=${TodayDate}&time=ALL&wheelPosition=ALL&page=1&errorFlag=0&descFlag=1`}
        >
          레포트
        </NavLink>
        <NavLink to="/transfer">전이학습</NavLink>
        <NavLink to="/predict">AI 분석</NavLink>
      </NavLeftDiv>

      <NavRightDiv>
        <button onClick={() => toast('🦄 Wow so easy!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })}>테스트</button>
        <Profile>
          {userName} <span style={{ fontSize: "15px", fontWeight: "normal" }}>님</span>
        </Profile>

        <button
          style={{ backgroundColor: "transparent", display: "flex" }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <SettingsIcon
            sx={{
              color: "var(--emphasize-color)",
              transform: anchorEl ? "rotate(45deg)" : "none",
              transition: "transform 0.3s ease-in-out",
            }}
          />
        </button>
        <StyledMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <CenteredMenuItem>
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
          </CenteredMenuItem>
          <CenteredMenuItem>
            <BuildIcon sx={{ width: "21px", color: "#003870", fontWeight: "100" }} />
            <span
              style={{
                marginLeft: "3px",
                color: "#003870",
                fontWeight: "bold",
              }}
            >
              풀림
            </span>
            <Checkbox size="small" sx={{ padding: "0" }} />
          </CenteredMenuItem>
          <CenteredMenuItem>
            <LogoutButton
              aria-label="logout"
              style={{ color: "#003870" }}
              onClick={() => {
                persistor.purge();
                navigate("/login");
              }}
            >
              <LogoutIcon />
              <span style={{ marginLeft: "5px" }}>로그아웃</span>
            </LogoutButton>
          </CenteredMenuItem>
        </StyledMenu>
      </NavRightDiv>
    </Nav>
  );
}

export default NavBar;
