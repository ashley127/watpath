import React, { createContext, useContext, ReactNode } from 'react';
import Course from './interfaces/Course';
import useFetchCourses from './Data_Manager';
import { CoursesContextValue } from './interfaces/CoursesContextValue';

// Create the context
const CoursesContext = createContext<CoursesContextValue | undefined>(undefined);

// Define the props for the provider component
interface CoursesProviderProps {
    children: ReactNode;
}

// Create the provider component
export const CoursesProvider: React.FC<CoursesProviderProps> = ({ children }) => {
    const [coursesMap, loading, error] = useFetchCourses();

    // Provide the context value to children
    return (
        <CoursesContext.Provider value={{ coursesMap, loading, error }}>
            {children}
        </CoursesContext.Provider>
    );
};

// Custom hook to use the courses context
export const useCourses = (): CoursesContextValue => {
    const context = useContext(CoursesContext);
    if (!context) {
        throw new Error('useCourses must be used within a CoursesProvider');
    }
    return context;
};
