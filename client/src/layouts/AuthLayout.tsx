import * as React from "react";
import { Container } from "react-bootstrap";
import Header, { Navigation, Logo } from "../components/header/Header";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="background">
      <Header expand="lg">
        <Logo />
        <Navigation />
      </Header>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
