import * as React from "react";
import useImageScrollOnHover from "../../hooks/useImageScrollOnHover";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { Card, Row, Col, Container } from "react-bootstrap";
import UnixTimeDisplay from "./UnixTimeDisplay";

const HoverCard: React.FC<{ event: any }> = ({ event }) => {
  const { wrapperRef, imgRef, setHovered, transformStyle } =
    useImageScrollOnHover();
  const navigate = useNavigate();
  const url =
    process.env.REACT_APP_API_ENDPOINT + "/photos/" + event.event_image;

  return (
    <Card
      className="h-100 hover-shadow card-hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate("/event/" + event.event_id)}
    >
      <div className="card-image-wrapper" ref={wrapperRef}>
        <Card.Img
          variant="top"
          src={url}
          className="card-img-top"
          ref={imgRef}
          style={{ transform: transformStyle }}
        />
      </div>
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
      </Card.Body>
      <Card.Footer className={"text-muted"}>
        <SlCalender />
        <small className="ms-3">
          <UnixTimeDisplay unix={event.creation_time} />
        </small>
      </Card.Footer>
    </Card>
  );
};

const EventCards: React.FC<{ events: any }> = ({ events }) => {
  return (
    <Container>
      <Row xs={1} md={1} lg={3} className="g-4">
        {events?.length !== 0 ? (
          events?.map((event: any) => (
            <Col key={event.event_id}>
              <HoverCard event={event} />
            </Col>
          ))
        ) : (
          <Col>No Events to Display</Col>
        )}
      </Row>
    </Container>
  );
};

export default EventCards;
