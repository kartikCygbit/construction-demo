import { useState, useEffect } from 'react'
// import { Counter } from '../features/counter/Counter';
import './styles/Main.css'
import {
  Typography,
  TextField,
  Button,
  FormControl,
  Alert,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  Checkbox,
  Grid
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';

import { setQuestion } from "../redux/slices/questionSlice";
import { setNotification, removeNotification } from "../redux/slices/functionsSlice";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../redux/store";
import { OptionType, QuestionPlusOptions, QuestionType } from '../types/interfaces';

function Questions() {
  const dispatch = useDispatch<AppDispatch>();
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
    rangeValues: null
  })
  const defaultOptions = {
    optionNumber: 'option_0',
    optionText: ''
  }
  const [options, setOptions] = useState<OptionType[] | null>([{ ...defaultOptions }]);
  const [numRange, setNumRange] = useState<number[]>([0, 100])

  useEffect(() => {
    setFormQuestion({
      ...formQuestion,
      rangeValues: [...numRange]
    })
  }, [numRange])

  const addQuestion = () => {
    let questionInfo = {
      ...formQuestion,
      _id: `${formQuestion.questionType}_${Math.random()}`,
    }
    let questionData: QuestionPlusOptions = {
      question: questionInfo,
      optionsList: options ? [...options] : null
    }
    dispatch(setQuestion(questionData));
    setFormQuestion({ ...defaultFormQuestion });
    setOptions([{ ...defaultOptions }]);
  }

  const checkDetails = () => {
    console.log('Checking details...', options)
    if (!formQuestion.questionType) {
      dispatch(setNotification('Question Type is required'));
      return
    } else if (!formQuestion.questionLabel) {
      dispatch(setNotification('Question Title is required'));
      return
    } else if (formQuestion.questionType && options && ['textfield', 'checkbox'].includes(formQuestion.questionType) && !formQuestion.answerType) {
      dispatch(setNotification('Select Answer type'));
      return
    } else if (formQuestion.questionType && options && ['radio', 'checkbox', 'dropdown'].includes(formQuestion.questionType) && options.length < 1) {
      dispatch(setNotification('Add options & fill option details'));
      return
    } else if (formQuestion.questionType && ['numberRange'].includes(formQuestion.questionType) && numRange[0] === numRange[1]) {
      dispatch(setNotification('Minimum and Maximum values should not be equal'));
      return
    } else {

    }
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
                      setOptions(op);
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
        {formQuestion?.questionType && ['textfield', 'checkbox','fileImage'].includes(formQuestion.questionType) ?
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
                      <MenuItem value={'singleLine'} key={`Menu_singleLine_${Math.random()}`}>Single Line Textfield</MenuItem>,
                      <MenuItem value={'multiLine'} key={`Menu_multiLine_${Math.random()}`}>Multi Line Textfield</MenuItem>
                    ]
                    :
                    formQuestion.questionType === 'checkbox' ?
                      [
                        <MenuItem value={'singleSelect'} key={`Menu_singleSelect_${Math.random()}`} >Single Select</MenuItem>,
                        <MenuItem value={'multiSelect'} key={`Menu_multiSelect_${Math.random()}`} >Multi Select</MenuItem>
                      ]
                      : formQuestion.questionType === 'fileImage' ?
                        [
                          <MenuItem value={'file'} key={`Menu_file_${Math.random()}`}>File</MenuItem>,
                          <MenuItem value={'image'} key={`Menu_image_${Math.random()}`}>Image</MenuItem>
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
        <div className='mb-4'>
          {
            formQuestion.questionType && ['numberRange'].includes(formQuestion.questionType) ?
              <Grid container columns={12} spacing={2} direction={'row'}>
                <Grid item xs={6}>
                  <div className='mb-4'>
                    <div className="headingText" >Minimum Value</div>
                    <TextField id="outlined-basic" value={numRange[0]} label="Enter minimum value" variant="outlined" className='w-full' onChange={(e) => {
                      let numbers = [...numRange];
                      numbers[0] = parseInt(e.target.value)
                      setNumRange(numbers)
                    }}
                      type='number'
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className='mb-4'>
                    <div className="headingText" >Maximum Value</div>
                    <TextField id="outlined-basic" value={numRange[1]} label="Enter maximum value" variant="outlined" className='w-full' onChange={(e) => {
                      let numbers = [...numRange];
                      numbers[1] = parseInt(e.target.value)
                      setNumRange(numbers)
                    }}
                      type='number'
                    />
                  </div>
                </Grid>
              </Grid>
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
