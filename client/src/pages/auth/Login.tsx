import * as React from "react";
import { Form, Button, Row, Col, Alert, Card, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import useLoginForm from "../../hooks/forms/useLoginForm";
import useToggleVisibility from "../../hooks/useToggleVisibility";
import DangerAlert from "../../components/alerts/DangerAlert";
import Animate from "../../components/Animate";

const Login = () => {
  const { showPassword, togglePasswordVisibility } = useToggleVisibility();

  const { values, isSubmitting, errorMessage, handleChange, handleSubmit } =
    useLoginForm();

  return (
    <Row className="justify-content-center w-100">
      <Col xs={12} md={6} lg={6} xl={4} xxl={4}>
        <Animate duration={0.5} y={25}>
          <Card>
            <Card.Body className="p-4">
              <h3 className="text-center mb-4">Welcome</h3>
              <p className="text-center">Let's go to platform</p>
              <DangerAlert message={errorMessage} />
              <Form
                onSubmit={handleSubmit}
                autoComplete="on"
                method="post"
                noValidate
              >
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>User email</Form.Label>
                  <Form.Control
                    type="email"
                    name="username"
                    autoComplete="username"
                    placeholder="Enter email"
                    value={values?.username}
                    onChange={handleChange}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"} // Toggle between text and password
                    name="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    value={values?.password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="d-flex gap-3 pt-2">
                  <Form.Check
                    id="show-password-checkbox"
                    type="checkbox"
                    label={
                      <span style={{ cursor: "pointer" }}>Show password</span>
                    }
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                    className="w-50"
                  />
                  <Nav.Link
                    as={Link}
                    to="/auth/forgot-password"
                    className="w-auto forgot-password-link"
                  >
                    <b>
                      <u>Forgot Password?</u>
                    </b>
                  </Nav.Link>
                </div>
                <div className="d-flex gap-3 pt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-50"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                  <Link to="/auth/register" className="w-50">
                    <Button variant="light" className="w-100">
                      Register
                    </Button>
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Animate>
      </Col>
    </Row>
  );
};

export default Login;
