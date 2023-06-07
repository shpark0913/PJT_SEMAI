import { createSlice } from '@reduxjs/toolkit'

type TrainSliceType = {
  isTraining: boolean,
}

const initialState: TrainSliceType = {
  isTraining: false
}

export const trainSlice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    setIsTraining: (state, action) => {
      state.isTraining = action.payload;
    }
  }
})

export const { setIsTraining } = trainSlice.actions
export default trainSlice.reducer