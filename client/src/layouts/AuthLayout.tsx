import * as React from "react";
import { Container } from "react-bootstrap";
import AuthHeader from "../components/header/AuthHeader";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section>
      <div className="wave">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <AuthHeader />
      <Container className="auth-container d-flex justify-content-center align-items-center">
        <Outlet />
      </Container>
    </section>
  );
};

export default AuthLayout;
