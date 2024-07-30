import React from 'react';
import { useCourses } from '../components/CourseContext';

const CourseTest = () => {
    const { coursesMap, loading, error } = useCourses();

    console.log("from CourseTest webpage side", coursesMap);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>hello</h1>
            {Array.from(coursesMap.values()).map((course) => (
                <div key={`${course.subject} ${course.catalogNumber}`}>
                    <h3>{course.subject} {course.catalogNumber}</h3>
                    <p>Pre-reqs: {course.preReqs.join(', ')}</p>
                    <p>Post-reqs: {course.postReqs.join(', ')}</p>
                    <p>Co-reqs: {course.coReqs.join(', ')}</p>
                    <p>Anti-reqs: {course.antiReqs.join(', ')}</p>
                    <p>Program-reqs: {course.programReqs}</p>
                </div>
            ))}
            <div>
                hello
                hi 
                please 
                work
            </div>
        </div>
    );
};

export default CourseTest;
