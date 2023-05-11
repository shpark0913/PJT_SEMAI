import { createSlice } from '@reduxjs/toolkit'
import {TransferPageSliceType} from "../../_utils/Types";

const initialState: TransferPageSliceType = {
  tabIndex: 0,
  isDetailOpen: false,
}

export const TransferPageSlice = createSlice({
  name: 'transferPage',
  initialState,
  reducers: {
    setTabIndex: (state, action) => {
      state.tabIndex = action.payload
    },
    setIsDetailOpen: (state, action) => {
      state.isDetailOpen = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTabIndex, setIsDetailOpen } = TransferPageSlice.actions

export default TransferPageSlice.reducer