import * as React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Header from "./Header";
import useLogout from "../../hooks/auth/useLogout";

const UserLinks = () => {
  const { user } = useAuth();
  const { logoutUser, error, loading } = useLogout();
  const isUserLoggedin = user;

  const handleLogout = async () => {
    await logoutUser();
  };

  const userLogInButtons = (
    <>
      <Link to="/auth/login">
        <Button variant="primary">Login</Button>
      </Link>
      <Link to="/auth/register">
        <Button variant="outline-primary">Register</Button>
      </Link>
    </>
  );

  const userLogOutButton = (
    <>
      <Button variant="primary" onClick={handleLogout}>
        {loading ? "Logging Out..." : "Logout"}
      </Button>
    </>
  );
  return isUserLoggedin ? userLogOutButton : userLogInButtons;
};
const PublicHeader = () => {
  return (
    <Header>
      {
        <div className="d-flex gap-3 pt-2">
          <UserLinks />
        </div>
      }
    </Header>
  );
};

export default PublicHeader;
