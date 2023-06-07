import "react-toastify/dist/ReactToastify.css";

import { BoltImageListsLoader, ReportListsLoader } from "./_utils/Loader";
import PredictPage, { loader as PredictLoader } from "./pages/PredictPage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./pages/ErrorPage";
import GlobalStyle from "./components/globalStyle";
import LayoutPage from "./pages/LayoutPage";
import LoginPage from "./pages/LoginPage";
import React from "react";
import ReportPage from "./pages/ReportPage";
import { ToastContainer } from "react-toastify";
import { TransferBoltImageAction } from "./_utils/Action";
import TransferPage from "./pages/TransferPage";
import { store } from "./_store/store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LayoutPage />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
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
          <Route path="predict" id="predict" element={<PredictPage />} loader={PredictLoader} />
        </Route>
      </Route>
    </Route>,
  ),
);

function App() {
  const theme = store.getState().theme.theme;
  document.documentElement.setAttribute("data-theme", theme ? theme : "dark");

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme={theme}
      />
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
