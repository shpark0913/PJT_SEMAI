import { createSlice } from '@reduxjs/toolkit'
import { PredictPageSliceType } from "../../_utils/Types";

const initialState: PredictPageSliceType = {
  reportDetail: {
    ohtSn: "",
    boltGoodCount: 0,
    boltOutCount: 0,
    boltLoseCount: 0,
    totalGoodCount: 0,
    totalOutCount: 0,
    totalLoseCount: 0,
    totalLooseCount: 0,
    wheelCheckDate: [0, 0, 0, 0, 0, 0],
    wheelCheckId: 0,
    wheelPosition: "",
    markingUrl: "",
    originUrl: ""
  },
  isDetailOpen: false,
}

export const predictPageSlice = createSlice({
  name: 'predictPage',
  initialState,
  reducers: {
    setReportDetail: (state, action) => {
      state.reportDetail = action.payload;
    },
    setDetailOpen: (state) => {
      state.isDetailOpen = true;
    },
    setDetailClose: (state) => {
      state.isDetailOpen = false;
      state.reportDetail = initialState.reportDetail;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setReportDetail, setDetailOpen, setDetailClose } = predictPageSlice.actions

export default predictPageSlice.reducer