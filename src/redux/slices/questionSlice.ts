import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AllQuestions,
  AnswerType,
  CheckBoxType,
  QuestionPlusOptions,
  QuestionType,
} from '../../types/interfaces';

const initialState: AllQuestions = {
  questions: null,
  answers: null,
  checkBoxes: null,
};

const questionSlice = createSlice({
  initialState: initialState,
  name: 'formQuestions',
  reducers: {
    setQuestion: (
      state: AllQuestions,
      action: PayloadAction<QuestionPlusOptions>
    ) => {
      console.log('[PayloadAction] ===>', action.payload);

      let allQues = state.questions ? [...state.questions] : [];
      if (action.payload.optionsList) {
        let ques = {
          ...action.payload.question,
          options: action.payload.optionsList,
        };
        console.log('[QQQQ] ===>', ques);
        allQues.push(ques);
      } else {
        allQues.push(action.payload.question);
      }
      state.questions = allQues;
      console.log('[QUESTION  SUCCESSFULLY ADDED]');
    },
    clearQuestions: (state: AllQuestions) => {
      state.questions = null;
      state.answers = null;
    },
    setAnswer: (state: AllQuestions, action: PayloadAction<AnswerType>) => {
      let allAns = state.answers ? [...state.answers] : [];
      if (Array.isArray(state.answers) && state.answers.length > 0) {
        let questionPosition = state.answers.findIndex(question => question.questionId === action.payload.questionId)
        console.log('[questionPosition]',questionPosition);
        allAns[questionPosition] =action.payload;
      }else{
        allAns.push(action.payload);
      }
      state.answers = allAns;
      console.log('[ANSWER SUCCESSFULLY ADDED]');
      console.log(state.answers)
    },
  },
});

export const formQuestions = questionSlice.reducer;
export const { setQuestion, clearQuestions, setAnswer } = questionSlice.actions;
