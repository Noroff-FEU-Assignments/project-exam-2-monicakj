import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { FiLogOut } from 'react-icons/fi';

export default function LogoutButton() {
  const [, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  function logoutUser() {
    setAuth(null);
    navigate("/login");
  }

  return (
    <button onClick={logoutUser} className="logout--button"><FiLogOut /> Log Out</button>
  );
}