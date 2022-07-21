import { useEffect, useState } from 'react';
import '../containers/styles/Main.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../redux/store";
import { CheckBoxType, OptionType, QuestionType } from '../types/interfaces';
import { clearQuestions, setAnswer } from "../redux/slices/questionSlice";

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Divider,
  Checkbox,
} from '@mui/material';


function CheckBox(props: any) {
  let { question } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [optionArray, setOptionArray] = useState<OptionType[] | null>(null);

  const setSelected = (option: OptionType) => {
    let options = optionArray ? [...optionArray] : [];
    if (question.answerType === 'singleSelect') {
      setOptionArray([option])
      options =[{...option}]
      dispatch(setAnswer({
        questionId: question._id,
        questionLabel: question.questionLabel,
        answer: [...options]
      }))
    } else {
      if(options.length > 0){
        let pos = options.findIndex((opt,index) => opt.optionNumber === option.optionNumber );
        // console.log(`---------------------${pos}---------------------------`)
        if(pos !=-1){
          options.splice(pos,1);
        }else{
          options.push(option)
        }
      }else{
        options.push(option)
      }
      // console.log(options)
      setOptionArray(options);
      dispatch(setAnswer({
        questionId: question._id,
        questionLabel: question.questionLabel,
        answer: [...options]
      }))
    }
  }

  return (
    <div className='my-5'>
      <div className="headingText" >{question.questionLabel}</div>
      <FormControl>
        <FormGroup>
          {
            question?.options && question.options.map((opt: OptionType, index: number) => {
              return (
                // <div key={`checkbox_${index}`}>
                  <FormControlLabel control={<Checkbox checked={optionArray?.includes(opt) ? true : false} onClick={() => {
                    setSelected(opt);
                  }} key={`checkbox_${index}`} />} value={opt.optionText} label={opt.optionText} />
                // </div>
              )
            })
          }
        </FormGroup>
      </FormControl>
      <Divider />
    </div>
  )
}

export default CheckBox;
