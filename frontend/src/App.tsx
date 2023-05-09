import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { BoltImageListsLoader,  ReportListsLoader } from "./_utils/Loader";
import { TransferBoltImageAction } from "./_utils/Action";
import { store } from "./_store/store";

import GlobalStyle from "./components/globalStyle";
import DashboardPage from "./pages/DashboardPage";
import LayoutPage from "./pages/LayoutPage";
import LoginPage from "./pages/LoginPage";
import ReportPage from "./pages/ReportPage";
import TransferPage from "./pages/TransferPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LayoutPage />}>
        <Route index element={<DashboardPage />} />

        <Route
          path="report"
          element={<ReportPage />}
          id="reportLists"
          loader={ReportListsLoader}
        />

        <Route
          path="transfer"
          id="transfer"
          element={<TransferPage />}
          loader={BoltImageListsLoader}
          action={TransferBoltImageAction}
        />
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
