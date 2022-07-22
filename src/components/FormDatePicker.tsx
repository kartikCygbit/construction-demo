import { useState } from 'react';
import '../containers/styles/Main.css'
import { useDispatch} from "react-redux";
import { AppDispatch } from "../redux/store";
import {  setAnswer } from "../redux/slices/questionSlice";
import {
  Divider
} from '@mui/material';
import moment from 'moment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function FormDatePicker(props: any) {
  let { question } = props;
  const dispatch = useDispatch<AppDispatch>();

  const [value, setValue] = useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleChange = (newValue: Date | null) => {
    if (newValue) {
      setValue(newValue);
      dispatch(setAnswer({
        questionId: question._id,
        questionLabel: question.questionLabel,
        answer: moment(newValue).format('L')
      }))
    }
  };

  return (
    <>
      <div className='my-5'>
        <div className="headingText" >{question.questionLabel}</div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </div>
      <Divider />
    </>
  )
}

export default FormDatePicker;

