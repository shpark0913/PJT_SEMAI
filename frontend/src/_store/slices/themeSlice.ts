import { createSlice } from '@reduxjs/toolkit'

type ThemeType = {
  theme: "dark" | "light"
};
const initialState: ThemeType = {
  theme: "dark"
}
export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggleTheme } = ThemeSlice.actions

export default ThemeSlice.reducer