import { BoltImageListsLoader, ReportListsLoader } from "./_utils/Loader";
import DashboardPage, { loader as DashboardLoader } from "./pages/DashboardPage";
import DashboardPage2, { loader as DashboardLoader2 } from "./pages/DashboardPage2";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import GlobalStyle from "./components/globalStyle";
import LayoutPage from "./pages/LayoutPage";
import LoginPage from "./pages/LoginPage";
import React from "react";
import ReportPage from "./pages/ReportPage";
import TransferPage from "./pages/TransferPage";
import { store } from "./_store/store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LayoutPage />}>
        <Route index element={<DashboardPage />} loader={DashboardLoader} />
        <Route path=":checkId" element={<DashboardPage2 />} loader={DashboardLoader2} />
        <Route path="report" element={<ReportPage />} loader={ReportListsLoader} />
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
