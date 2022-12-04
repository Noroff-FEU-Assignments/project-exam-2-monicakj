import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, REGISTER_PATH } from "../../constants/Api";
import { Form } from "react-bootstrap";
import Heading from "../layout/Heading";
import DisplayError from "../common/DisplayError";
import SuccessMessage from "../common/SuccessMessage";

const usernameRegex = /^[a-zA-Z0-9_]+$/;
const emailRegex = /^\w+([-+.']\w+)*@?(stud.noroff.no|noroff.no)$/;

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Your name must contain at least 3 characters.")
    .required("Please enter your name.")
    .matches(usernameRegex, "No punctuation except underscore."),
  email: yup
    .string()
    .required("Please enter a valid stud.noroff.no or noroff.no mail address.")
    .email()
    .matches(
      emailRegex,
      "Email must be a valid stud.noroff.no or noroff.no mail address."
    ),
  password: yup
  .string()
  .min(8, "Your password must contain at least 8 characters.")
  .required("Please enter a password."),
});

export default function RegisterForm () {
  const [submitting, setSubmitting] = useState(false);
  const [registerFormError, setRegisterFormError] = useState(null);
  const [registered, setRegistered] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const registerUrl = BASE_URL + REGISTER_PATH;

  async function registerFormSubmit(data) {
    setSubmitting(true);
    setRegisterFormError(null);

    const formData = JSON.stringify(data);

    const options = {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(registerUrl, options);
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setRegistered(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setRegisterFormError("Invalid credentials / account already exists?");
      }
    } catch (error) {
      console.log("Error:", error);
      setRegisterFormError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
    <div className="form__container">
      <Heading title="Register" />

      <Form
        onSubmit={handleSubmit(registerFormSubmit)}
      >
        <fieldset disabled={submitting}>
          {registered && (
            <SuccessMessage>
              <p>New user created.</p>
            </SuccessMessage>
          )}
          {registerFormError && (
            <DisplayError>
              {registerFormError}
            </DisplayError>
          )}
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="name"
              {...register("name")}
            />
            {errors.name && <DisplayError>{errors.name.message}</DisplayError>}
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="text"
              placeholder="email address"
              {...register("email")}
            />
            {errors.email && (
              <DisplayError>{errors.email.message}</DisplayError>
            )}
          </Form.Group>
          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              {...register("password")}
            />
            {errors.password && (
              <DisplayError>{errors.password.message}</DisplayError>
            )}
          </Form.Group>
        </fieldset>
        
        <p>* required fields.</p>

        <button type="submit" className="register--btn mb-3">
          {submitting ? "Signing up ..." : "Sign Up"}
        </button>
      </Form>

      </div>
    </>
  );
}