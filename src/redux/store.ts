import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { allFunctions } from "./slices/functionsSlice";
import { formQuestions } from "./slices/questionSlice";


export const store = configureStore({
  reducer: {
    questionSlice: formQuestions,
    functionSlice: allFunctions,
  }
})

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;