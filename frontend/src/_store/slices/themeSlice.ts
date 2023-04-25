import { createSlice } from '@reduxjs/toolkit'

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: "dark"
  },
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggleTheme } = ThemeSlice.actions

export default ThemeSlice.reducer