import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Container, Col, Image, Card, Button } from "react-bootstrap";
import { FiMapPin } from "react-icons/fi";
import { FaImages } from "react-icons/fa";
import EventCards from "../components/EventCards";
import Animate from "../components/Animate";
import UnixTimeDisplay from "../components/UnixTimeDisplay";
import EventImageGallery from "../components/EventImageGallery";
import useEvent from "../hooks/website/useEvent";
import { getEventPhotoUrl } from "../helpers/Common";
const Event = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useEvent(id);
  const response = data?.response?.message ?? {};
  const loaded = data?.loaded;
  const { event = {}, event_gallery = {}, past_events = [] } = response;
  const { event_image } = event;
  const url = getEventPhotoUrl(event_image);

  const {
    title,
    event_reg_from,
    event_reg_to,
    event_duration_from,
    event_duration_to,
    address,
    comment,
  } = event;

  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    loaded && (
      <div className="news-container">
        <Container className="pt-5">
          <Animate>
            <h2 className="mb-4">Event</h2>
          </Animate>
          <Animate delay={0.3}>
            <Card className="p-4 shadow">
              <Row>
                <Col md={12} lg={6} className="mb-4">
                  <Image
                    fluid
                    src={url}
                    alt="Example"
                    className={"w-100"}
                    onClick={() => window.open(url, "_blank")}
                    style={{ cursor: "pointer" }}
                    thumbnail
                  />
                </Col>
                <Col md={12} lg={6} className="ps-3">
                  <h3 className="mb-2">{title}</h3>
                  <br></br>
                  <p className="text-muted">
                    <b>Registration</b>:<br></br>
                    <UnixTimeDisplay unix={event_reg_from} options={options} />
                    -
                    <UnixTimeDisplay unix={event_reg_to} options={options} />
                    <br></br>
                    <b>Program Date</b>:<br></br>
                    <UnixTimeDisplay
                      unix={event_duration_from}
                      options={options}
                    />
                    -
                    <UnixTimeDisplay
                      unix={event_duration_to}
                      options={options}
                    />
                    <br></br>
                    <FiMapPin /> {address}
                    <br></br>
                    <b>Notes</b>: <br></br>
                    {comment}
                  </p>
                </Col>
              </Row>
              <Animate>
                <h4 className="mb-4 mt-5">
                  <FaImages className="me-3" />
                  Photos
                </h4>
              </Animate>
              <Row>
                <EventImageGallery event_gallery={event_gallery} />
              </Row>
              <Animate>
                <Row>
                  <Col xs={8}>
                    <h4 className="mb-4 mt-5">Past Events</h4>
                  </Col>
                  <Col xs={4}>
                    <Button
                      variant="outline-primary"
                      className="mb-4 mt-5 float-end"
                      onClick={() => navigate("/events")}
                    >
                      More Events
                    </Button>
                  </Col>
                </Row>
              </Animate>
              <Row>
                <Animate>
                  <EventCards events={past_events} />
                </Animate>
              </Row>
            </Card>
          </Animate>
        </Container>
      </div>
    )
  );
};

export default Event;
