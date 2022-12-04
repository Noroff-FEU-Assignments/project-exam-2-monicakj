import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DefaultAvatarImage from "../../assets/default-avatar.png"
import { Card } from "react-bootstrap";

export default function ProfileContent({ name, avatar, count }) {
  return (
      <Card className="profiles__card">
        <Card.Img
          src={avatar ? avatar : DefaultAvatarImage }
          className="profiles__card--avatar"
        />
        <Card.Body className="profiles__card--body">
          <Card.Title className="profiles__card--name">{name}</Card.Title>
          <Card.Text className="profiles__card--text">
            <p>Posts: {count.posts}</p> <p>Followers: {count.followers}</p>
          </Card.Text>
          <Link
            to={`/profiles/${name}`}>
              <button className="visitProfile--btn">Visit Profile</button>
          </Link>
        </Card.Body>
      </Card>
  );
}

ProfileContent.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  count: PropTypes.object,
};