import { useEffect, useState } from 'react';
import '../containers/styles/Main.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../redux/store";
import { setAnswer } from "../redux/slices/questionSlice";
import {
  Slider, Divider
} from '@mui/material';


function FormNumberRange(props: any) {
  let { question } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [range, setRange] = useState<number[]>([0, 100]);

  useEffect(() => {
    if (question.rangeValues) {
      setRange(question.rangeValues)
    }
  }, [])

  const marks = [
    {
      value: question.rangeValues[0],
      label: `${question.rangeValues[0]}`,
    },
    {
      value: question.rangeValues[1],
      label: `${question.rangeValues[1]}`,
    },
  ];

  function valuetext(value: number) {
    return `${value}`;
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setRange(newValue as number[]);
    console.log(newValue as number[]);
    dispatch(setAnswer({
      questionId: question._id,
      questionLabel: question.questionLabel,
      answer: newValue as number[]
    }))
  };


  return (
    <>
      <div className='my-5'>
        <div className="headingText" >{question.questionLabel}</div>
        <div className='mx-8'>
          <Slider
            getAriaLabel={() => "Always visible"}
            // aria-label="Always visible"
            value={range}
            marks={marks}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={question.rangeValues[0]}
            max={question.rangeValues[1]}
          />
        </div>
        <div className='mt-4'>
          <div className='headingText'>Minimum : <span className='ml-2'>{range[0]}</span></div>
          <div className='headingText'>Maximum : <span className='ml-2'>{range[1]}</span></div>
        </div>
      </div>
      <Divider />
    </>
  )
}

export default FormNumberRange;

