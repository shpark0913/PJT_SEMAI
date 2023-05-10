import { setCheckId, setSSEId, setSSEState } from "../_store/slices/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Axios from "../_utils/Axios";
import { EventSourcePolyfill } from "event-source-polyfill";
import OHTAllResult from "../components/DashboardPage/OHTAllResult";
import OHTCheck from "../components/DashboardPage/OHTCheck";
import OHTResult from "../components/DashboardPage/OHTResult";
import OHTTransition from "../components/DashboardPage/OHTTransition";
import styled from "styled-components";

const MainGrid = styled.section`
  display: grid;
  width: 100%;
  height: calc(100vh - 60px);
  grid-template-rows: 34% 34% 32%;
  grid-template-columns: 70% 30%;
`;

function DashboardPage() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const SSE_URL = process.env.REACT_APP_SSE_URL;
  const dispatch = useDispatch();
  const [wheelDataNew, setWheelDataNew] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  const ohtCheckId = useSelector(state => {
    return state.dashboard.checkId;
  });

  const isChecked = useSelector(state => {
    return state.dashboard.inquire;
  });

  const isSSEId = useSelector(state => {
    return state.dashboard.sseId;
  });

  // 대시보드 SSE 연결
  useEffect(() => {
    async function fetchData() {
      const persistRoot = localStorage.getItem("persist:root");
      const store = persistRoot ? JSON.parse(persistRoot) : {};
      const token = JSON.parse(store.user)?.token || "";
      const sse = new EventSourcePolyfill(`${SSE_URL}dashboard`, {
        headers: {
          accesstoken: token,
        },
      });
      sse.addEventListener("state", event => {
        const stateData = JSON.parse(event.data);
        console.log("==========================");
        console.log("state SSE 발생");
        console.log("stateData", stateData);
        dispatch(
          setSSEState({ ohtSn: stateData.ohtSn, isWheelsProceeding: stateData.isWheelsProceeding }),
        );
      });
      sse.addEventListener("dashboard", event => {
        const dashboardData = JSON.parse(event.data);
        const persistRoot = localStorage.getItem("persist:root");
        const store = persistRoot ? JSON.parse(persistRoot) : {};
        const isinquire = JSON.parse(store.dashboard)?.inquire || "";
        console.log("==========================");
        console.log("dashboard SSE 발생, 최신 checkId는", dashboardData[0].ohtCheckId);
        console.log("isinquire", isinquire);
        setDashboardData(dashboardData);
        dispatch(setSSEId(dashboardData[0].ohtCheckId));
        if (isinquire === false) {
          console.log("자동 변경!");
          dispatch(setCheckId(dashboardData[0].ohtCheckId));
        }
      });
    }
    fetchData();
  }, []);

  // SSE에서 데이터를 받아와서 store의 checkId를 변경
  useEffect(() => {
    if (dashboardData) {
      const newOHTCheckId = dashboardData[0].ohtCheckId;
      dispatch(setSSEId(newOHTCheckId));
      if (isChecked === false) {
        dispatch(setCheckId(newOHTCheckId));
      }
    }
  }, [dashboardData, isChecked]);

  // store의 checkId가 변하면 실행돼서 정보를 불러옴
  useEffect(() => {
    async function fetchWheelData() {
      if (ohtCheckId) {
        try {
          const response = await Axios.get(`${BASE_URL}dashboard/main/${ohtCheckId}`);
          const wheelData = response.data.data;
          setWheelDataNew(wheelData);
        } catch (error) {
          console.log("error", error);
        }
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
