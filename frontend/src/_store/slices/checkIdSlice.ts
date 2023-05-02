import { createSlice } from "@reduxjs/toolkit";

export const checkIdSlice = createSlice({
  name: "checkId",
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
export const { setCheckId } = checkIdSlice.actions;

export default checkIdSlice.reducer;
