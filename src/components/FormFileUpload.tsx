import { useEffect, useState } from 'react';
import '../containers/styles/Main.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../redux/store";
import { CheckBoxType, OptionType, QuestionType } from '../types/interfaces';
import { clearQuestions, setAnswer } from "../redux/slices/questionSlice";
import {
  Button
} from '@mui/material';

function FormFileUpload(props: any) {
  let { question } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [file, setFile] = useState<File| null>(null)

  const handleChange = (file: File | null) => {
    console.log('file--->',file)
    setFile(file);
    // if(newValue){
    //   setValue(newValue);
    //   dispatch(setAnswer({
    //     questionId: question._id,
    //     questionLabel: question.questionLabel,
    //     answer: moment(newValue).format('LT') 
    //   }))
    // }
  };

  return (
    <div className='my-5'>
      <div className="headingText" >{question.questionLabel}</div>
      <Button variant="contained" component="label">
        Choose file
        <input hidden accept="image/*" multiple type="file" />
      </Button>
    </div>
  )
}

export default FormFileUpload;

