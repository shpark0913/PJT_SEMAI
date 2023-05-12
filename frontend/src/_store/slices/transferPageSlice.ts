import { createSlice } from '@reduxjs/toolkit'
import {TransferPageSliceType} from "../../_utils/Types";

const initialState: TransferPageSliceType = {
  tabIndex: 0,
  isDetailOpen: false,
  tabMenuList: ['양호', '유실', '파단', '학습'],
  detailInfo: {
    imgUrl: "",
    originName: "",
    fileId: 0
  },
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
    },
    setDetailInfo: (state, action) => {
      state.detailInfo = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTabIndex, setIsDetailOpen, setDetailInfo } = TransferPageSlice.actions

export default TransferPageSlice.reducer