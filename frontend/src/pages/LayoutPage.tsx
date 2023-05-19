import NavBar from "../components/NavBar";
import Main from "../components/MainComponent";
import styled from "styled-components";
import {Outlet, redirect} from "react-router-dom";
import React from "react";
import {useAppSelector} from "../_hooks/hooks";

const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

function LayoutPage() {
  const token = useAppSelector(state => state.user.token);
  console.log(`token : ${token}`)
  if (token === "") {
    console.log("token없어요")
    window.location.pathname = '/login'
  }
  return (
    <Layout>
      <NavBar />
      <Main>
        <Outlet />
      </Main>
    </Layout>
  );
}

export default LayoutPage;
