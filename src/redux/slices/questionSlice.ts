import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllQuestions, QuestionPlusOptions, QuestionType } from "../../types/interfaces";

const initialState: AllQuestions = {
  questions: null
}

const questionSlice = createSlice({
  initialState: initialState,
  name: 'formQuestions',
  reducers: {
    setQuestion: (state: AllQuestions, action: PayloadAction<QuestionPlusOptions>) => {
      let allQues = state.questions ? [...state.questions] : []
      if(action.payload.optionsList){
        let ques = {...action.payload.question,options: action.payload.optionsList}
        console.log('[QQQQ] ===>',ques)
        allQues.push(ques);
      }else{
        allQues.push(action.payload.question);
      }
      state.questions = allQues;
      console.log('[QUESTION  SUCCESSFULLY ADDED]')
    },

  }
})



export const formQuestions = questionSlice.reducer;
export const { setQuestion } = questionSlice.actions;