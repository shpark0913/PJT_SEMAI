import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import GlobalStyle from "./components/globalStyle";
import LayoutPage from "./pages/LayoutPage";
import LoginPage from "./pages/LoginPage";
import ReportPage from "./pages/ReportPage";
import TransferPage from "./pages/TransferPage";
import { store } from "./_store/store";

import DashboardPage, { loader as DashboardLoader } from "./pages/DashboardPage";
import {BoltImageListsLoader, ReportListsLoader} from "./_utils/Loader";
import {ReportListsAction} from "./pages/ReportPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LayoutPage />}>
        <Route index element={<DashboardPage />} loader={DashboardLoader} />
        <Route path="report" element={<ReportPage />} id="reportLists" loader={ReportListsLoader} action={ReportListsAction} />
        <Route path="report/:id" />
        <Route path="transfer" element={<TransferPage />} loader={BoltImageListsLoader} />
      </Route>
    </Route>,
  ),
);

function App() {
  const theme = store.getState().theme.theme;
  document.documentElement.setAttribute("data-theme", theme ? theme : "dark");

  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
