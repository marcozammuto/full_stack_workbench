import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../components/features/counter/counterSlice";
import themeSlice from "./themeSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    theme: themeSlice,      // Now state.theme.isDarkMode is available everywhere
  },
});
