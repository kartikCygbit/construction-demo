import { useState } from 'react';
import '../containers/styles/Main.css'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  Button,
  Divider,
} from '@mui/material';
import { setAnswer } from "../redux/slices/questionSlice";

function FormFileUpload(props: any) {
  let { question } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (e: React.FormEvent<HTMLInputElement> | undefined) => {
    console.log('file--->', e?.currentTarget.files)
    if (e?.currentTarget.files) {
      setFile(e?.currentTarget.files[0]);
      // dispatch(setAnswer({
      //   questionId: question._id,
      //   questionLabel: question.questionLabel,
      //   answer: e?.currentTarget.files[0]
      // }))
    }
  };

  return (
    <>
      <div className='my-5'>
        <div className="headingText" >{question.questionLabel}</div>
        <div className='flex flex-row'>
          <Button variant="contained" component="label">
            Choose file
            <input hidden accept="image/*" multiple type="file" onChange={handleChange} />
          </Button>
          <div>
          </div>
        </div>
      </div>
      <Divider />
    </>
  )
}

export default FormFileUpload;

