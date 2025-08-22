import AnimatedLanding from "../../AnimatedLanding/AnimatedLanding";
import WhyBookWithUs from "../../Components/WhyBookWithUs/WhyBookWithUs";
import CarFiltters from "../CarFiltters/CarFiltters";
import ExclusiveOffers from "../ExclusiveOffers/ExclusiveOffers";
import { Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <div className="hero-section position-relative">
        {/* LEFT CONTENT */}
        <div className="hero-overlay-content text-white">
          <img
            src="https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:362d415d-9d9e-4bd4-9e84-8c9327f521b0/as/e-vitara-logo-6.svg"
            alt="eVitara Logo"
            className="mb-3 hero-logo"
          />
          <p className="lead fst-italic">Spark Your eMagination</p>
          <p className="small fst-italic">
            <a href="#" className="text-white text-decoration-underline">
              *T&C apply
            </a>
          </p>
        </div>

        {/* VIDEO */}
        <video
          className="background-video"
          src="https://marutisuzuki.scene7.com/is/content/maruti/E_vitara_homepage_phone_15_05"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:2127be03-c5f2-4fd3-a22f-9487828eaa79/as/evitara-updated-31-3-desktop_image.png?width=2000&id=1&preferwebp=true"
        ></video>
      </div>

      <div
        className="justify-content-center align-items-center"
        style={{
          height: "80vh",
          backgroundImage: 'url("/assets/landingBg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      ></div>

      <div>
        <AnimatedLanding />
        <CarFiltters />
        <ExclusiveOffers />
        <WhyBookWithUs />
      </div>
    </>
  );
};

export default Home;
