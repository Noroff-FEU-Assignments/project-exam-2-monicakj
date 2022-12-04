import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, ListGroup, Row } from "react-bootstrap";
import FollowUser from "./FollowUser";
import useAxios from "../../hooks/useAxios";
import moment from "moment";
import DisplayError from "../common/DisplayError";
import SubNav from "../layout/SubNav";
import Loader from "../common/Loader";
import { Link } from "react-router-dom";

export default function ProfileDetails() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState([]);

  let { name } = useParams();
  const http = useAxios();
  document.title = `Social Media Company | ${name} `;

  useEffect(() => {
    async function getUsersProfile() {
      try {
        const response = await http.get(
          `profiles/${name}?_followers=true&_following=true&_posts=true`
        );
        setUserProfile(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getUsersProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <DisplayError />
    );
  }

  return (
    <>
    <SubNav />

      <Container className="profileDetails__container">
        <img
          src={userProfile.banner}
          className="profileDetails__banner"
          alt="user profile banner"
        />

        <div className="text-center">
        <img
              src={userProfile.avatar}
              className="profileDetails__avatar"
              alt="user profile avatar">
        </img>

        <h3 className="m-3">{userProfile.name}</h3>
        <div className="profileDetails--description">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div className="profileDetails__content">
          <p>Posts: {userProfile._count.posts}</p>
          <p>Followers: {userProfile._count.followers}</p>
          <p>Following: {userProfile._count.following}</p>
        </div>
        
        <FollowUser />

        <h2 className="profileDetails__posts--title">Latest Posts</h2>
        <ListGroup className="profileDetails__posts">
          {userProfile.posts.map((userPosts, index) => {
              return (
                <ListGroup.Item key={userPosts.id}>
              <Row>
                  <Link to={`/posts/${userPosts.id}`}>{userPosts.title}</Link>
                   <p>Published: {moment(userPosts.created).format("DD.MM.YYYY")}</p>
              </Row>
            </ListGroup.Item>
              );
            })}
        </ListGroup>


      </div>
      </Container>
    </>
  );
}