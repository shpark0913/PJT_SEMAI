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
  }
}

export const reportPageSlice = createSlice({
  name: 'reportPage',
  initialState,
  reducers: {
    setQueryObj: (state, action) => {
      console.log(`tmpObj:`)
      console.log(action.payload);
      Object.assign(state.queryObj, action.payload);
    },
  }
})

// Action creators are generated for each case reducer function
export const { setQueryObj } = reportPageSlice.actions

export default reportPageSlice.reducer