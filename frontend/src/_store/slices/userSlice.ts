import { createSlice } from '@reduxjs/toolkit'

const persistRoot = localStorage.getItem('persist:root');
const store =  persistRoot ? JSON.parse(persistRoot) : "";
const user = store ? JSON.parse(store.user) : "";
const token = user.token || "";

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userName: "",
    token: token,
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserName, setToken } = UserSlice.actions

export default UserSlice.reducer