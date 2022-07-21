import { useEffect, useState } from 'react';
import '../containers/styles/Main.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../redux/store";
import { CheckBoxType, OptionType, QuestionType } from '../types/interfaces';
import { clearQuestions, setAnswer } from "../redux/slices/questionSlice";

import {
  FormControl,
  Select,
  MenuItem
} from '@mui/material';


function DropDown(props: any) {
  let { question } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [ans, setAns] = useState<string | null>(null);

  const setSelected = (option: OptionType) => {
    setAns(option.optionText);
    dispatch(setAnswer({
      questionId: question._id,
      questionLabel: question.questionLabel,
      answer: option.optionText
    }))
  }

  return (
    <div className='my-5'>
      <div className="headingText" >{question.questionLabel}</div>
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">{ans}</InputLabel> */}
        <Select
          placeholder='Select type'
          labelId="demo-simple-select-label"
          variant="outlined"
          value={ans}
        >
          {
            question?.options && question.options.map((opt: OptionType, index: number) => {
              return (
                // <div key={`dropdown_${index}`}>
                <MenuItem key={`dropdown_${index}`} onClick={(e) => {
                  setSelected(opt);
                  console.log(e);
                }} value={opt.optionText}>{opt.optionText}</MenuItem>
                // </div>
              )
            })
          }
        </Select>
      </FormControl>
    </div>
  )
}

export default DropDown;

