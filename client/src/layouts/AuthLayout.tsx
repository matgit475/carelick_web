import * as React from "react";
import { Container } from "react-bootstrap";
import Header, { Navigation, Logo } from "../components/header/Header";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section>
      <div className="wave"></div>
      <Header expand="lg">
        <Logo />
        <Navigation />
      </Header>
      <Container className="auth-container d-flex justify-content-center align-items-center">
        <Outlet />
      </Container>
    </section>
  );
};

export default AuthLayout;
