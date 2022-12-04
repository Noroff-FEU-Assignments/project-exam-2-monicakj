import { useState, useEffect, useContext } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import DisplayError from "../common/DisplayError";
import useAxios from "../../hooks/useAxios";
import { Form } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { SOCIAL_URL } from "../../constants/Api";
import moment from "moment";
import Loader from "../common/Loader";

const schema = yup.object().shape({
  body: yup
    .string()
    .required("Comment must contain some text.")
});

export default function CommentPost() {
  const { id } = useParams();
  const commentingUrl = SOCIAL_URL + `posts/${id}/comment`;
  const http = useAxios();
  const [auth] = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const options = {
    headers: { Authorization: `Bearer ${auth.accessToken}` },
  };

  useEffect(() => {
    async function FetchComments() {
      const commentsUrl = SOCIAL_URL + `posts/${id}?_comments=true`;
      try {
        const response = await http.get(commentsUrl, options);
        console.log(response);
        const allComments = response.data.comments;
        setComments(allComments);
      } catch (error) {
        setError(error.toString());
        console.log(error.toString());
      } finally {
        setLoading(false);
      }
    }
    FetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submitComment(data) {
    setSubmitting(true);
    const formData = {
      body: data.body,
      id: 0,
      auth: auth.name,
    };

    setComments(comments.concat(formData));

    try {
      const response = await http.post(commentingUrl, formData, options);
      console.log(response);
      if (response.status === 200) {
        console.log("Success");
        reset();
      }
    } catch (error) {
      console.log(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <DisplayError />;
  }

  return (
    <>
    <div className="postComments">
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="postComments--item">
              <Link
                to={`/profiles/${[comment.owner]}`}
                className=" m-0"
              >{comment.owner}
              </Link>
              <p>{moment(comment.created).format("DD.MM.YYYY, hh:mm A")}</p>
              <p>{comment.body}</p>
              <div className="comment_owner"></div>
            </div>
          );
        })}
      </div>
      
      <Form
        onSubmit={handleSubmit(submitComment)}
        className="commentPost__form"
      >
        {error && <DisplayError>{errors}</DisplayError>}
        <fieldset disabled={submitting}>
          <Form.Label htmlFor="comment"></Form.Label>
          <Form.Control
            placeholder="write a comment"
            as="textarea"
            name=""
            id="comment"
            rows="2"
            {...register("body")}
          ></Form.Control>

          {errors.message && (
            <DisplayError>{errors.comment.message}</DisplayError>
          )}
        </fieldset>
        <button
          type="submit"
          className="commentPost--button"
        >
          Publish Comment
        </button>
      </Form>
    </>
  );
}