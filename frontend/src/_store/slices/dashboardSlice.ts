import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkId: 2,
  sseId: 2,
  inquire: false,
  sseState: { ohtSn: "V30001", isWheelsProceeding: [true, true, true, true] },
  imgUrl: false,
};

// Dashboard에서 사용됨
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // checkId : "OHT 휠 검사 결과" 컴포넌트에 표시될 검사의 id
    setCheckId: (state, action) => {
      state.checkId = action.payload;
    },
    // sseId : sse로부터 "dashboard" event 중 가장 최신의 검사 id
    setSSEId: (state, action) => {
      state.sseId = action.payload;
    },
    // inquire가 false일 때만 "OHT 휠 검사 결과" 자동으로 업데이트.
    // true라면 특정 검사 결과 조회 중이므로 업데이트 안됨.
    setInquire: (state, action) => {
      state.inquire = action.payload;
    },
    // "현재 검사 OHT"에 표시될 값
    // "ohtSn" : 상단 호기 ID에 표시
    // "isWheelsProceeding" : [true, false, false, false] 라면 FL만 체크표시, 나머지는 빈 원
    //                        [true, true, true, false] 라면 FL, FR, RL 체크표시, RR만 빈 원
    //                        검사 중인 OHT의 진행 상태를 나타내는 리스트
    setSSEState: (state, action) => {
      state.sseState = action.payload;
    },
    // 휠 상세 이미지를 클릭했을 때 모달창이 뜨는데, 이 모달창에 뜨는 이미지의 주소
    setWheelImgUrl: (state, action) => {
      state.imgUrl = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCheckId, setSSEId, setInquire, setSSEState, setWheelImgUrl } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
