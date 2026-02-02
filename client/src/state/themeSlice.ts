import { createSlice } from "@reduxjs/toolkit";

// 1. Define the shape of your state
interface ThemeState {
  isDarkMode: boolean;
}

// 2. Set initial values
const initialState: ThemeState = {
  isDarkMode: false,
};

// 3. Create the slice
const themeSlice = createSlice({
  name: "theme",           // Name used in Redux DevTools
  initialState,            // Starting state
  reducers: {              // Functions that update state
    // Toggle dark mode on/off
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;  // Looks like mutation, but Redux Toolkit handles it immutably
    },
    // Set dark mode to a specific value
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;     // action.payload = the value you pass in
    },
  },
});

// 4. Export the actions (to use with dispatch)
export const { toggleTheme, setDarkMode } = themeSlice.actions;

// 5. Export the reducer (to add to store)
export default themeSlice.reducer;
