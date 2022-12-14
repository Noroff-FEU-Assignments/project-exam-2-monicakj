import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Container } from "react-bootstrap";

export default function FollowUser() {
  let { name } = useParams();
  const http = useAxios();

  const [, setFollowed] = useState();

  async function submitUserFollow() {
    try {
      const response = await http.put(`profiles/${name}/follow`);
      console.log(response);
      //window.location.reload();
      setFollowed(true);
    } catch (error) {
      console.log(error.toString());
    }
  }

  async function submitUserUnFollow() {
    try {
      const response = await http.put(`profiles/${name}/unfollow`);
      console.log(response);
      //window.location.reload();
      setFollowed(false);
    } catch (error) {
      console.log(error.toString());
    }
  }

  return (
    <>
      <Container className="d-flex justify-content-center">
        <button
          className="follow__button m-3"
          onClick={submitUserFollow}
        >
          Follow
        </button>

        <button
          className="unfollow__button m-3"
          onClick={submitUserUnFollow}
        >
          Unfollow
        </button>
      </Container>
    </>
  );
}