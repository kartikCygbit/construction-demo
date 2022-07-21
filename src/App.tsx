import React from 'react';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "./redux/store";
import { setNotification, removeNotification } from "./redux/slices/functionsSlice";
import {
  Snackbar,
  Alert,
} from '@mui/material';
import Questions from './containers/Questions';
import GeneratedForm from './containers/GeneratedForm';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const snackMessage = useSelector((state: AppState) => state.functionSlice.notificationMessage);
  const showSnack = useSelector((state: AppState) => state.functionSlice.showNotify);


  return (
    <>
    <Snackbar
        open={showSnack}
        autoHideDuration={6000}
        onClose={() => dispatch(removeNotification())}
        message={snackMessage}
      >
        <Alert onClose={() => dispatch(removeNotification())} severity="error" sx={{ width: '100%' }} className='font-bold'>
          {snackMessage}
        </Alert>
      </Snackbar>
      <div className="body grid grid-cols-2">
      <Questions />
      <GeneratedForm />
    </div>
    </>
    
  );
}

export default App;
