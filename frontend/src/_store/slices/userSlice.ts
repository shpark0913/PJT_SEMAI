import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userName: "",
    token: ""
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