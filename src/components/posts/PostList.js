import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import PostContent from "./PostContent";
import Loader from "../common/Loader";
import DisplayError from "../common/DisplayError";
import { useNavigate } from "react-router-dom";
import { SOCIAL_URL } from "../../constants/Api";


const postsUrl =
  SOCIAL_URL + "posts?limit=10&_author=true&_comments=true&_reactions=true&limit=12";

export default function ListOfPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);
  const [postIndex, setPostIndex] = useState(12);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth === null) {
      navigate(`/login`);
    }

    async function getPosts() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      try {
        const response = await fetch(postsUrl, options);
        const json = await response.json();
        setPosts(json);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //test code below
  const loadMorePosts = () => {
    setPostIndex((count) => count + 12);
    async function getPosts() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      try {
        const response = await fetch(
          postsUrl + `&offset=${postIndex}`,
          options
        );
        const newPostsData = await response.json();
        setPosts(posts.concat(newPostsData));
      } catch (error) {
        console.log(error);
        setError(error.toString());
      }
      setLoading(false);
    }
    getPosts();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <DisplayError />
    );
  }

  return (
    <>
      <div className="postList">
        {posts.map((post) => {
          const {
            id,
            title,
            body,
            media,
            created,
            updated,
            _count,
            comments,
            author,
            name,
            avatar,
          } = post;
          
          return (
            <PostContent
              key={id}
              id={id}
              title={title}
              body={body}
              media={media}
              created={created}
              updated={updated}
              _count={_count}
              comments={comments}
              author={author}
              name={name}
              avatar={avatar}
            />
          );
        })}
      </div>

      <div className="loadmore__container">
      <button
        className="loadmore--btn"
        onClick={loadMorePosts}>Load More Posts
      </button>
      </div>
    </>
  );
}