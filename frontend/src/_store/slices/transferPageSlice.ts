import { createSlice } from '@reduxjs/toolkit'
import {TransferPageSliceType} from "../../_utils/Types";

const initialState: TransferPageSliceType = {
  status: 0,
  statusNameList: ['양호', '유실', '파단', '학습'],
  detailInfo: {
    imgUrl: "",
    originName: "",
    fileId: 0
  },
  isDetailOpen: false,
  isConfirmModalOpen: false,
  type: {         // 행위의 타입, 0: 양호, 1: 유실, 2: 파단, 3: 학습, 4: 삭제
    preType: 0,
    nextType: 1,
  },
  selectedClass: [[], [], []],
  selectedTrain: [[], [], []],
}

export const TransferPageSlice = createSlice({
  name: 'transferPage',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setIsDetailOpen: (state, action) => {
      state.isDetailOpen = action.payload;
    },
    setDetailInfo: (state, action) => {
      state.detailInfo = action.payload;
    },
    setIsConfirmModalOpen: (state, action) => {
      state.isConfirmModalOpen = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload
    },
    setSelectedClass: (state, action) => {
      let {idx, list} = action.payload;   // idx와 변경된 리스트를 보냄
      state.selectedClass[idx] = list;    // 해당되는 idx에 갈아끼우면 됨 (idx 0: 양호, 1: 유실, 2:파단)
    },
    setSelectedTrain: (state, action) => {
      let {idx, list} = action.payload;
      state.selectedTrain[idx] = list;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setStatus, setIsDetailOpen, setDetailInfo, setIsConfirmModalOpen, setType, setSelectedClass, setSelectedTrain } = TransferPageSlice.actions

export default TransferPageSlice.reducer