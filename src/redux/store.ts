import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { formQuestions } from "./slices/questionSlice";


export const store = configureStore({
  reducer: {
    questionSlice: formQuestions,
  }
})

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;