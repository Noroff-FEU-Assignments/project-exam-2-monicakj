import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Button from "react-bootstrap/Button";

export default function DeletePost({ id }) {
  const [error, setError] = useState(null);

  const http = useAxios();
  const history = useNavigate();

  const url = `/posts/${id}`;

  async function handleDelete() {
    try {
      await http.delete(url);
      history("/my-profile");
    } catch (error) {
      setError(error);
    }
  }

  return (
    <Button type="button" variant="danger" onClick={handleDelete}>
      {error ? "Error" : "Delete"}
    </Button>
  );
}