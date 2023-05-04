import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    checkId: 2,
    inquire: 0,
  },
  reducers: {
    setCheckId: (state, action) => {
      state.checkId = action.payload;
    },
    setInquire: (state, action) => {
      state.inquire = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCheckId, setInquire } = dashboardSlice.actions;

export default dashboardSlice.reducer;
