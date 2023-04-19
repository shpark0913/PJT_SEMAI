import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import GlobalStyle from "./components/globalStyle";

import LoginPage from "./pages/LoginPage";
import LayoutPage from "./pages/LayoutPage";
import DashboardPage from "./pages/DashboardPage";
import ReportPage from "./pages/ReportPage";
import TransferPage from "./pages/TransferPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={ <LoginPage /> }/>
      <Route path="/" element={ <LayoutPage /> }>
        <Route index element={ <DashboardPage /> } />
        <Route path="report" element={ <ReportPage /> } />
        <Route path="report/:id"  />
        <Route path="transfer" element={ <TransferPage /> } />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
