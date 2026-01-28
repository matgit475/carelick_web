import * as React from "react";
import { Outlet } from "react-router-dom";
import Header, {
  Navigation,
  Logo,
  LogButtons,
} from "../components/header/Header";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <div className="background">
      <Header expand="lg">
        <Logo />
        <Navigation>
          <LogButtons />
        </Navigation>
      </Header>
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
