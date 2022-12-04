import { LOGIN_PATH, BASE_URL } from "../../constants/Api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Heading from "../../components/layout/Heading";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import DisplayError from "../common/DisplayError";
import SuccessMessage from "../common/SuccessMessage";

const emailRegex = /^\w+([-+.']\w+)*@?(stud.noroff.no|noroff.no)$/;

const schema = yup.object().shape({
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
    .required("Please enter a password.")
    .min(8, "Minimum 8 characters."),
});

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const loginUrl = BASE_URL + LOGIN_PATH;

  async function loginSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    const loginData = JSON.stringify(data);

    const options = {
      method: "POST",
      body: loginData,
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(loginUrl, options);
      const json = await response.json();
      console.log(response);

      if (response.ok) {
        setLoggedIn(true);
        setAuth(json);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setLoginError (
          "Login Failed: Your email address or password is incorrect."
        );
      }
    } catch (error) {
      console.log("Error:", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
    <div className="form__container">
      <Heading title="Login"></Heading>

    <form onSubmit={handleSubmit(loginSubmit)}>
      {loggedIn && (
        <SuccessMessage>
          <p>Succesfully logged in.</p>
        </SuccessMessage>
      )}
        {loginError && <DisplayError>{loginError}</DisplayError>}
        <fieldset disabled={submitting}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email address"
              {...register("email")}
            />
            {errors.email && (
              <DisplayError>{errors.email.message}</DisplayError>
            )}
          </Form.Group>

        <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
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

      <button type="submit" className="signIn--button">{submitting ? "Signing in ..." : "Sign In"}</button>

      <div className="password__container">
        <Link className="forgot--password">Forgotten password?</Link>
      </div>

      <hr></hr>
    
      <div className="register__container">
        <Link to="/register">
          <button type="register" className="register--button">Register New User</button>
          </Link>
      </div>

    </form>
    </div>
    </>
  );
}