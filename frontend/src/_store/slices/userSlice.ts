import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from "redux-persist";

const initialState = {
    userName: "",
    token: "",
  }

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return {...initialState};
    });
  }
})

// Action creators are generated for each case reducer function
export const { setUserName, setToken } = UserSlice.actions

export default UserSlice.reducer