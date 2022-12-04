import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DisplayError from "../common/DisplayError";
import Heading from "../layout/Heading";
import { Container, Form, Col, Button } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import SubNav from "../layout/SubNav";

const schema = yup.object().shape({
  banner: yup.string(),
  avatar: yup.string(),
});

export default function UpdateMedia () {
  const auth = useContext(AuthContext);
  const [updated, setUpdated] = useState(false);
  const [updatingMedia, setUpdatingMedia] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();

  const navigate = useNavigate();

  let { name } = useParams();

  if (auth) {
    name = auth[0].name;
  }

  const url = `/profiles/${name}/media`;

  async function onSubmit(data) {
    setUpdatingMedia(true);
    setUpdateError(null);
    setUpdated(false);
    navigate("/my-profile");

    console.log(data);

    const putData = {
      banner: data.banner,
      avatar: data.avatar,
    };

    try {
      const response = await http.put(url, putData);
      console.log("response", response.data);
      setUpdated(true);
    } catch (error) {
      console.log("error", error);
      setUpdateError(error.toString());
    } finally {
      setUpdatingMedia(false);
    }
  }

  return (
    <>
    <SubNav />

    <Container className="updateMedia__container">
      <Heading title="Update Media" />

      <Col sm={5} className="mx-auto">
        <Form
          className="updateMedia__form"
          onSubmit={handleSubmit(onSubmit)}
        >

          {updated && <Form.Text>{updated}</Form.Text>}
          {updateError && <DisplayError>{updateError}</DisplayError>}
          <Form.Group
            className="mb-3"
            controlId="formBasicName"
            disabled={updatingMedia}
          >
            <Form.Label>Banner</Form.Label>
            <Form.Control
              type="url"
              placeholder="enter banner URL"
              {...register("banner")}
            />

            <Form.Label className="mt-3">Avatar</Form.Label>
            <Form.Control
              type="url"
              placeholder="enter avatar URL"
              {...register("avatar")}
            />
          </Form.Group>
          <Button type="submit" className="updateMedia--button">
            Update
          </Button>
        </Form>
      </Col>
    </Container>
    </>
  );
}