import CreatePost from "./CreatePost";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import SubNav from "../layout/SubNav";
import Heading from "../layout/Heading";
import { Container, Col, Row } from "react-bootstrap";

export default function ProfilePage () {
  return (
    <>
    <SubNav />

    <Container className="profile__container">
      <Col>
        <Heading title="My Profile" />
        <ProfileInfo />
      </Col>
      
      <Row>
        <CreatePost />
        <ProfilePosts />
      </Row>
    </Container>
    </>
  );
}