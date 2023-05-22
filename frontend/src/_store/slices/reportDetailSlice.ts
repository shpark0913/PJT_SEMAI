import { createSlice } from '@reduxjs/toolkit'
import { ReportDetailSliceType } from "../../_utils/Types";

const initialState: ReportDetailSliceType= {
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

export const reportDetail = createSlice({
  name: 'reportDetail',
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
export const { setReportDetail, setDetailOpen, setDetailClose } = reportDetail.actions

export default reportDetail.reducer