import React from 'react';
import './App.css';
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

const defaultPosts:IPost[] = [];

const App = () => {
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
    axios
      .get<IPost[]>("https://openapi.data.uwaterloo.ca/v3/Courses/1249", {
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
        : ex.response.status === 404
        ? "Resource Not found"
        : "An unexpected error has occurred";
        setError(error);
        setLoading(false);
      })
    }, []);
  
  return (
    <div className="App">
      {loading && <button onClick={handleCancelClick}>Cancel</button>}
      <ul className="posts">
        {posts.map((post) => (
        <li key={post.courseId}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </li>
      ))}
      </ul>
      {error && <p className="error">{error}</p>}
    </div>
    );
}

export default App