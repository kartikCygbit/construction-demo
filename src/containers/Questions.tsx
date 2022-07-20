import { useState, useEffect } from 'react'
// import { Counter } from '../features/counter/Counter';
import './styles/Main.css'
import {
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Snackbar,
  Alert,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  Checkbox
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';

import { setQuestion } from "../redux/slices/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../redux/store";
import { OptionType, QuestionType } from '../types/interfaces';

function Questions() {
  const dispatch = useDispatch<AppDispatch>();
  const currentAssessment = useSelector((state: AppState) => state.questionSlice.questions);
  const [snackVisible, setSnackVisible] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string>('All details are required');
  const defaultFormQuestion = {
    _id: '',
    questionType: null,
    answerType: '',
    questionLabel: '',
    options: null,
  };
  const [formQuestion, setFormQuestion] = useState<QuestionType>({
    _id: '',
    questionType: null,
    answerType: '',
    questionLabel: '',
    options: null,
  })
  const defaultOptions = {
    optionNumber: 'option_0',
    optionText: ''
  }
  const [options, setOptions] = useState<OptionType[] | null>([{ ...defaultOptions }]);
  // ------------------------------------

  const addQuestion = () => {
    dispatch(setQuestion(formQuestion)); 
  }

  const checkDetails = () => {
    console.log('Checking details...', options)
    if (!formQuestion.questionLabel || !formQuestion.questionType) {
      console.log('****')
      setSnackMessage('Question title is required');
      setSnackVisible(true);
      return
    } else if (formQuestion.questionType && options && ['radio', 'checkbox', 'dropdown'].includes(formQuestion.questionType) && options.length < 2) {
      console.log('&&&&&&&')
      setSnackMessage('Add options & fill option details');
      setSnackVisible(true);
      return
    } else {
    }
    // if (options) {
      console.log('OPTIONS------------------>')
      console.log(options)
      setFormQuestion({
        ...formQuestion,
        _id: `${Math.random() + formQuestion.questionLabel}` ,
        options: options ? [...options] : null
      });
    // }
     addQuestion();
  }

  const renderOptions = () => {
    return (
      <>
        <div className="headingText" >Add Options</div>
        {Array(options?.length).fill('').map((item, index) => {
          return (
            <div className='mb-12 flex flex-row justify-center' key={`option_${index}`}>
              <div className='flex flex-1'>
                <TextField id="outlined-basic" label={`Option ${index + 1} Value`} value={item.optionText} variant="outlined" className='w-full h-1' onChange={(e) => {
                  console.log(e.target.value);
                  if (options) {
                    let opt = [...options];
                    opt[index] = {
                      optionNumber: `option_${index}`,
                      optionText: e.target.value
                    };
                    console.log('88888888888888 ===>',opt)
                    setOptions(opt)
                  }
                }} />
              </div>
              <div className='flex flex-row ml-2'>
                <Tooltip title="Delete">
                  <IconButton onClick={() => {
                    if (options && options.length > 0) {
                      let op = [...options];
                      op.splice(index, 1);
                      // console.log(op)
                      setOptions(op);
                      console.log('--------->', op)
                    }
                  }}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          )
        })}
      </>
    )
  }

  return (
    <div className='questionbody'>
      <Snackbar
        open={snackVisible}
        autoHideDuration={6000}
        onClose={() => {
          setSnackVisible(false)
        }}
        message={snackMessage}
      >
        <Alert onClose={() => {
          setSnackVisible(false)
        }} severity="error" sx={{ width: '100%' }}>
          All details are required
        </Alert>
      </Snackbar>
      <div className='text-5xl text-center font-bold mb-24'>
        Add Questions
      </div>
      <div className='mx-8 mt-5'>
        <div className='mb-4'>
          <FormControl fullWidth>
            <div className="headingText" >Type of Question</div>
            <Select
              value={formQuestion.questionType ?? ''}
              label="Select type"
              placeholder='Select type'
              onChange={(e) => {
                console.log(e.target.value);
                setFormQuestion({
                  ...formQuestion,
                  questionType: e.target.value
                })
              }}
              variant="outlined"
            >
              <MenuItem value={'textfield'}>Textfield</MenuItem>
              <MenuItem value={'radio'}>Radio</MenuItem>
              <MenuItem value={'checkbox'}>Checkbox</MenuItem>
              <MenuItem value={'dropdown'}>Dropdown</MenuItem>
              <MenuItem value={'fileImage'}>File/Image</MenuItem>
              <MenuItem value={'numberRange'}>Number Range</MenuItem>
              <MenuItem value={'timePicker'}>Time picker</MenuItem>
              <MenuItem value={'datePicker'}>Date picker</MenuItem>

            </Select>
          </FormControl>
        </div>
        <div className='mb-4'>
          <div className="headingText" >Question Title</div>
          <TextField id="outlined-basic" value={formQuestion.questionLabel} label="Enter question title" variant="outlined" className='w-full' onChange={(e) => {
            setFormQuestion({
              ...formQuestion,
              questionLabel: e.target.value
            })
          }} />
        </div>
        {formQuestion?.questionType && ['textfield', 'checkbox'].includes(formQuestion.questionType) ?
          <div className='mb-8'>
            <FormControl fullWidth>
              <div className="headingText" >Answer type</div>
              <Select
                value={formQuestion.answerType ?? ''}
                label="Select type"
                onChange={(e) => {
                  console.log(e.target.value);
                  setFormQuestion({
                    ...formQuestion,
                    answerType: e.target.value
                  })
                }}
              >
                {
                  formQuestion.questionType === 'textfield' ?
                    [
                      <MenuItem value={'singleLine'}>Single Line Textfield</MenuItem>,
                      <MenuItem value={'multiLine'}>Multi Line Textfield</MenuItem>
                    ]
                    :
                    formQuestion.questionType === 'checkbox' ?
                      [
                        <MenuItem value={'singleSelect'}>Single Select</MenuItem>,
                        <MenuItem value={'multiSelect'}>Multi Select</MenuItem>
                      ]
                      : null
                }
              </Select>
            </FormControl>
          </div>
          : null
        }

        <div className='mb-4'>
          {
            formQuestion.questionType && ['radio', 'checkbox', 'dropdown'].includes(formQuestion.questionType) ?
              <>
                {renderOptions()}
                <div className='flex justify-center items-center'>
                  <div className='bg-blue-400 rounded-2xl'>
                    <Tooltip title="Add another option">
                      <IconButton className='bg-red-500' onClick={() => {
                        if (options && options.length > 0) {
                          let op = [...options];
                          op.push({
                            optionNumber: `option_${options.length + 1}`,
                            optionText: ''
                          })
                          console.log(options)
                          setOptions(op);
                        } else {
                          setOptions([{
                            optionNumber: 'option_0',
                            optionText: ''
                          }])
                        }
                      }}>
                        <Add />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </>

              : null
          }
        </div>
        <div className='flex flex-1 mt-24 justify-center items-center'>
          <Button variant="outlined" onClick={() => {
            checkDetails()
          }}>Add question</Button>
        </div>
      </div>
    </div>
  );
}

export default Questions;


{/* <AccordionDetails>
            <Typography>Answer type :</Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="single"
                name="radio-buttons-group"
                value={formTextField.answerType}
                onChange={(e) => {
                  console.log('=>', e.target.value)
                  setFormTextField({
                    ...formTextField,
                    answerType: e.target.value
                  })
                }}
              >
                <FormControlLabel value="textSingleLine" control={<Radio />} label="Single line" />
                <FormControlLabel value="textMultiline" control={<Radio />} label="Multiline" />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
          <AccordionDetails>
            <Button variant="outlined" onClick={() => {
              dispatch(setFormQuestion(formTextField));
              setFormTextField({
                ...formTextField,
                label: ''
              })
            }}>Add question</Button>
          </AccordionDetails>
        </Accordion> */}