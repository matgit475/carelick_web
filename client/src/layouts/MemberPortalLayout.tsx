import * as React from "react";
import { Outlet } from "react-router-dom";
import Header, {
  Logo,
  MobileMenu,
  ProfileMenu,
} from "../components/header/Header";
import RegistrationAlert from "../components/alerts/RegistrationAlert";
const MemberPortalLayout = () => {
  return (
    <div className="background">
      <Header expand={false} containerClassName={"justify-content-start"}>
        <MobileMenu />
        <Logo />
        <ProfileMenu />
      </Header>
      <RegistrationAlert />
      <Outlet />
    </div>
  );
};

export default MemberPortalLayout;
