import React from 'react';
import RegisterForm from './RegisterForm';

function Register() {
  document.title = "Social Media Company | Register";
  return (
    <>
       <div className='register__container'>
        <RegisterForm />
      </div>
    </>
  )
}

export default Register;