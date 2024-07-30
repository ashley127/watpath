import { useState, useEffect } from 'react';
import axios from 'axios';
import Course from './interfaces/Course';

const useFetchCourses = (): [Map<string, Course>, boolean, string | null] => {
    const [coursesMap, setCoursesMap] = useState<Map<string, Course>>(new Map());
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            let allCoursesMap = new Map<string, Course>();

            try {
                const response = await axios.post('https://okyzw5zyi2jsml5cmeyihypth40pzrkr.lambda-url.ca-central-1.on.aws/');

                const data: Array<Course> = JSON.parse(response.data.body).items;
                const courses: Course[] = data.map((item: any) => ({
                    subject: item.subject,
                    catalogNumber: item.catalognumber,
                    preReqs: item.reqs.preReqs || [],
                    postReqs: item.reqs.postReqs || [],
                    coReqs: item.reqs.coReqs || [],
                    antiReqs: item.reqs.ntiReqs || [],
                    programReqs: item.reqs.programReqs || [],
                }));

                // console.log(courses)

                courses.forEach(course => {
                    allCoursesMap.set(`${course.subject} ${course.catalogNumber}`, course)
                });

                setCoursesMap(allCoursesMap);

                console.log(coursesMap);
            } catch (err) {
                setError('Failed to fetch courses data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return [coursesMap, loading, error];
};

export default useFetchCourses;
