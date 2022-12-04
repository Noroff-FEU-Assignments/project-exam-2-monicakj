import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Form, Col, Button } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import DisplayError from "../common/DisplayError";
import Heading from "../layout/Heading";
import DeletePost from "./DeletePost";
import SubNav from "../layout/SubNav";
import Loader from "../common/Loader";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export default function EditPost() {
  const [post, setPost] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(true);
  const [updatingPost, setUpdatingPost] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();

  const navigate = useNavigate();

  let { id } = useParams();

  const url = `/posts/${id}`;
  useEffect(
    function () {
      async function getPost() {
        try {
          const response = await http.get(url);
          console.log("response", response.data);
          setPost(response.data);
        } catch (error) {
          console.log(error);
          setFetchError(error.toString());
        } finally {
          setFetchingPost(false);
        }
      }

      getPost();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function onSubmit(data) {
    setUpdatingPost(true);
    setUpdateError(null);
    setUpdated(false);
    navigate("/my-profile");

    console.log(data);

    const postData = {
      title: data.title,
      body: data.body,
      tags: data.tags.split(","),
      media: data.media,
    };

    try {
      const response = await http.put(url, postData);
      console.log("response", response.data);
      setUpdated(true);
    } catch (error) {
      console.log("error", error);
      setUpdateError(error.toString());
    } finally {
      setUpdatingPost(false);
    }
  }

  if (fetchingPost) return <Loader />;

  if (fetchError) return <DisplayError />;

  return (
    <>
    <SubNav />

    <Container className="editPost__container">
      <Col sm={5} className="mx-auto">
        <Heading title="Edit post" />
        <Form
          className="editPost__form p-4"
          onSubmit={handleSubmit(onSubmit)}
        >

          {updated && <Form.Text>{updated}</Form.Text>}
          {updateError && <DisplayError>{updateError}</DisplayError>}
          <Form.Group
            className="mb-3"
            controlId="formBasicName"
            disabled={updatingPost}
          >
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="edit title"
              defaultValue={post.title}
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
              placeholder="edit content"
              defaultValue={post.body}
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
              placeholder="edit tags"
              defaultValue={post.tags}
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
              type="text"
              placeholder="edit image URL"
              defaultValue={post.media}
              {...register("media")}
            />
            <Col>
              {errors.media && (
                <Form.Text className="text-danger">
                  {errors.media.message}
                </Form.Text>
              )}
            </Col>
          </Form.Group>

          <Col className="d-flex gap-3">
            <Button type="submit" className="editPost--button">
              Edit Post
            </Button>
            <DeletePost id={post.id} />
          </Col>

        </Form>
      </Col>
    </Container>
    </>
  );
}