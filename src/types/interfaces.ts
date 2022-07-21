export interface FormStateData {
  formData: AllQuestions
}

export interface QuestionType {
  _id: null | string;
  questionType: string | null ;
  answerType:  string | null ;
  questionLabel: null | string;
  options? : OptionType[]  | null;
  optionType? : string | null
}

export interface OptionType {
  optionNumber: string,
  optionText: string
}

export interface AllQuestions {
  questions: QuestionType[] | null
}

export interface QuestionPlusOptions{
  question : QuestionType,
  optionsList : OptionType[] | null
}


export interface AllFunctions {
  showNotify: boolean,
  notificationMessage: string ,
}



