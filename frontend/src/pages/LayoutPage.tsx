import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import React from "react";

function LayoutPage() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default LayoutPage;
