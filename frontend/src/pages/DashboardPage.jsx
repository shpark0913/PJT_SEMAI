import Axios from "../_utils/Axios";
import { EventSourcePolyfill } from "event-source-polyfill";
import OHTAllResult from "../components/DashboardPage/OHTAllResult";
import OHTCheck from "../components/DashboardPage/OHTCheck";
import OHTResult from "../components/DashboardPage/OHTResult";
import OHTTransition from "../components/DashboardPage/OHTTransition";
import { createBrowserHistory } from "history";
import styled from "styled-components";
import { useLoaderData } from "react-router";

export const history = createBrowserHistory();

export function redirect(path) {
  history.push(path);
}

export async function loader(history) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  let dashboardData;
  const persistRoot = localStorage.getItem("persist:root");
  const store = persistRoot ? JSON.parse(persistRoot) : "";
  const token = JSON.parse(store.user)?.token || "";

  async function fetchData() {
    const sse = new EventSourcePolyfill(`${BASE_URL}dashboard`, {
      headers: {
        accesstoken: token,
      },
    });
    const response = await new Promise(resolve => {
      sse.addEventListener("dashboard", event => {
        dashboardData = JSON.parse(event.data);
        resolve(dashboardData);
      });
    });
    return response;
  }

  async function getData() {
    const data = await fetchData();
    const response = await Axios.get(`${BASE_URL}dashboard/main/${data[0].ohtCheckId}`);
    return [response.data.data];
  }

  const result = await getData();
  const wheelData = result[0];
  return [wheelData];
}

const MainGrid = styled.section`
  display: grid;
  width: 100%;
  height: calc(100vh - 60px);
  grid-template-rows: 34% 34% 32%;
  grid-template-columns: 70% 30%;
`;

function DashboardPage() {
  const wheelData = useLoaderData();
  return (
    <MainGrid>
      <OHTResult data={wheelData[0]} />
      <OHTCheck />
      <OHTTransition />
      <OHTAllResult />
    </MainGrid>
  );
}

export default DashboardPage;
