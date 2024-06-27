import React from 'react';
import './App.css';
import axios, { CancelTokenSource } from 'axios';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LandingPage from './LandingPage';


const App= () => {
  return (
    <div className="App">
      <LandingPage/>
    </div>
    );
}

export default App