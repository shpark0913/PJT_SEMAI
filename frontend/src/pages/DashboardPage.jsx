import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Axios from "../_utils/Axios";
import { EventSourcePolyfill } from "event-source-polyfill";
import OHTAllResult from "../components/DashboardPage/OHTAllResult";
import OHTCheck from "../components/DashboardPage/OHTCheck";
import OHTResult from "../components/DashboardPage/OHTResult";
import OHTTransition from "../components/DashboardPage/OHTTransition";
import { setCheckId } from "../_store/slices/dashboardSlice";
import styled from "styled-components";
import { useLoaderData } from "react-router-dom";

export async function loader() {
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
        console.log("SSE_dashboard 작동");
        dashboardData = JSON.parse(event.data);
        resolve(dashboardData);
      });
    });
    return response;
  }

  let newOHTCheckId;
  fetchData().then(response => {
    newOHTCheckId = response[0].ohtCheckId;
  });

  return [newOHTCheckId];
}

const MainGrid = styled.section`
  display: grid;
  width: 100%;
  height: calc(100vh - 60px);
  grid-template-rows: 34% 34% 32%;
  grid-template-columns: 70% 30%;
`;

function DashboardPage() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();

  console.log(
    "넘어오나?",
    useSelector(state => state.dashboard),
  );

  // SSE의 최상단 검사 ID (최신)
  const newOHTCheckId = useLoaderData();
  console.log("========newOHTCheckID========", newOHTCheckId);
  dispatch(setCheckId(newOHTCheckId));

  // 특정 ohtCheckId로 조회한 정보 (휠 4개의 상태)
  const [wheelDataNew, setWheelDataNew] = useState(null);

  // store에 저장된 ohtCheckId를 ohtCheckId 변수에 저장
  const ohtCheckId = useSelector(state => {
    return state.dashboard.checkId;
  });

  useEffect(() => {
    async function fetchWheelData() {
      try {
        const response = await Axios.get(`${BASE_URL}dashboard/main/${ohtCheckId}`);
        const wheelData = response.data.data;
        setWheelDataNew(wheelData);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchWheelData();
  }, [ohtCheckId]);

  return (
    <MainGrid>
      {wheelDataNew ? <OHTResult data={wheelDataNew} /> : null}
      <OHTCheck />
      <OHTTransition />
      <OHTAllResult />
    </MainGrid>
  );
}

export default DashboardPage;
