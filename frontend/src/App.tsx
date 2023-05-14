import { BoltImageListsLoader, ReportListsLoader } from "./_utils/Loader";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import GlobalStyle from "./components/globalStyle";
import LayoutPage from "./pages/LayoutPage";
import LoginPage from "./pages/LoginPage";
import PredictPage from "./pages/PredictPage";
import React from "react";
import ReportPage from "./pages/ReportPage";
import { TransferBoltImageAction } from "./_utils/Action";
import TransferPage from "./pages/TransferPage";
import ErrorPage from "./pages/ErrorPage";

import { store } from "./_store/store";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LayoutPage />} errorElement={<ErrorPage />}>
        <Route index element={<DashboardPage />} />

        <Route path="report" element={<ReportPage />} id="reportLists" loader={ReportListsLoader} />

        <Route
          path="transfer"
          id="transfer"
          element={<TransferPage />}
          loader={BoltImageListsLoader}
          action={TransferBoltImageAction}
        />

        <Route path="predict" id="predict" element={<PredictPage />} />
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
