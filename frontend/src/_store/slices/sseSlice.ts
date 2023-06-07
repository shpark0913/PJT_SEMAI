import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkId: 50,
  sseId: 50,
  inquire: false,
  sseState: { ohtSn: "V30001", isWheelsProceeding: [true, true, true, true] },
  imgUrl: false,
  dashboardData: [
    {
      ohtCheckDatetime: [2023, 5, 23, 20, 27, 45, 383562000],
      ohtChangeDate: [2023, 5, 23, 20, 27, 45, 384675000],
      oht_sn: "V30009",
      boltGoodCount: 11,
      boltOutCount: 0,
      boltLoseCount: 0,
      unclassifiedCount: 0,
      wheelPosition: "FL",
      image: "/semes_bolt/WHEEL_RESULT/V30009_20230523202733_3.jpg",
    },
    {
      ohtCheckDatetime: [2023, 5, 23, 20, 27, 45, 383562000],
      ohtChangeDate: [2023, 5, 23, 20, 27, 45, 384675000],
      oht_sn: "V30009",
      boltGoodCount: 11,
      boltOutCount: 0,
      boltLoseCount: 0,
      unclassifiedCount: 0,
      wheelPosition: "FR",
      image: "/semes_bolt/WHEEL_RESULT/V30009_20230523202733_4.jpg",
    },
    {
      ohtCheckDatetime: [2023, 5, 23, 20, 27, 45, 383562000],
      ohtChangeDate: [2023, 5, 23, 20, 27, 45, 384675000],
      oht_sn: "V30009",
      boltGoodCount: 11,
      boltOutCount: 0,
      boltLoseCount: 0,
      unclassifiedCount: 0,
      wheelPosition: "RL",
      image: "/semes_bolt/WHEEL_RESULT/V30009_20230523202733_5.jpg",
    },
    {
      ohtCheckDatetime: [2023, 5, 23, 20, 27, 45, 383562000],
      ohtChangeDate: [2023, 5, 23, 20, 27, 45, 384675000],
      oht_sn: "V30009",
      boltGoodCount: 11,
      boltOutCount: 0,
      boltLoseCount: 0,
      unclassifiedCount: 0,
      wheelPosition: "RR",
      image: "/semes_bolt/WHEEL_RESULT/V30009_20230523202733_6.jpg",
    },
  ],
  wheelData: [
    {
      ohtCheckDatetime: [2023, 5, 23, 20, 27, 45, 383562000],
      ohtChangeDate: [2023, 5, 23, 20, 27, 45, 384675000],
      oht_sn: "V30009",
      boltGoodCount: 11,
      boltOutCount: 0,
      boltLoseCount: 0,
      unclassifiedCount: 0,
      wheelPosition: "FL",
      image: "/semes_bolt/WHEEL_RESULT/V30009_20230523202733_3.jpg",
    },
    {
      ohtCheckDatetime: [2023, 5, 23, 20, 27, 45, 383562000],
      ohtChangeDate: [2023, 5, 23, 20, 27, 45, 384675000],
      oht_sn: "V30009",
      boltGoodCount: 11,
      boltOutCount: 0,
      boltLoseCount: 0,
      unclassifiedCount: 0,
      wheelPosition: "FR",
      image: "/semes_bolt/WHEEL_RESULT/V30009_20230523202733_4.jpg",
    },
    {
      ohtCheckDatetime: [2023, 5, 23, 20, 27, 45, 383562000],
      ohtChangeDate: [2023, 5, 23, 20, 27, 45, 384675000],
      oht_sn: "V30009",
      boltGoodCount: 11,
      boltOutCount: 0,
      boltLoseCount: 0,
      unclassifiedCount: 0,
      wheelPosition: "RL",
      image: "/semes_bolt/WHEEL_RESULT/V30009_20230523202733_5.jpg",
    },
    {
      ohtCheckDatetime: [2023, 5, 23, 20, 27, 45, 383562000],
      ohtChangeDate: [2023, 5, 23, 20, 27, 45, 384675000],
      oht_sn: "V30009",
      boltGoodCount: 11,
      boltOutCount: 0,
      boltLoseCount: 0,
      unclassifiedCount: 0,
      wheelPosition: "RR",
      image: "/semes_bolt/WHEEL_RESULT/V30009_20230523202733_6.jpg",
    },
  ],
  clickWheelData: [
    {
      ohtCheckDatetime: [2023, 5, 23, 20, 27, 45, 383562000],
      ohtChangeDate: [2023, 5, 23, 20, 27, 45, 384675000],
      oht_sn: "V30009",
      boltGoodCount: 11,
      boltOutCount: 0,
      boltLoseCount: 0,
      unclassifiedCount: 0,
      wheelPosition: "FL",
      image: "/semes_bolt/WHEEL_RESULT/V30009_20230523202733_3.jpg",
    },
    {
      ohtCheckDatetime: [2023, 5, 23, 20, 27, 45, 383562000],
      ohtChangeDate: [2023, 5, 23, 20, 27, 45, 384675000],
      oht_sn: "V30009",
      boltGoodCount: 11,
      boltOutCount: 0,
      boltLoseCount: 0,
      unclassifiedCount: 0,
      wheelPosition: "FR",
      image: "/semes_bolt/WHEEL_RESULT/V30009_20230523202733_4.jpg",
    },
    {
      ohtCheckDatetime: [2023, 5, 23, 20, 27, 45, 383562000],
      ohtChangeDate: [2023, 5, 23, 20, 27, 45, 384675000],
      oht_sn: "V30009",
      boltGoodCount: 11,
      boltOutCount: 0,
      boltLoseCount: 0,
      unclassifiedCount: 0,
      wheelPosition: "RL",
      image: "/semes_bolt/WHEEL_RESULT/V30009_20230523202733_5.jpg",
    },
    {
      ohtCheckDatetime: [2023, 5, 23, 20, 27, 45, 383562000],
      ohtChangeDate: [2023, 5, 23, 20, 27, 45, 384675000],
      oht_sn: "V30009",
      boltGoodCount: 11,
      boltOutCount: 0,
      boltLoseCount: 0,
      unclassifiedCount: 0,
      wheelPosition: "RR",
      image: "/semes_bolt/WHEEL_RESULT/V30009_20230523202733_6.jpg",
    },
  ],
};

// Dashboard에서 사용됨
export const sseSlice = createSlice({
  name: "sseEvent",
  initialState,
  reducers: {
    // checkId : "OHT 휠 검사 결과" 컴포넌트에 표시될 검사의 id
    setCheckId: (state, action) => {
      state.checkId = action.payload;
    },
    // sseId : "dashboard" event 중 가장 최신의 검사 id
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
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
    setWheelData: (state, action) => {
      state.wheelData = action.payload;
    },
    setClickWheelData: (state, action) => {
      state.clickWheelData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCheckId,
  setSSEId,
  setInquire,
  setSSEState,
  setWheelImgUrl,
  setDashboardData,
  setWheelData,
  setClickWheelData,
} = sseSlice.actions;

export default sseSlice.reducer;
