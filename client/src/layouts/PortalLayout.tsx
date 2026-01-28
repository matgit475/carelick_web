import * as React from "react";
import { Outlet } from "react-router-dom";
import Header, {
  Logo,
  MobileMenu,
  ProfileMenu,
} from "../components/header/Header";

const PortalLayout = () => {
  return (
    <div className="background">
      <Header expand={false} containerClassName={"justify-content-start"}>
        <MobileMenu />
        <Logo />
        <ProfileMenu />
      </Header>
      <Outlet />
    </div>
  );
};

export default PortalLayout;
