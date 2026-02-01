import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../components/features/counter/counterSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});
