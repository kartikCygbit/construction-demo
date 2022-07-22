import { useState } from 'react';
import './styles/Main.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../redux/store";
import { CheckBoxType, OptionType, QuestionType } from '../types/interfaces';
import { clearQuestions, setAnswer } from "../redux/slices/questionSlice";

import {
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CheckBox from '../components/CheckBox';
import DropDown from '../components/DropDown';
import FormDatePicker from '../components/FormDatePicker';
import FormTimePicker from '../components/FormTimePicker';
import FormFileUpload from '../components/FormFileUpload';
import FormNumberRange from '../components/FormNumberRange';


function GeneratedForm() {
  const dispatch = useDispatch<AppDispatch>();
  const questions = useSelector((state: AppState) => state.questionSlice.questions);
  const answers = useSelector((state: AppState) => state.questionSlice.answers);

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);
  console.log('[QUESTIONS] ====>', questions)

  const renderTextField = (ques: QuestionType) => {
    return (
      <div className='my-5'>
        <div className="headingText" >{ques.questionLabel}</div>
        <TextField id="outlined-basic" label="Enter details" variant="outlined" className='w-full' multiline={ques.answerType === 'singleLine' ? false : true}
          rows={ques.answerType === 'singleLine' ? 1 : 4} onChange={(e) => {
            console.log(e.target.value);
            dispatch(setAnswer({
              questionId: ques._id,
              questionLabel: ques.questionLabel,
              answer: e.target.value
            }))
          }}
        />
        <Divider />
      </div>
    )
  }

  const renderRadio = (ques: QuestionType) => {
    return (
      <div className='my-5'>
        <div className="headingText" >{ques.questionLabel}</div>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={ques?.options && ques?.options[0]}
            name="radio-buttons-group"
            onChange={(e) => {
              console.log(e.target.value)
              dispatch(setAnswer({
                questionId: ques._id,
                questionLabel: ques.questionLabel,
                answer: e.target.value
              }))
            }}
          >
            {
              ques?.options && ques.options.map((opt, index) => {
                return (
                  <div key={`radio_${index}`}>
                    <FormControlLabel value={opt.optionText} control={<Radio />} label={opt.optionText} />
                  </div>
                )
              })
            }
          </RadioGroup>
        </FormControl>
        <Divider />
      </div>
    )
  }

  const renderQuestion = () => {
    return (
      <div>
        {
          questions?.map((question, index) => {
            if (question.questionType === 'textfield') {
              return renderTextField(question)
            } else if (question.questionType === 'radio') {
              return renderRadio(question)
            } else if (question.questionType === 'checkbox') {
              return <CheckBox question={question} />
            }else if (question.questionType === 'dropdown') {
              return <DropDown question={question} />
            }else if(question.questionType === 'datePicker'){
              return <FormDatePicker question={question}  />
            }else if(question.questionType === 'timePicker'){
              return <FormTimePicker question={question}  />
            }else if(question.questionType ==='fileImage'){
              return <FormFileUpload question={question}  />
            }else if(question.questionType ==='numberRange'){
              return <FormNumberRange question={question} />
            } else {
              return <div>No questions added</div>
            }
          })

        }
      </div>
    )
  }

  const renderBackdrop = () => {
    return (
      <Backdrop
        sx={{ color: 'rgba(0,0,0,0.7)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
        onClick={() => {
          setShowBackdrop(false);
        }}
      >
        <div>
          <div className='text-5xl text-white font-extrabold font-mono'>Are your sure you want to clear the form ?</div>
          <div className='flex flex-1 mt-24 justify-center items-center'>
            <Button sx={{
              height: 60,
              width: 200,
              marginRight: 10,
              backgroundColor: 'red',
              color: 'white',
              fontWeight: 'bold'
            }} variant="outlined" onClick={() => {
              dispatch(clearQuestions())
            }}>Yes</Button>
            <Button sx={{
              height: 60,
              width: 200,
              marginRight: 10,
              backgroundColor: 'teal',
              color: 'white',
              fontWeight: 'bold'
            }} variant="outlined" color='info' onClick={() => {
              setShowBackdrop(false);
            }}>Cancel</Button>
          </div>
        </div>
      </Backdrop>
    )
  }
  return (
    <div className="generatedFormBody">
      {renderBackdrop()}
      <div className='text-5xl text-center font-bold mb-24'>
        FORM
      </div>
      <div className='my-6 mx-8'>
        {renderQuestion()}
      </div>
      {
        questions && questions.length > 0 ?
          <div className='flex flex-1 mt-24 justify-center items-center'>
            <Button sx={{
              backgroundColor: '#fd5c63',
              color: 'white',
              fontWeight: 'bold',
              border: 0,
              marginRight: 10

            }} variant="outlined" onClick={() => {
              // dispatch(clearQuestions())
              setShowBackdrop(true);
            }}>Clear Form</Button>
            <Button sx={{
              backgroundColor: 'teal',
              color: 'white',
              fontWeight: 'bold',
              border: 0,
            }} variant="outlined" onClick={() => {
              // dispatch(clearQuestions())
              setShowBackdrop(true);
            }}>Save Form</Button>
          </div>
          : null
      }
    </div>

  );
}

export default GeneratedForm;
