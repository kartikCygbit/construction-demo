export interface FormStateData {
  formData: AllQuestions
}

export interface AllQuestions {
  questions: QuestionType[] | null;
  answers: AnswerType[] | null;
  checkBoxes: CheckBoxType[] | null;
}

export interface QuestionType {
  _id:  string;
  questionType: string | null ;
  answerType:  string | null ;
  questionLabel: null | string;
  options? : OptionType[]  | null;
  optionType? : string | null;
}

export interface OptionType {
  optionNumber: string;
  optionText: string;
}

export interface CheckBoxType {
  questionId : string;
  answerType: string;
  answers : OptionType[] | [] | Date  | File | null;
}

export interface QuestionPlusOptions{
  question : QuestionType;
  optionsList : OptionType[] | null;
}

export interface AnswerType{
  questionId: string;
  questionLabel: string | null;
  answer: string | OptionType[] | null
}

export interface AllFunctions {
  showNotify: boolean;
  notificationMessage: string ;
}



