import React from 'react';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import Questions from './containers/Questions';
import GeneratedForm from './containers/GeneratedForm';

function App() {
  return (
    <div className="body grid grid-cols-2">
      <Questions />
      <GeneratedForm />
    </div>
  );
}

export default App;
