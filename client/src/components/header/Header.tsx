import * as React from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { useAuth } from "../../context/auth";
import useLogout from "../../hooks/auth/useLogout";
import { Link } from "react-router-dom";
import { Button, Offcanvas } from "react-bootstrap";
import { image } from "../../helpers/Common";
import { ListGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiLogOut,
  FiChevronRight,
  FiHome,
  FiUser,
  FiSettings,
} from "react-icons/fi";

const LogInButtons = () => (
  <>
    <Link to="/auth/login">
      <Button variant="primary">Login</Button>
    </Link>
    <Link to="/auth/register">
      <Button variant="outline-primary">Register</Button>
    </Link>
  </>
);

const LogOutButton = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logoutUser, error, loading } = useLogout();
  return (
    <>
      <Button variant="primary" onClick={logoutUser}>
        {loading ? "Logging Out..." : "Logout"}
      </Button>
      <Button
        variant="outline-primary"
        onClick={() =>
          user.role === "admin" ? navigate("/admin-portal/dashboard") : null
        }
      >
        Portal
      </Button>
    </>
  );
};

export const LogButtons = () => {
  const { user } = useAuth();
  return (
    <div className="d-flex gap-3 pt-2">
      {user ? <LogOutButton /> : <LogInButtons />}
    </div>
  );
};

export const Logo = () => {
  return (
    <Navbar.Brand className={"ms-3"} as={Link} to="/">
      <img width="200px" src={image("transparent-logo.png")} />
    </Navbar.Brand>
  );
};

export const MobileMenu = () => {
  const { logoutUser } = useLogout();
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // get current path
  const { user } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  const activeClassName = (path: string) =>
    isActive(path) ? "border-start border-3 border-dark" : "";
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar.Toggle className={"ms-3"} onClick={handleShow} />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Logo />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            {/* Dashboard Link */}
            <ListGroup.Item
              action
              className={`d-flex align-items-center justify-content-between`}
              onClick={() => {
                if (user?.role === "admin") {
                  navigate("/admin-portal/dashboard");
                }
              }}
            >
              <span className="d-flex align-items-center gap-2">
                <FiHome size={18} />
                Dashboard
              </span>

              <FiChevronRight size={18} />
            </ListGroup.Item>

            {/* Logout Link */}
            <ListGroup.Item
              action
              className="d-flex align-items-center justify-content-between"
              onClick={logoutUser}
            >
              <span className="d-flex align-items-center gap-2">
                <FiLogOut size={18} />
                Logout
              </span>
              <FiChevronRight size={18} />
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export const Navigation: React.FC<{ children?: any } | null> = ({
  children,
}) => {
  return (
    <>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll" role="navigation">
        <Nav className="ms-auto mx-2" navbarScroll>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/news">
            News
          </Nav.Link>
          <Nav.Link as={Link} to="/events">
            Events
          </Nav.Link>
        </Nav>
        {children}
      </Navbar.Collapse>
    </>
  );
};

export const ProfileMenu = () => {
  const { user } = useAuth();
  const { logoutUser } = useLogout();
  const navigate = useNavigate();
  return (
    <Nav className="ms-auto">
      <Dropdown className="absolute-dropdown me-3" align="end">
        <Dropdown.Toggle
          variant="light"
          id="dropdown-custom-toggle"
          className="d-flex align-items-center dropdown-profile-toggle"
        >
          <FiUser size={22} className="me-2" />
          <div className="profile-info text-start">
            <div className="profile-name">{user.first_name}</div>
            <div className="profile-role">{user.role}</div>
            <div className="profile-email">{user.email}</div>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={(e) => {
              e.preventDefault();
              navigate("/admin-portal/account-settings");
            }}
          >
            <FiSettings size={18} className="me-2" />
            Account Settings
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logoutUser}>
            <FiLogOut size={18} className="me-2" />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
};

const Header: React.FC<{
  children: any;
  expand: any;
  containerClassName?: any;
}> = ({ children, expand, containerClassName = "" }) => {
  return (
    <Navbar
      className="shadow"
      expand={expand}
      bg="white"
      variant="white"
      fixed="top"
    >
      <Container fluid className={containerClassName}>
        {children}
      </Container>
    </Navbar>
  );
};

export default Header;
