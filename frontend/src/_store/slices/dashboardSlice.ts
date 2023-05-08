import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkId: 2,
  sseId: 2,
  inquire: false,
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
  },
});

// Action creators are generated for each case reducer function
export const { setCheckId, setSSEId, setInquire } = dashboardSlice.actions;

export default dashboardSlice.reducer;
