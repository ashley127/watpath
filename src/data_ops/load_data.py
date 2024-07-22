# this script is used to load data, perform emergency full loads and act as a safety reset 

import requests
import os
from dotenv import load_dotenv
from boto3 import resource
from boto3.dynamodb.conditions import Attr, Key
from datetime import datetime

from data_objects.Course import Course

term_code_winter = "1" + datetime.today().strftime("%Y")[-2:] + "1"
term_code_summer = "1" + datetime.today().strftime("%Y")[-2:] + "5"
term_code_fall = "1" + datetime.today().strftime("%Y")[-2:] + "9"

watpath = resource('dynamodb').Table('watpath')

ENV_FILE = load_dotenv("../../.env")

log = []

def getAllSubjects() -> set:
    subjects = set()
    resp = requests.get(f"https://openapi.data.uwaterloo.ca/v3/Subjects", headers={ "x-api-key": os.environ.get("REACT_APP_API_KEY") }).json()
    for c in resp:
        subjects.add(c['code'])
    return subjects

def getTermCourses(termCode):
    courses = requests.get(f"https://openapi.data.uwaterloo.ca/v3/Courses/{termCode}", headers={ "x-api-key": os.environ.get("REACT_APP_API_KEY") })
    return courses

def parseCourses(allSubjects) -> dict:
    courses = dict()
    api_courses = [getTermCourses(term_code_winter).json(), getTermCourses(term_code_summer).json(), getTermCourses(term_code_fall).json()]
    
    term_cnt = 0
    for term in api_courses:
        course_cnt = 0
        print(term_cnt / len(api_courses), "% terms done")
        for course in term:
            courses[course['subjectCode']+ " " + course['catalogNumber']] = Course(course, allSubjects)
            print(course_cnt / len(term), "%", " courses done")
            course_cnt += 1
        term_cnt += 1
    return courses

def parsePostReqs(courses: dict) -> None:
    for courseId, course in courses.items():
        for i in course.get_pre_reqs():

            if(i in courses):
                courses[i].add_post_req(courseId)
            else:
                log.append([f"{i} not found", f"Post: {courseId}"])
            
    
def insert(course: Course) -> None:
    response = watpath.put_item(
        Item={
            'subject' : course.get_subjectCode(),
            'catalognumber' : course.get_catalogCode(),
            'reqs' : {
                'preReqs' : course.get_pre_reqs(),
                'postReqs' : course.get_post_reqs(),
                'antiReqs' : course.get_anti_reqs(),
                'coReqs' : course.get_co_reqs(),
                'otherReqs' : course.get_other_reqs(),
                'programReqs' : course.get_program_reqs()
            },
            'created_date' : datetime.now().isoformat()
        }
    )
    print(f"Insert response: {response}")

def main():
    allSubjects = getAllSubjects()
    all_courses = parseCourses(allSubjects)

    parsePostReqs(all_courses)

    # print(all_courses)

    for i in log:
        print(i)

    if(input("y to continue: ") == 'y'):
        cnt = 0
        for courseCode, courseCourse in all_courses.items():
            print(f"inserting {courseCode} :: {cnt/len(all_courses)}% done")
            insert(courseCourse)
            cnt += 1

main()