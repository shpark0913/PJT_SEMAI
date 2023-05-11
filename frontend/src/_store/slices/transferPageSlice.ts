import { createSlice } from '@reduxjs/toolkit'

export const TransferPageSlice = createSlice({
  name: 'transferPage',
  initialState: {
    tabIndex: 0,
  },
  reducers: {
    setTabIndex: (state, action) => {
      state.tabIndex = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTabIndex } = TransferPageSlice.actions

export default TransferPageSlice.reducer