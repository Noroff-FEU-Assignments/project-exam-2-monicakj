import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap/";
import { useContext } from "react";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";
import DisplayError from "../common/DisplayError";
import Loader from "../common/Loader";

export default function ProfileInfo() {
  const auth = useContext(AuthContext);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  let { name } = useParams();

  if (auth) {
    name = auth[0].name;
  }

  const url = `/profiles/${name}?_following=true&_followers=true`;

  useEffect(function () {
    async function ProfileInfo() {
      try {
        const response = await http.get(url);
        console.log("response", response.data);
        setDetails(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    ProfileInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) 
  return <Loader />;

  if (error) 
  return <DisplayError />;

  return (
    <Col>
      <Card>
        <Card.Body>
            <Col className="profile__banner">
              <Card.Img
                src={details.banner}
                style={{
                  height: "400px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Col>
            
          <Row className="profileInfo__row">
            <Col md={1} className="profile__avatar">
              <Card.Img
                src={details.avatar}
                style={{
                  height: "11rem",
                  width: "10rem",
                  objectFit: "cover",
                }}
              />
            </Col>

            <Col md={1} className="profileInfo">
            <Card.Title><h2>{details.name}</h2></Card.Title>
            <Card.Text className="profileInfo--description">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </Card.Text>

            <Card.Text className="profileInfo--media">
                <p>Posts: {details._count.posts}</p>
                <p>Following: {details._count.following}</p>
                <p>Followers: {details._count.followers}</p>
            </Card.Text>
            </Col>
          </Row>

          <Row>
            <Col className="profileUpdate--content">
            <NavLink to="/update-media">Update Avatar / Banner</NavLink>
            </Col>
          </Row>

        </Card.Body>
      </Card>
    </Col>
  );
}