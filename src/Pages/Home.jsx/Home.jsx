import AnimatedLanding from "../../AnimatedLanding/AnimatedLanding";
import WhyBookWithUs from "../../Components/WhyBookWithUs/WhyBookWithUs";
import CarFiltters from "../CarFiltters/CarFiltters";
import ExclusiveOffers from "../ExclusiveOffers/ExclusiveOffers";
import { Row, Col, Button } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <div className="hero-section container-fluid">
        <Row className="h-100">
          <Col
            xs={12}
            md={6}
            className="d-flex flex-column justify-content-center align-items-start text-white p-5"
          >
            <img
              src="https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:362d415d-9d9e-4bd4-9e84-8c9327f521b0/as/e-vitara-logo-6.svg"
              alt="eVitara Logo"
              className="mb-3 hero-logo"
            />
            <p className="lead fst-italic">Spark Your eMagination</p>

            <div className="d-flex flex-column flex-md-row gap-3 mt-4 w-100">
              <Button variant="light" size="md" className="custom-btn-primary">
                Explore Now
              </Button>
              <Button
                variant="outline-light"
                size="md"
                className="custom-btn-outline"
                href="/configurator/e-vitara"
                target="_blank"
                rel="noopener noreferrer"
              >
                Build Your Own
              </Button>
            </div>

            <p className="mt-3 small fst-italic">
              <a href="#" className="text-white text-decoration-underline">
                *T&C apply
              </a>
            </p>
          </Col>

          {/* RIGHT SIDE: Video */}
          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-center align-items-center p-0"
          >
            <video
              className="side-video"
              src="https://marutisuzuki.scene7.com/is/content/maruti/E_vitara_homepage_phone_15_05"
              autoPlay
              muted
              loop
              playsInline
              poster="https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:2127be03-c5f2-4fd3-a22f-9487828eaa79/as/evitara-updated-31-3-desktop_image.png?width=2000&id=1&preferwebp=true"
            ></video>
          </Col>
        </Row>
      </div>
      <div
        className="justify-content-center align-items-center"
        style={{
          height: "80vh",
          backgroundImage: 'url("/public/assets/landingBg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      ></div>
      <div className="mt-sm-2">
        <AnimatedLanding />
        <CarFiltters />
        <ExclusiveOffers />
        <WhyBookWithUs />
      </div>
    </>
  );
};

export default Home;
