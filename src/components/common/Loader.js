import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <>
    <Spinner className="loader" role="status"></Spinner>
    </>
  );
}