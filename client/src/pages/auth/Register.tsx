import * as React from "react";
import { Form, Button, Row, Col, Alert, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import TermsAndConditionsModal from "../../components/modals/TermsAndConditionsModal";
import useRegisterForm from "../../hooks/forms/useRegisterForm";
import RequiredLabel from "../../components/RequiredLabel";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import validationError from "../../helpers/ValidationError";
import Animate from "../../components/Animate";

const Register = () => {
  const {
    error,
    loading,
    response,
    formData,
    isSubmitted,
    checkboxRef,
    handleBlur,
    handleChange,
    handleChecked,
    handleSubmit,
    handleAccept,
  } = useRegisterForm();

  return (
    <Row className="justify-content-center w-100">
      <Col xs={12} md={8} lg={8} xl={6} xxl={6}>
        <Animate>
          <Card>
            <Card.Body className="p-5">
              <h3 className="text-center mb-4">Register</h3>
              <p className="text-center">Register the right way</p>
              <SuccessAlert response={response} />
              <DangerAlert error={error} />
              <Form onSubmit={handleSubmit} method="post" noValidate>
                <Row>
                  <Col lg={6}>
                    <Form.Group controlId="formFirstName" className="mb-3 ">
                      <RequiredLabel>First Name</RequiredLabel>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          isSubmitted &&
                          validationError(error, "firstName", "First Name")
                        }
                        autoFocus
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationError(error, "firstName", "First Name")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group controlId="formLastName" className="mb-3">
                      <RequiredLabel>Last Name</RequiredLabel>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          isSubmitted &&
                          validationError(error, "lastName", "Last Name")
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationError(error, "lastName", "Last Name")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formEmail" className="mb-3">
                  <RequiredLabel>User Email</RequiredLabel>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      isSubmitted && validationError(error, "email", "Email")
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationError(error, "email", "Email")}
                  </Form.Control.Feedback>
                </Form.Group>
                <Row>
                  <Col lg={6}>
                    <Form.Group controlId="formPassword" className="mb-3">
                      <RequiredLabel>Password</RequiredLabel>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          isSubmitted &&
                          validationError(error, "password", "Password")
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationError(error, "password", "Password")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group
                      controlId="formConfirmPassword"
                      className="mb-3"
                    >
                      <RequiredLabel>Re-type Password</RequiredLabel>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          isSubmitted &&
                          validationError(
                            error,
                            "confirmPassword",
                            "Confirm Password",
                          )
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationError(
                          error,
                          "confirmPassword",
                          "Confirm Password",
                        )}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    id="accept-terms-checkbox"
                    name="termsAccepted"
                    ref={checkboxRef}
                    type="checkbox"
                    className="mb-3 d-inline"
                    checked={formData.termsAccepted}
                    onChange={handleChecked}
                    onBlur={handleBlur}
                  />
                  <label
                    className="ps-2"
                    htmlFor="termsAccepted"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    I accept the{" "}
                    <TermsAndConditionsModal onAccept={handleAccept} />
                  </label>
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {isSubmitted &&
                      validationError(error, "termsAccepted", "Terms Accepted")}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex gap-3 pt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="w-50"
                  >
                    {loading ? "Registering..." : "Register"}
                  </Button>
                  <Link to="/auth/login" className="w-50">
                    <Button variant="outline-primary" className="w-100">
                      Login
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

export default Register;
