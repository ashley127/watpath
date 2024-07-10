import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import axios, { CancelTokenSource } from 'axios';

interface IPost {
    courseId: string,
    courseOfferNumber: number,
    termCode: string,
    termName: string,
    associatedAcademicCareer: string,
    associatedAcademicGroupCode: string,
    associatedAcademicOrgCode: string,
    subjectCode: string,
    catalogNumber: string,
    title: string,
    descriptionAbbreviated: string,
    description: string,
    gradingBasis: string,
    courseComponentCode: string,
    enrollConsentCode: string,
    enrollConsentDescription: string,
    dropConsentCode: string,
    dropConsentDescription: string,
    requirementsDescription: string
}

interface DataProps{
  subject: string;
  code:string;
}

const defaultPosts:IPost[] = [];

const generateTermCode = (year: number, month: number): string => {
  const a = year >= 2000 ? 1 : 0;
  const yy = year % 100;
  const m = month;
  console.log(`${a}${yy.toString().padStart(2, '0')}${m}`)
  return `${a}${yy.toString().padStart(2, '0')}${m}`;
};

const generateApiUrl = (termCode: string, subject: string, code: string): string => {
  return `https://openapi.data.uwaterloo.ca/v3/Courses/${termCode}/${subject}/${code}`;
};

const Data: React.FC<DataProps> = ({subject, code}) => {
    const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
    const [error, setError]: [string, (error: string) => void] = React.useState("");
    const cancelToken = axios.CancelToken;

    const [cancelTokenSource, setCancelTokenSource]: [CancelTokenSource,(cancelTokenSource: CancelTokenSource) => void] = React.useState(cancelToken.source());

    const handleCancelClick = () => {
    if (cancelTokenSource) {
        cancelTokenSource.cancel("User cancelled operation");
    }
    };

    const API_KEY = process.env.REACT_APP_API_KEY;
    React.useEffect(() => {
        const year = 2024;
        const month = 9;
        const termCode = generateTermCode(year, month);
        const apiUrl = generateApiUrl(termCode, subject, code);
        const source = cancelToken.source()
        setCancelTokenSource(source);
    
        axios
          .get<IPost[]>(apiUrl, {
            cancelToken: cancelTokenSource.token,
            headers: {
              'x-api-key': API_KEY,
            },
            timeout: 10000
          })
          .then((response) => {
            setPosts(response.data);
            setLoading(false);
          })
          .catch(ex => {
            const error = axios.isCancel(ex)
             ? 'Request Cancelled'
            : ex.code === "ECONNABORTED"
            ? "A timeout has occurred"
            :  ex.response && ex.response.status === 404
            ? "Resource Not found"
            : "An unexpected error has occurred";
            setError(error);
            setLoading(false);
          })
    }, [subject, code]);
    return(
        <Box
        id="image"
        sx={(theme) => ({
          mt: { xs: 8, sm: 10 },
          alignSelf: 'center',
          textAlign: 'center',
          height: { xs: 200, sm: 700 },
          width: '100%',
          backgroundSize: 'cover',
          borderRadius: '10px',
          outline: '1px solid',
          overflowX: 'hidden',
          padding: 2,
         overflowY: 'auto',
          outlineColor:
            theme.palette.mode === 'light'
              ? alpha('#BFCCD9', 0.5)
              : alpha('#9CCCFC', 0.1),
          boxShadow:
            theme.palette.mode === 'light'
              ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
              : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
        })}
        >
            {loading && <button onClick={handleCancelClick}>Cancel</button>}
            <ul className="posts" style={{ padding: 0, margin: 0, listStyleType: 'none'}}>
            {posts.map((post) => (
            <li key={post.courseId}  style={{ padding: '10px 0' }}>
                <h3 style={{ margin: 0 }}>{post.title}</h3>
                <p style={{ margin: 0 }}>{post.requirementsDescription}</p>
            </li>
            ))}
            </ul>
            {error && <p className="error">{error}</p>}
        </Box>
    )
};
export default Data;