import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { MdArrowForward } from "react-icons/md"
import moment from "moment";

export default function PostContent ({
  id,
  title,
  body,
  media,
  created,
  updated,
  _count,
  comments,
  reactions,
  author,
  name,
}) {
  const defaultPostImage =
    "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg image";

  return (
      <Card className="postList__card">
        <Card.Img
          variant="top"
          className="postList--image"
          src={media ? media : defaultPostImage} />
          
        <Card.Body className="postList__card--body">

          <h3 className="postList--title">{title}</h3>
          
          <Card.Text>
            <p>
            Published: {moment(created).format("DD.MM.YYYY")}
            <br></br>
            Posted by: <a href={`/profiles/${author.name}`} className="postList--author">{author.name}</a>
            </p>
          </Card.Text>

          <Card.Text className="postList--social">
            <p>Comments: {_count.comments}</p>
            <p>Reactions: {_count.reactions}</p>
          </Card.Text>
          
          <a href={`/posts/${id}`}>
            <button className="viewPost__button"><MdArrowForward /> View Post</button>
          </a>
        </Card.Body>
      </Card>
  );
}

PostContent.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  media: PropTypes.string,
  comments: PropTypes.array,
  reactions: PropTypes.string,
  _count: PropTypes.object,
  created: PropTypes.string,
  updated: PropTypes.string,
};