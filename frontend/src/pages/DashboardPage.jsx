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
  const dispatch = useDispatch();

  // OHT 휠 검사 결과 컴포넌트에 props로 보낼 값
  const [wheelDataNew, setWheelDataNew] = useState(null);

  // dashboardData에서 ohtCheckId를 뽑아서 store의 checkId에 넣을 것
  // checkId가 OHT 휠 검사 결과에 나오는 검사의 Id
  const [dashboardData, setDashboardData] = useState(null);

  const ohtCheckId = useSelector(state => {
    return state.dashboard.checkId;
  });

  // isChecked가 false일 때만 OHT 휠 검사 결과 컴포넌트를 업데이트할 것
  const isChecked = useSelector(state => {
    return state.dashboard.inquire;
  });

  // 대시보드 SSE 연결
  useEffect(() => {
    async function fetchData() {
      const persistRoot = localStorage.getItem("persist:root");
      const store = persistRoot ? JSON.parse(persistRoot) : {};
      const token = JSON.parse(store.user)?.token || "";
      const sse = new EventSourcePolyfill(`${BASE_URL}dashboard`, {
        headers: {
          accesstoken: token,
        },
      });

      // OHT 검사 결과
      sse.addEventListener("state", event => {
        const stateData = JSON.parse(event.data);
        console.log("proceed", stateData.isWheelsProceeding);
        dispatch(
          setSSEState({ ohtSn: stateData.ohtSn, isWheelsProceeding: stateData.isWheelsProceeding }),
        );
      });

      // 대시보드 관련
      sse.addEventListener("dashboard", event => {
        const dashboardData = JSON.parse(event.data);
        setDashboardData(dashboardData);
      });
    }
    fetchData();
  }, []);

  // SSE에서 데이터를 받아와서 store의 checkId를 변경
  useEffect(() => {
    if (dashboardData) {
      const persistRoot = localStorage.getItem("persist:root");
      const store = persistRoot ? JSON.parse(persistRoot) : {};
      const inquire = JSON.parse(store.dashboard)?.inquire || false;
      console.log("inquire", inquire);
      const newOHTCheckId = dashboardData[0].ohtCheckId;
      dispatch(setSSEId(newOHTCheckId));
      if (inquire === false) {
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
          if (wheelDataNew !== wheelData) {
            console.log("wheelData 변신!!!!!!!!!!!!!!!!!!!!!");
            setWheelDataNew(wheelData);
          }
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
