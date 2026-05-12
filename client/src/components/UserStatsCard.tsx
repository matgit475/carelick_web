import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FiUsers, FiUserCheck, FiUserX } from "react-icons/fi";

export default function UserStatsCard({ stats }: any) {
  return (
    <Card className="h-100 w-100">
      <Card.Body>
        <Row className="text-center">
          <Col className="border-end">
            <div className="text-muted small">Total Users</div>
            <div className="fs-4 fw-bold d-flex justify-content-center align-items-center gap-2">
              <FiUsers />
              {stats?.total_users}
            </div>
          </Col>

          <Col className="border-end">
            <div className="text-muted small">Verified</div>
            <div className="fs-4 fw-bold text-success d-flex justify-content-center align-items-center gap-2">
              <FiUserCheck />
              {stats?.verified_users}
            </div>
          </Col>

          <Col>
            <div className="text-muted small">Unverified</div>
            <div className="fs-4 fw-bold text-danger d-flex justify-content-center align-items-center gap-2">
              <FiUserX />
              {stats?.unverified_users}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
