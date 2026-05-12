import * as React from "react";
import { Form, Row, Col, Card, Button, Badge } from "react-bootstrap";
import useUserProfileForm from "../../hooks/forms/useUserProfileForm";
import Animate from "../../components/Animate";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import validationError from "../../helpers/ValidationError";
import RequiredLabel from "../../components/form/RequiredLabel";

const AccountSettings = () => {
  const form = useUserProfileForm();
  const {
    values,
    isSubmitting,
    errorMessage,
    successMessage,
    fieldErrors,
    handleChange,
    handleCancelClick,
    handleChangePasswordClick,
    handleSubmit,
    handleBlur,
    showPasswordFields,
  } = form;

  return (
    <Row className="justify-content-center p-3">
      <Col xs={12} md={12} lg={12} xl={8} xxl={6}>
        <Animate duration={0.5} y={25}>
          <Card>
            <Card.Body className="p-4">
              <h3 className="text-center mb-4">User Account Settings</h3>
              <p className="text-center">
                Here you can change your user account related settings
              </p>
              <SuccessAlert message={successMessage} />
              <DangerAlert message={errorMessage} />
              <Form
                autoComplete="on"
                method="post"
                noValidate
                onSubmit={handleSubmit}
              >
                <Form.Group controlId="formUsername" className="mb-3 ">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className="fw-bold"
                    type="text"
                    name="username"
                    value={values?.username}
                    placeholder="Enter email"
                    autoFocus
                    readOnly
                    plaintext
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Verification</Form.Label>
                  <br />
                  {values?.is_email_verified ? (
                    <Badge bg="success">Verified</Badge>
                  ) : (
                    <Badge bg="danger">Not Verified</Badge>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Account Verification</Form.Label>
                  <br />
                  {values?.account_verified ? (
                    <Badge bg="success">Verified</Badge>
                  ) : (
                    <Badge bg="danger">Not Verified</Badge>
                  )}
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values?.email}
                    placeholder="Enter email"
                    autoFocus
                    readOnly
                    plaintext
                  />
                </Form.Group>
                <Form.Group controlId="formFirstName" className="mb-3">
                  <RequiredLabel>First Name</RequiredLabel>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={values?.first_name}
                    placeholder="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={validationError(fieldErrors, "first_name")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationError(fieldErrors, "first_name")}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formMiddleName" className="mb-3">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="middle_name"
                    value={values?.middle_name}
                    placeholder="Middle Name"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formLastName" className="mb-3">
                  <RequiredLabel>Last Name</RequiredLabel>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={values?.last_name}
                    placeholder="Last Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={validationError(fieldErrors, "last_name")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationError(fieldErrors, "last_name")}
                  </Form.Control.Feedback>
                </Form.Group>
                {/* Change Password Button */}
                {!showPasswordFields && (
                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <br />
                    <Button variant="light" onClick={handleChangePasswordClick}>
                      Change Password
                    </Button>
                  </Form.Group>
                )}

                {/* New Password + Retype Fields */}
                {showPasswordFields && (
                  <Row className="align-items-top">
                    <Form.Group controlId="newPassword" className="col-5 mb-3">
                      <RequiredLabel>New Password</RequiredLabel>
                      <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        name="newPassword"
                        autoComplete="new-password"
                        onBlur={handleBlur}
                        value={values?.newPassword}
                        onChange={handleChange}
                        isInvalid={validationError(fieldErrors, "newPassword")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationError(fieldErrors, "newPassword")}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      controlId="retypePassword"
                      className="col-5 mb-3"
                    >
                      <RequiredLabel>Retype Password</RequiredLabel>
                      <Form.Control
                        type="password"
                        placeholder="Retype new password"
                        name="retypePassword"
                        autoComplete="retypePassword"
                        value={values?.retypePassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={validationError(
                          fieldErrors,
                          "retypePassword",
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationError(fieldErrors, "retypePassword")}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Col className="col-2" style={{ marginTop: "30px" }}>
                      <Button
                        className="w-100"
                        variant="light"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                )}
                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={values?.phone}
                    placeholder="Phone"
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="d-flex gap-3 pt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Animate>
      </Col>
    </Row>
  );
};

export default AccountSettings;
