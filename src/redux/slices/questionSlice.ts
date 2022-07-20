import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllQuestions, QuestionType } from "../../types/interfaces";

const initialState: AllQuestions = {
  questions: null
}

const questionSlice = createSlice({
  initialState: initialState,
  name: 'formQuestions',
  reducers: {
    setQuestion: (state: AllQuestions, action: PayloadAction<QuestionType>) => {
      let allQues = state.questions ? [...state.questions] : []
      allQues.push(action.payload);
      state.questions = allQues;
      console.log('[QUESTION  SUCCESSFULLY ADDED]')
    },

  }
})



export const formQuestions = questionSlice.reducer;
export const { setQuestion } = questionSlice.actions;