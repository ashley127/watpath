import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LandingPage from './LandingPage';
import { Routes, Route} from 'react-router-dom';
import Playground from './pages/Playground'
import { CoursesProvider } from './components/CourseContext';
import TestCourses from './pages/TestCourses';
import CoursesPath from './pages/CoursesPath';


const App= () => {
    return (
        <CoursesProvider>
            <Routes>
                <Route path = "/" element = {<LandingPage/>}/>
                <Route path = "/playground" element = {<Playground/>}/>
                <Route path = "/tc" element = {<TestCourses/>}/>
                <Route path = "/path" element = {<CoursesPath/>}/>
            </Routes>
        </CoursesProvider>
        );
}

export default App

