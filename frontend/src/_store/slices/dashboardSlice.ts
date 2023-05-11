import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkId: 2,
  sseId: 2,
  inquire: false,
  sseState: { ohtSn: "P2", isWheelsProceeding: [true, true, true, true] },
  imgUrl: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setCheckId: (state, action) => {
      state.checkId = action.payload;
    },
    setSSEId: (state, action) => {
      state.sseId = action.payload;
    },
    setInquire: (state, action) => {
      state.inquire = action.payload;
    },
    setSSEState: (state, action) => {
      state.sseState = action.payload;
    },
    setWheelImgUrl: (state, action) => {
      state.imgUrl = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCheckId, setSSEId, setInquire, setSSEState, setWheelImgUrl } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
