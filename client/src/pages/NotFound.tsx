import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container
      className="text-center d-flex align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Row className="w-100">
        <Col>
          <FaExclamationTriangle size={80} className="text-danger mb-4" />

          <h1 className="display-4 fw-bold">404</h1>

          <h4 className="mb-3">Page Not Found</h4>

          <p className="text-muted mb-4">
            The page you are looking for does not exist or has been moved.
          </p>

          <Button variant="primary" onClick={() => navigate("/")}>
            Go Back Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
