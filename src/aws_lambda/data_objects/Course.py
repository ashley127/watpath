class Course:
    def __init__(self, course, allSubjects):
        self.subjectCode: str = course['subjectCode']
        self.catalogNumber: str = course['catalogNumber']
        self.pre_req:list = []
        self.post_req:list = []
        self.anti_req:list = []
        self.co_req:list = []
        self.program_req: str = ""
        self.other_req: list = []

        self.get_reqs(course['requirementsDescription'], allSubjects)

    def get_reqs(self, reqStr: str, allSubjects: set):
        def cleanString(s: str):
            return s.replace(",", "").replace(" ", "").replace(".", "")
        
        if(self.subjectCode == "AFM" and self.catalogNumber == "123"):
            print("halt!!!")
        
        if(reqStr == None):
            return

        reqStr = reqStr.replace("(", "").replace(")", "").replace(";", " ;").split(" ")
        f = ""
        for i in range(len(reqStr)):
            if(reqStr[i] == "Prereq:"):
                f = "P"
                continue
            elif(reqStr[i] == "Antireq:"):
                f = "A"
                continue
            elif(reqStr[i]  == "Coreq:"):
                f = "C"
                continue
            elif(reqStr[i] == "students" or reqStr[i] == "stdnts"):
                t = i
                while(t >= 0 and reqStr[t] != ";" and reqStr[i] != "Prereq:"):
                    self.program_req = reqStr[t] + " " + self.program_req
                    t -= 1
                continue
            elif(reqStr[i] == "more"):
                additional = [reqStr[i-1]]
                while(not reqStr[i] in allSubjects):
                    additional.append(reqStr[i])
                    i += 1
                additional.append(reqStr[i])
                self.other_req.append(additional)
                i += 1
                continue

            courseFound = ""
            if(reqStr[i] in allSubjects and i+1 < len(reqStr)):
                courseCode = reqStr[i]
                catalogNumber = reqStr[i+1]

                if(catalogNumber == "Grad"):
                    self.program_req += courseCode + " " + catalogNumber + " "
                elif("/" in catalogNumber):
                    look = catalogNumber.split("/")
                    prevCode = courseCode
                    for word in look:
                        if(word in allSubjects):
                            prevCode = word
                            continue
                        self.pre_req.append(prevCode + " " + cleanString(word))
                else:
                    self.pre_req.append(courseCode + " " + cleanString(catalogNumber))

                i += 1

            if courseFound == "":
                continue
            if(f == "P"):
                self.pre_req.append(courseFound)
            elif(f == "A"):
                self.anti_req.append(courseFound)
            elif(f == "C"):
                self.co_req.append(courseFound)

    def add_post_req(self, course) -> None:
        self.post_req.append(course)

    def get_pre_reqs(self) -> list:
        return self.pre_req
    
    def get_post_reqs(self) -> list:
        return self.post_req
    
    def get_anti_reqs(self) -> list:
        return self.anti_req
    
    def get_co_reqs(self) -> list:
        return self.co_req
    
    def get_program_reqs(self) -> str:
        return self.program_req
    
    def get_other_reqs(self) -> list:
        return self.other_req

    def get_subjectCode(self) -> str:
        return self.subjectCode

    def get_catalogCode(self) -> str:
        return self.catalogNumber

    # def __hash__(self) -> int:
    #     return hash(self.subjectCode + self.catalogNumber)
    
    # def __eq__(self, other) -> bool:
    #     return self.subjectCode == other.subjectCode and self.catalogNumber == other.catalogNumber
    
    # def __ne__(self, other) -> bool:
    #     return not self == other