import { EventSourcePolyfill } from "event-source-polyfill";
import { createBrowserHistory } from "history";
import styled from "styled-components";

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

  const sse = new EventSourcePolyfill(`${BASE_URL}dashboard`, {
    headers: {
      accesstoken: token,
    },
  });

  sse.addEventListener("dashboard", event => {
    dashboardData = JSON.parse(event.data);
    console.log("으아아아아악");
    redirect(`${dashboardData[0].ohtCheckId}`);
    window.location.reload();
  });

  return null;
}

const MainGrid = styled.section`
  display: grid;
  width: 100%;
  height: calc(100vh - 60px);
  grid-template-rows: 34% 34% 32%;
  grid-template-columns: 70% 30%;
`;

function DashboardPage() {
  return <MainGrid></MainGrid>;
}

export default DashboardPage;
