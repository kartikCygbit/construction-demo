import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllFunctions} from "../../types/interfaces";

const initialState: AllFunctions = {
  showNotify: false,
  notificationMessage: 'All details are required'
}

const functionSlice = createSlice({
  initialState: initialState,
  name: 'allFunctions',
  reducers: {
    setNotification: (state: AllFunctions, action: PayloadAction<string>) => {
      state.showNotify = true;
      state.notificationMessage = action.payload;
    },
    removeNotification: (state: AllFunctions) => {
      state.showNotify = false;
      state.notificationMessage = '';
    },

  }
})


export const allFunctions = functionSlice.reducer;
export const { setNotification, removeNotification } = functionSlice.actions;