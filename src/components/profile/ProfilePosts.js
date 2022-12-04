import { useState, useEffect, useContext } from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import { NavLink, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import moment from "moment";

export default function ProfilePosts () {
  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const http = useAxios();

  let { name } = useParams();

  if (auth) {
    name = auth[0].name;
  }

  const url = `/profiles/${name}/posts`;

  useEffect(function () {
    async function ProfilePosts () {
      try {
        const response = await http.get(url);
        console.log("response", response);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    ProfilePosts ();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <Col className="profilePosts__col">
      <h2>My Posts</h2>
      <ListGroup className="containers">
        {posts.map((post) => {
          return (
            <ListGroup.Item key={post.id}>
              <Row>
                <Col sm={10}>
                  <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
                   <p>Published: {moment(post.created).format("DD.MM.YYYY")}</p>
                </Col>
                <Col sm>
                  <NavLink to={`/edit-post/${post.id}`}>Edit post</NavLink>
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Col>
    </>
  );
}