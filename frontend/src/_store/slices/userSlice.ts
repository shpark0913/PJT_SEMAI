import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from "redux-persist";

const persistRoot = localStorage.getItem('persist:root');
const store =  persistRoot ? JSON.parse(persistRoot) : "";
const user = store ? JSON.parse(store.user) : "";
const token = user.token || "";

const initialState = {
    userName: "",
    token: token,
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
    builder.addCase(PURGE, (state) => {
      return {...initialState};
    });
  }
})

// Action creators are generated for each case reducer function
export const { setUserName, setToken } = UserSlice.actions

export default UserSlice.reducer