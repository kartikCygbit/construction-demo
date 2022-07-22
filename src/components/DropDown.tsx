import { useEffect, useState } from 'react';
import '../containers/styles/Main.css'
import { useDispatch } from "react-redux";
import { AppDispatch} from "../redux/store";
import {  OptionType } from '../types/interfaces';
import { setAnswer } from "../redux/slices/questionSlice";

import {
  FormControl,
  Select,
  MenuItem,
  Divider
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
    <>
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
      <Divider />
    </>
  )
}

export default DropDown;

