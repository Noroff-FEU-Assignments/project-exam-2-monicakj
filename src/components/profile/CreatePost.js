import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import DisplayError from "../common/DisplayError";
import { Form, Col, Button } from "react-bootstrap";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export default function CreatePost() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const http = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    console.log(data);

    const postData = {
      title: data.title,
      body: data.body,
      tags: data.tags.split(","),
      media: data.media,
    };

    try {
      const response = await http.post("/posts", postData);
      console.log("response", response.data);
      window.location.reload(true);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Col className="createPost__col" lg={5}>
        <h2>Create a post</h2>
        
      <Form className="createPost__form form" onSubmit={handleSubmit(onSubmit)}>
        {serverError && <DisplayError>{serverError}</DisplayError>}
        <Form.Group
          className=""
          controlId="formBasicName"
          disabled={submitting}
        >
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            {...register("title")}
          />
          <Col>
            {errors.title && (
              <Form.Text className="text-danger">
                {errors.title.message}
              </Form.Text>
            )}
          </Col>

          <Form.Label className="mt-3">Content</Form.Label>
          <Form.Control
            as="textarea"
            placeholder=""
            {...register("body")}
          />
          <Col>
            {errors.body && (
              <Form.Text className="text-danger">
                {errors.body.message}
              </Form.Text>
            )}
          </Col>

          <Form.Label className="mt-3">Tags (optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            {...register("tags")}
          />
          <Col>
            {errors.tags && (
              <Form.Text className="text-danger">
                {errors.tags.message}
              </Form.Text>
            )}
          </Col>

          <Form.Label className="mt-3">Image URL (optional)</Form.Label>
          <Form.Control
            type="url"
            placeholder=""
            {...register("media")}
          />
          <Col>
            {errors.tags && (
              <Form.Text className="text-danger">
                {errors.tags.message}
              </Form.Text>
            )}
          </Col>
        </Form.Group>
        <Button type="submit" className="submitPost--button">
          Submit Post
        </Button>
      </Form>
    </Col>
  );
}