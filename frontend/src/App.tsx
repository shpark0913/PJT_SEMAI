import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {BoltImageListsLoader, ReportDetailLoader, ReportListsLoader} from "./_utils/Loader";
import { ReportListsAction, TransferTestAction } from "./_utils/Action";
import { store } from "./_store/store";

import GlobalStyle from "./components/globalStyle";
import DashboardPage from "./pages/DashboardPage";
import LayoutPage from "./pages/LayoutPage";
import LoginPage from "./pages/LoginPage";
import ReportPage from "./pages/ReportPage";
import TransferPage from "./pages/TransferPage";
import ReportDetailPage from "./pages/ReportDetailPage";

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
          action={ReportListsAction}
        >
          <Route
            path=":wheelCheckId"
            element={ <ReportDetailPage /> }
            loader={ReportDetailLoader}
          />
        </Route>

        <Route
          path="transfer"
          element={<TransferPage />}
          loader={BoltImageListsLoader}
          action={TransferTestAction}
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
