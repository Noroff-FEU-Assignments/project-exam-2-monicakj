import React from "react";
import LoginForm from "./LoginForm";

export default function Login () {
  document.title = "Social Media Company | Login";
  return (
    <>
      <div className="login__container">  
        <LoginForm />          
      </div>
    </>
  );
}