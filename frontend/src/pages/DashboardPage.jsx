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
        dashboardData = JSON.parse(event.data);
        resolve(dashboardData);
      });
    });
    return response;
  }

  return fetchData().then(response => {
    const newOHTCheckId = response[0].ohtCheckId;
    return [newOHTCheckId];
  });
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

  // store에 저장된 ohtCheckId를 ohtCheckId 변수에 저장
  const ohtCheckId = useSelector(state => {
    return state.dashboard.checkId;
  });
  const isChecked = useSelector(state => {
    return state.dashboard.inquire;
  });
  console.log("이즈췍크드", isChecked);

  useEffect(() => {
    async function fetchNewOHTCheckId() {
      const newOHTCheckId = await loader();
      if (isChecked === false) {
        dispatch(setCheckId(newOHTCheckId));
      }
    }
    fetchNewOHTCheckId();
  }, [dispatch]);

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

  const [wheelDataNew, setWheelDataNew] = useState(null);

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
