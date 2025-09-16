import * as React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header: React.FC<{ children: any }> = ({ children }) => {
  return (
    <Navbar
      className="shadow"
      expand="lg"
      bg="white"
      variant="white"
      fixed="top"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            width="200px"
            src="http://localhost/carelick_web/server/photos/transparent-logo.png"
          />
        </Navbar.Brand>
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
      </Container>
    </Navbar>
  );
};

export default Header;
