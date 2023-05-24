import { setDashboardData, setSSEId, setSSEState, setWheelData } from "../_store/slices/sseSlice";

import Axios from "../_utils/Axios";
import { EventSourcePolyfill } from "event-source-polyfill";

export async function fetchData(dispatch) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const persistRoot = localStorage.getItem("persist:root");
  const store = persistRoot ? JSON.parse(persistRoot) : {};
  const token = JSON.parse(store.user)?.token || "";

  const sse = new EventSourcePolyfill(`${BASE_URL}dashboard`, {
    headers: {
      accesstoken: token,
    },
  });

  sse.addEventListener("state", event => {
    console.log("state 발생");
    const stateData = JSON.parse(event.data);
    dispatch(
      setSSEState({ ohtSn: stateData.ohtSn, isWheelsProceeding: stateData.isWheelsProceeding }),
    );
  });

  sse.addEventListener("dashboard", event => {
    console.log("dashboard 발생");
    const dashboardData = JSON.parse(event.data);

    // 최신 검사 Id store에 저장
    dispatch(setSSEId(dashboardData[0].ohtCheckId));
    dispatch(setDashboardData(dashboardData));

    async function f() {
      const response = await Axios.get(`${BASE_URL}dashboard/main/${dashboardData[0].ohtCheckId}`);
      const wheelData = response.data.data;
      return wheelData;
    }
    f().then(response => {
      dispatch(setWheelData(response));
    });
  });
}
