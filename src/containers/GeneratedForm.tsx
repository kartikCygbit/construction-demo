// import { Counter } from '../features/counter/Counter';
import './styles/Main.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../redux/store";
import { QuestionType } from '../types/interfaces';
import {
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Divider,
  Checkbox,
  Select,
  MenuItem

} from '@mui/material';

function GeneratedForm() {
  const questions = useSelector((state: AppState) => state.questionSlice.questions);
  console.log('[QUESTIONS] ====>', questions)

  const renderTextField = (ques: QuestionType) => {
    return (
      <div className='my-5'>
        <div className="headingText" >{ques.questionLabel}</div>
        <TextField id="outlined-basic" label="Enter details" variant="outlined" className='w-full' multiline={ques.answerType === 'singleLine' ? false : true}
          rows={ques.answerType === 'singleLine' ? 1 : 4} onChange={(e) => {
            console.log(e.target.value);
          }} />
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

  const renderCheckbox = (ques: QuestionType) => {
    return (
      <div className='my-5'>
        <div className="headingText" >{ques.questionLabel}</div>
        <FormControl>
          <FormGroup>
            {
              ques?.options && ques.options.map((opt, index) => {
                return (
                  <div key={`checkbox_${index}`}>
                    <FormControlLabel control={<Checkbox />} label={opt.optionText} />
                  </div>
                )
              })
            }
          </FormGroup>
        </FormControl>
        <Divider />
      </div>
    )
  }

  const renderDropdown = (ques: QuestionType) => {
    return (
      <div className='my-5'>
        <div className="headingText" >{ques.questionLabel}</div>
        <FormControl fullWidth>
          <div className="headingText" >Type of Question</div>
          <Select
            // value={formQuestion.questionType ?? ''}
            label="Select type"
            placeholder='Select type'
            variant="outlined"
          >

            {
              ques?.options && ques.options.map((opt, index) => {
                return (
                  <div key={`dropdown_${index}`}>
                    <MenuItem value={opt.optionText}>{opt.optionText}</MenuItem>
                  </div>
                )
              })
            }

          </Select>
        </FormControl>
      </div>
    )
  }

  const renderQuestion = () => {
    return (
      <div>
        {
          questions?.map((question, index) => {
            if (question.questionType == 'textfield') {
              return renderTextField(question)
            } else if (question.questionType == 'radio') {
              return renderRadio(question)
            } else if (question.questionType == 'checkbox') {
              return renderCheckbox(question)
            }
            else if (question.questionType == 'dropdown') {
              return renderDropdown(question)
            } else {
              return <div>EMPTY</div>
            }
          })

        }
      </div>
    )
  }
  return (
    <div className="generatedFormBody">
      <div className='text-5xl text-center font-bold mb-24'>
        FORM
      </div>
      <div className='my-6 mx-8'>
        {renderQuestion()}
      </div>
    </div>

  );
}

export default GeneratedForm;
