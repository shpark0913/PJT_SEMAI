import NavBar from "../components/NavBar";
import Main from "../components/MainComponent";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import React from "react";

const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

function LayoutPage() {
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
