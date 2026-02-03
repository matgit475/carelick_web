import * as React from "react";
import { Row, Container, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import VideoModal from "../../components/modals/VideoModal";
import NewsCarousel from "../../components/public/NewsCarousel";
import EventCards from "../../components/public/EventCards";
import Animate from "../../components/Animate";
import useHome from "../../hooks/public/useHome";

const Home = () => {
  const navigate = useNavigate();
  let { response } = useHome();
  const heroImageUrl = `${process.env.REACT_APP_IMAGES_ENDPOINT}canada-3290310_1280.jpg`;

  return (
    <>
      <div
        id="hero"
        style={{
          background: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.4)), url(${heroImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "600px",
          width: "100%",
          position: "relative",
        }}
      >
        <div className="overlay"></div>
        <div className="content">
          <Container>
            <Row>
              <Col>
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
            </Row>
          </Container>
        </div>
      </div>
      <div className="pt-5">
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
