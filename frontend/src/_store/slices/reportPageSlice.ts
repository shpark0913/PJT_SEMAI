import { createSlice } from '@reduxjs/toolkit'
import {ReportPageSliceType} from "../../_utils/Types";

const initialState: ReportPageSliceType = {
  queryObj: {
    ohtSn: "",
    startDate: "",
    endDate: "",
    time: "",
    wheelPosition: "",
    page: "",
    descFlag: "",
    errorFlag: "",
  },
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

export const reportPageSlice = createSlice({
  name: 'reportPage',
  initialState,
  reducers: {
    setQueryObj: (state, action) => {
      Object.assign(state.queryObj, action.payload);
    },
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
export const { setQueryObj, setReportDetail, setDetailOpen, setDetailClose } = reportPageSlice.actions

export default reportPageSlice.reducer