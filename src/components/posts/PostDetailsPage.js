import { useParams, useNavigate } from "react-router-dom";
import { SOCIAL_URL } from "../../constants/Api";
import { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import CommentPost from "./CommentPost";
import ReactPost from "./ReactPost";
import useAxios from "../../hooks/useAxios";
import DisplayError from "../common/DisplayError";
import Loader from "../common/Loader";
import moment from "moment";
import SubNav from "../layout/SubNav";

export default function PostDetails() {
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // eslint-disable-next-line
  const [auth /* setAuth */] = useContext(AuthContext);
  const navigate = useNavigate();

  document.title = "Social Media Company | Post Details";

  let { id } = useParams();

  const http = useAxios();
  const url =
    SOCIAL_URL + `posts/${id}?_author=true&_comments=true&_reactions=true`;

  useEffect(() => {
    async function getPostsDetails() {
      if (!id) {
        navigate("/posts");
      }
      try {
        const response = await http.get(url);
        if (response.status === 200) {
          setPostDetails(response.data);
        }
        console.log(response);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPostsDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <DisplayError/>
    );
  }

  return (
    <>
    <SubNav />
    
    <Container className="postDetails__container">
      <div className="postDetails">
        <h1 className="postDetails--title">{postDetails.title}</h1>
        <p>Published: {moment(postDetails.created).format("DD.MM.YYYY | hh:mm A")}</p>
        <p>Posted by: <a href={`/profiles/${postDetails.author.name}`}>
            {postDetails.author.name}</a></p>

        <img
          className="postDetails--image"
          src={postDetails.media}
          alt="the media selected for the specified post"
          />
        <p className="postDetails--text">{postDetails.body}</p>
        <div className="postDetails__tags">
          Tags:
          {postDetails.tags.map((tag, index) => {
            return (
              <p key={index} className="postDetails--tags--item mx-1">{tag}</p>
              );
            })}
        </div>

          {/* <p>Reactions: {postDetails._count.reactions} | Comments: {postDetails._count.comments}</p> */}

        <hr></hr>

        <div className="reactPost__container">
          <h4>Reactions</h4>
          <ReactPost />
        </div>

        <div className="commentPost__container">
          <h4>Comments</h4>
          <CommentPost />
        </div>

        </div>
      </Container>
    </>
  );
}