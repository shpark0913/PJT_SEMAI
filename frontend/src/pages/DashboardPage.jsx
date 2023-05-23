import { setCheckId, setSSEId, setSSEState } from "../_store/slices/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Axios from "../_utils/Axios";
import { EventSourcePolyfill } from "event-source-polyfill";
import OHTAllResult from "../components/DashboardPage/OHTAllResult";
import OHTCheck from "../components/DashboardPage/OHTCheck";
import OHTResult from "../components/DashboardPage/OHTResult";
import OHTTransition from "../components/DashboardPage/OHTTransition";
import { fetchData } from "./DashboardLoader";
import styled from "styled-components";

export async function loader() {
  // const dispatch = useDispatch()
  // async function fetchData() {
  //   const persistRoot = localStorage.getItem("persist:root");
  //   const store = persistRoot ? JSON.parse(persistRoot) : {};
  //   const token = JSON.parse(store.user)?.token || "";
  //   const sse = new EventSourcePolyfill(`${BASE_URL}dashboard`, {
  //     headers: {
  //       accesstoken: token,
  //     },
  //   });

  //   // "현재 검사 OHT"를 나타내는 OHTCheck 컴포넌트에 사용되는 데이터
  //   sse.addEventListener("state", event => {
  //     const stateData = JSON.parse(event.data);
  //     dispatch(
  //       setSSEState({ ohtSn: stateData.ohtSn, isWheelsProceeding: stateData.isWheelsProceeding }),
  //     );
  //   });

  //   // "OHT 휠 검사 현황"을 나타내는 OHTAllResult 컴포넌트에 사용되는 데이터
  //   sse.addEventListener("dashboard", event => {
  //     const dashboardData = JSON.parse(event.data);

  //   });
  // }
  // fetchData();

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
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  return (
    <MainGrid>
      {/* {wheelDataNew ? <OHTResult data={wheelDataNew} /> : null} */}
      <OHTResult />
      <OHTCheck />
      <OHTTransition />
      <OHTAllResult />
    </MainGrid>
  );
}

export default DashboardPage;
