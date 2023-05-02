import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    checkId: 0,
  },
  reducers: {
    setCheckId: (state, action) => {
      state.checkId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCheckId } = dashboardSlice.actions;

export default dashboardSlice.reducer;
