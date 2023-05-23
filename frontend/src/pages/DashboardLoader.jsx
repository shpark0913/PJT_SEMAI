import { setDashboardData, setSSEId, setSSEState } from "../_store/slices/sseSlice";

import { EventSourcePolyfill } from "event-source-polyfill";

// import { setSSEState } from "../_store/slices/dashboardSlice";

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
    const stateData = JSON.parse(event.data);
    dispatch(
      setSSEState({ ohtSn: stateData.ohtSn, isWheelsProceeding: stateData.isWheelsProceeding }),
    );
  });

  sse.addEventListener("dashboard", event => {
    const dashboardData = JSON.parse(event.data);
    console.log("dashboard", dashboardData);

    // 최신 검사 Id store에 저장
    dispatch(setSSEId(dashboardData[0].ohtCheckId));
    dispatch(setDashboardData(dashboardData));
  });
}
