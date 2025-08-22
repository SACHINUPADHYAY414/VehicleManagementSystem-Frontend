import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const PerfectCarSection = () => {
  const images = [
    "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:b13fd368-c906-4996-b028-3a38cc3590d1/as/Home-page_Travel.png?width=2000&id=1&preferwebp=true",
    "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:cee4eb66-44fb-49a3-ac91-2d35c9a14401/as/Home-page_music.png?width=2000&id=1&preferwebp=true",
    "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:5eecc5aa-9573-4f8f-baa1-cb01e96fb284/as/Home-page_lifestyle.png?width=750&id=1&preferwebp=true"
  ];

  const [currentImage, setCurrentImage] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="perfect-car-section d-flex align-items-center">
        <div className="overlay"></div>
        <Container>
          <Row className="align-items-center">
            {/* Left side - Text */}
            <Col
              xs={12}
              md={6}
              className="text-white text-center text-md-start px-4 px-md-5"
            >
              <h1 className="display-5 fw-bold mb-3">
                Discover Your <br /> Perfect Car
              </h1>
              <p className="lead mb-4">
                Take a short quiz and discover the ideal car tailored for your
                lifestyle
              </p>
              <a href="/help-me-select" className="btn custom-btn">
                Help Me Select
              </a>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="custom-hero-section container-fluid">
        <div className="row align-items-center">
          {/* Left Text Section */}
          <div className="custom-hero-text col-12 col-md-6 mb-4 mb-md-0">
            <h5>
              <em>Discover the</em>
            </h5>
            <h1>NEXA World</h1>
            <p>
              Immerse yourself in inspiration. NEXA creates unparalleled
              experiences in travel, music, lifestyle and limitless
              possibilities that can ignite your imagination
            </p>
            <a href="#" className="btn custom-btn-outline-light">
              Explore NEXA World
            </a>
          </div>

          {/* Right Image Section */}
          <div className="custom-hero-img col-12 col-md-6 text-center">
            <img
              src={images[currentImage]}
              alt="Nexa World"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PerfectCarSection;
