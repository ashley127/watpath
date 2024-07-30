import React from 'react';
import './App.css';
import axios, { CancelTokenSource } from 'axios';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LandingPage from './LandingPage';
import HyperspaceAnimation from './components/HyperspaceAnimation';
import { Routes, Route} from 'react-router-dom';
import Playground from './pages/Playground'



const App= () => {
  return (
    <>
    <Routes>
      <Route path = "/" element = {<LandingPage/>}/>
      <Route path = "/playground" element = {<Playground/>}/>
    </Routes>
    </>
    );
}

export default App