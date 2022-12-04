import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { SOCIAL_URL } from "../../constants/Api";
import Loader from "../common/Loader";
import PostContent from "./PostContent";
import DisplayError from "../common/DisplayError";

const postsUrl = SOCIAL_URL + "posts?&limit=15&_author=true&_comments=true&_reactions=true";

export default function PostList () {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    async function getPosts () {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      try {
        const response = await fetch(postsUrl, options);
        const json = await response.json();
        console.log(json);
        setPosts(json);
      } catch (error) {
        setError(error.toString());
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getPosts ();
  }, [auth.accessToken]);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return <DisplayError />;
  }

    return (
       <>
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
    </>
    );
  ;
}