import * as React from "react";
import {
  Row,
  Container,
  Button,
  Col,
  Form,
  Alert,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VideoModal from "../../components/modals/VideoModal";
import NewsCarousel from "../../components/public/NewsCarousel";
import EventCards from "../../components/public/EventCards";
import Animate from "../../components/Animate";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import useHome from "../../hooks/public/useHome";
import useRegisterForm from "../../hooks/forms/useRegisterForm";
import RequiredLabel from "../../components/form/RequiredLabel";
import validationError from "../../helpers/ValidationError";
import TermsAndConditionsModal from "../../components/modals/TermsAndConditionsModal";
import { AnimatedArrow } from "../../components/AnimatedArrow";

const Home = () => {
  const navigate = useNavigate();
  let { response } = useHome();
  const {
    successMessage,
    errorMessage,
    fieldErrors,
    values,
    isSubmitting,
    handleBlur,
    handleChange,
    handleChecked,
    handleSubmit,
    handleAccept,
  } = useRegisterForm();

  const heroImageUrl = `${process.env.REACT_APP_IMAGES_ENDPOINT}canada-3290310_1280.jpg`;
  console.log(values?.termsAccepted);
  return (
    <>
      <div
        id="hero"
        style={{
          display: "flex",
          flexWrap: "wrap",
          background: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.4)), url(${heroImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          width: "100%",
          position: "relative",
        }}
      >
        <div className="overlay"></div>
        <div className="content">
          <Container>
            <Row className="align-items-center">
              <Col
                xs={12}
                md={12}
                lg={6}
                xl={6}
                xxl={6}
                className="text-center text-lg-start"
              >
                <Animate>
                  <h1 className="mb-4">Rising the Family</h1>
                </Animate>
                <div>
                  <Animate delay={0.3}>
                    <p className="mb-4">
                      We are dedicated to building Carelick into a respectable
                      and reliable social institution geared towards{" "}
                      <b>caring for the needy</b>
                    </p>
                  </Animate>
                  <Animate delay={0.7}>
                    <div>
                      <VideoModal />
                      {/*<Button variant="outline-light" size="lg">
                            Donate Now
                        </Button>*/}
                    </div>
                  </Animate>
                </div>
              </Col>
              <Col className="p-5" xs={12} md={12} lg={6} xl={6} xxl={6}>
                <h2 className="text-center">Register</h2>
                <Card>
                  <Card.Body className="p-4">
                    <DangerAlert message={errorMessage} />
                    <SuccessAlert message={successMessage} />
                    <Form onSubmit={handleSubmit} method="post" noValidate>
                      <Row>
                        <Col xs={6} md={6} lg={6} xl={6} xxl={6}>
                          <Form.Group
                            controlId="formFirstName"
                            className="mb-3 "
                          >
                            <RequiredLabel>First Name</RequiredLabel>
                            <Form.Control
                              type="text"
                              name="firstName"
                              placeholder="Enter first name"
                              size="sm"
                              value={values?.firstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={validationError(
                                fieldErrors,
                                "firstName",
                              )}
                            />
                            <Form.Control.Feedback type="invalid">
                              {validationError(fieldErrors, "firstName")}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col xs={6} md={6} lg={6} xl={6} xxl={6}>
                          <Form.Group controlId="formLastName" className="mb-3">
                            <RequiredLabel>Last Name</RequiredLabel>
                            <Form.Control
                              type="text"
                              name="lastName"
                              placeholder="Enter last name"
                              size="sm"
                              value={values?.lastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={validationError(
                                fieldErrors,
                                "lastName",
                              )}
                            />
                            <Form.Control.Feedback type="invalid">
                              {validationError(fieldErrors, "lastName")}
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
                          size="sm"
                          value={values?.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={validationError(fieldErrors, "email")}
                        />
                        <Form.Control.Feedback type="invalid">
                          {validationError(fieldErrors, "email")}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Row>
                        <Col xs={6} md={6} lg={6} xl={6} xxl={6}>
                          <Form.Group controlId="formPassword" className="mb-3">
                            <RequiredLabel>Password</RequiredLabel>
                            <Form.Control
                              type="password"
                              name="password"
                              placeholder="Password"
                              size="sm"
                              value={values?.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={validationError(
                                fieldErrors,
                                "password",
                              )}
                            />
                            <Form.Control.Feedback type="invalid">
                              {validationError(fieldErrors, "password")}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col xs={6} md={6} lg={6} xl={6} xxl={6}>
                          <Form.Group
                            controlId="formConfirmPassword"
                            className="mb-3"
                          >
                            <RequiredLabel>Re-type Password</RequiredLabel>
                            <Form.Control
                              type="password"
                              name="confirmPassword"
                              placeholder="Confirm password"
                              size="sm"
                              value={values?.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={validationError(
                                fieldErrors,
                                "confirmPassword",
                              )}
                            />
                            <Form.Control.Feedback type="invalid">
                              {validationError(fieldErrors, "confirmPassword")}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                          id="termsAccepted"
                          name="termsAccepted"
                          type="checkbox"
                          className="mb-3 d-inline"
                          checked={values?.termsAccepted}
                          onMouseDown={handleChecked}
                          onBlur={handleBlur}
                        />
                        <span className="ps-2">
                          I accept the{" "}
                          <TermsAndConditionsModal onAccept={handleAccept} />
                        </span>
                        <Form.Control.Feedback
                          type="invalid"
                          className="d-block"
                        >
                          {validationError(fieldErrors, "termsAccepted")}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <div className="d-flex gap-3 pt-3">
                        <Button
                          variant="primary"
                          size="sm"
                          type="submit"
                          disabled={isSubmitting}
                          className="w-50"
                        >
                          {isSubmitting ? "Registering..." : "Register"}
                        </Button>
                        <Link to="/auth/login" className="w-50">
                          <Button variant="light" size="sm" className="w-100">
                            Login
                          </Button>
                        </Link>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <AnimatedArrow id={"our_goal"} />
        </div>
      </div>
      <div id="our_goal" className="pt-5">
        <Container>
          <Row>
            <Col>
              <h2 className="mb-4">Our Goal</h2>
              <p>
                Our goal is to make a statement that we should not forget those
                who need our support and know fully well that slogans are not
                the substitute of the performance.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="pt-5">
        <Container>
          <Row>
            <Col>
              <h2 className="mb-4">News</h2>
              <NewsCarousel news={response?.news} />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="pt-5">
        <Container>
          <Row>
            <Col xs={8}>
              <h2 className="mb-4 float-start">Upcomming Events</h2>
            </Col>
          </Row>
        </Container>
        <EventCards events={response?.upcomming_events} />
      </div>
      <div className="pt-5">
        <Container>
          <Row>
            <Col xs={8}>
              <h2 className="mb-4 float-start">Past Events</h2>
            </Col>
            <Col xs={4}>
              <Button
                variant="outline-primary"
                className="mb-4 float-end"
                onClick={() => navigate("/events")}
              >
                More Events
              </Button>
            </Col>
          </Row>
        </Container>
        <EventCards events={response?.past_events} />
      </div>
    </>
  );
};

export default Home;
