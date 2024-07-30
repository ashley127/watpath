import { ReactNode } from "react";
import Course from "./Course";

export interface CoursesContextValue {
    coursesMap: Map<string, Course>;
    loading: boolean;
    error: string | null;
}

export interface CoursesProviderProps {
    children: ReactNode;
}