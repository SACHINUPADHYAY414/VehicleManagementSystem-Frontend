import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const PerfectCarSection = () => {
  return (
    <section className="perfect-car-section d-flex align-items-center">
      <div className="overlay"></div>
      <Container>
        <Row className="align-items-center">
          {/* Left side - Text */}
          <Col xs={12} md={6} className="text-white text-center text-md-start px-4 px-md-5">
            <h1 className="display-5 fw-bold mb-3">
              Discover Your <br /> Perfect Car
            </h1>
            <p className="lead mb-4">
              Take a short quiz and discover the ideal car tailored for your lifestyle
            </p>
            <a href="/help-me-select" className="btn custom-btn">
              Help Me Select
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PerfectCarSection;
