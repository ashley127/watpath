export default interface Course {
    subject: string;
    catalogNumber: number;
    preReqs: Array<string>;
    postReqs: Array<string>;
    coReqs: Array<string>;
    antiReqs: Array<string>;
    programReqs: Array<string>;
}