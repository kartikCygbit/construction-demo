import { useState } from 'react';
import '../containers/styles/Main.css'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  Button,
  Divider,
} from '@mui/material';
import { CheckCircleRounded } from '@mui/icons-material';

import { setAnswer } from "../redux/slices/questionSlice";
import Dropzone from 'react-dropzone'

function FormFileUpload(props: any) {
  let { question } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (acceptedFiles: any) => {
    console.log('ACCEPTED FILED ====>', acceptedFiles[0])
    setFile(acceptedFiles[0]);
    // dispatch(setAnswer({
    //   questionId: question._id,
    //   questionLabel: question.questionLabel,
    //   answer: e?.currentTarget.files[0]
    // }))
  }

  return (
    <>
      <div className='my-5'>
        <div className="headingText" >{question.questionLabel}</div>
        {/* <div className='flex flex-row'>
          <Button variant="contained" component="label">
            Choose file
            <input hidden accept="image/*" multiple type="file" onChange={handleChange} />
          </Button>
          <div>
          </div>
        </div> */}
        <Dropzone onDrop={acceptedFiles => handleChange(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: file ? 'dropzone fileAdded' : 'dropzone' })}>
                <input {...getInputProps()} />
                {
                  file ?
                    <div className='text-lg text-green-700'>{file.name}</div>
                  :
                  <div className='text-lg'>Drag 'n' drop some files here, or click to select files</div>
                }
              </div>
            </section>
          )}
        </Dropzone>
        {
          file ?
          <div className='flex flex-row items-center justify-center mt-3'>
            <CheckCircleRounded color='success' />
            <div className='text-lg text-green-700 font-bold ml-2'>File has been added</div>
          </div>
          :null
        }
      </div>
      <Divider />
    </>
  )
}

export default FormFileUpload;

