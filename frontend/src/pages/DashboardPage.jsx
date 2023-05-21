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

  // "OHT 휠 검사 결과" 컴포넌트인 OHTResult 컴포넌트에 props로 전달할 데이터
  const [wheelDataNew, setWheelDataNew] = useState(null);

  // dashboardData에서 ohtCheckId를 뽑아서 store의 checkId에 넣을 것
  // checkId가" OHT 휠 검사 결과"에 나오는 검사의 Id
  const [dashboardData, setDashboardData] = useState(null);

  // store에 저장된 checkId를 ohtCheckid라는 변수명으로 사용할 것
  const ohtCheckId = useSelector(state => {
    return state.dashboard.checkId;
  });

  // isChecked가 false일 때만 "OHT 휠 검사 결과" 컴포넌트를 업데이트할 것
  // 특정 검사를 조회할 때 자동으로 "OHT 휠 검사 결과"가 업데이트되면 안되므로.
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

      // "현재 검사 OHT"를 나타내는 OHTCheck 컴포넌트에 사용되는 데이터
      sse.addEventListener("state", event => {
        const stateData = JSON.parse(event.data);
        dispatch(
          setSSEState({ ohtSn: stateData.ohtSn, isWheelsProceeding: stateData.isWheelsProceeding }),
        );
      });

      // "OHT 휠 검사 현황"을 나타내는 OHTAllResult 컴포넌트에 사용되는 데이터
      sse.addEventListener("dashboard", event => {
        const dashboardData = JSON.parse(event.data);
        setDashboardData(dashboardData);
      });
    }
    fetchData();
  }, []);

  // SSE에서 데이터를 받아와서 store의 checkId를 변경
  // store의 inquire가 false일 때만 "OHT 휠 검사 결과" 컴포넌트 변함
  // store의 inquire가 true라면 특정 검사 조회 중이니 "OHT 휠 검사 결과" 컴포넌트 불변
  // 특정 검사 조회하다가 "새로고침 버튼" 누르면 최신 검사 결과를 "OHT 휠 검사 결과"에 표시해야 함
  // -> 이를 위해 최신 검사 결과의 id를 store의 sseId에 저장하는 것
  useEffect(() => {
    if (dashboardData) {
      const persistRoot = localStorage.getItem("persist:root");
      const store = persistRoot ? JSON.parse(persistRoot) : {};
      const inquire = JSON.parse(store.dashboard)?.inquire || false;
      const newOHTCheckId = dashboardData[0].ohtCheckId;
      dispatch(setSSEId(newOHTCheckId));
      if (inquire === false) {
        dispatch(setCheckId(newOHTCheckId));
      }
    }
  }, [dashboardData, isChecked]);

  // store의 checkId가 변하면 실행돼서 wheelDataNew가 달라졌다면 업데이트 시킴
  useEffect(() => {
    async function fetchWheelData() {
      if (ohtCheckId) {
        try {
          const response = await Axios.get(`${BASE_URL}dashboard/main/${ohtCheckId}`);
          const wheelData = response.data.data;
          if (wheelDataNew !== wheelData) {
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
