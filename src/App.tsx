import React, { useState } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import TestCourses from './pages/TestCourses';
import CoursesPath from './pages/CoursesPath';
import { CoursesProvider } from './components/CourseContext';

const App: React.FC = () => {
  const [searchCourse, setSearchCourse] = useState<string>('');
  const navigate = useNavigate();

  const handleSearchSubmit = (searchValue: string) => {
    setSearchCourse(searchValue);
    navigate('/path');
  };

  return (
    <CoursesProvider>
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage setSearchCourse={handleSearchSubmit} />} 
        />
        <Route path="/tc" element={<TestCourses />} />
        <Route 
          path="/path" 
          element={<CoursesPath searchCourse={searchCourse} />} 
        />
      </Routes>
    </CoursesProvider>
  );
};

export default App;
