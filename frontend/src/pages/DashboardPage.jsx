import { setCheckId, setSSEId } from "../_store/slices/dashboardSlice";
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
  const dispatch = useDispatch();
  const [wheelDataNew, setWheelDataNew] = useState(null);

  let dashboardData;
  const persistRoot = localStorage.getItem("persist:root");
  const store = persistRoot ? JSON.parse(persistRoot) : "";
  const token = JSON.parse(store.user)?.token || "";

  const ohtCheckId = useSelector(state => {
    return state.dashboard.checkId;
  });
  const isChecked = useSelector(state => {
    return state.dashboard.inquire;
  });
  const isSSEId = useSelector(state => {
    return state.dashboard.sseId;
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////
  // 대시보드 SSE 연결
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
        console.log("==========================");
        console.log("dashboard SSE 발생 🔆", dashboardData);
        console.log("isChecked", isChecked);
      });
    });
    const newOHTCheckId = response[0].ohtCheckId;
    dispatch(setSSEId(newOHTCheckId));

    return newOHTCheckId;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  // isChecked가 false라면 화면 좌측 최신화
  useEffect(() => {
    console.log("fetchNewOHTCheckId 실행");
    async function fetchNewOHTCheckId() {
      const newOHTCheckId = await fetchData();
      if (isChecked === false) {
        console.log("isChecked가 false일 때, checkId 바꾸기");
        dispatch(setCheckId(newOHTCheckId));
      }
    }
    fetchNewOHTCheckId();
  }, [isChecked]);
  ////////////////////////////////////////////////////////////////////////////////////////////////
  // store의 checkId가 변하면 실행돼서 정보를 불러옴
  useEffect(() => {
    console.log("fetchWheelData 실행");
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
  ////////////////////////////////////////////////////////////////////////////////////////////////

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
