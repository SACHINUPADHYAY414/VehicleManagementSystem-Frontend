import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";

const VideoSection = ({
  videoSrc,
  overlayOpacity = 0.1,
  children,
  containerClass = "ps-4"
}) => {
  return (
    <div className="position-relative text-white vh-100 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div
        className="position-absolute top-0 start-0 w-100 h-100 bg-dark"
        style={{ opacity: overlayOpacity }}
      ></div>

      <Container
        className={`custom-font-size h-100 position-relative z-1 d-flex flex-column justify-content-center ${containerClass}`}
      >
        {children}
      </Container>
    </div>
  );
};

const CardSlider = ({ cards }) => (
  <div
    className="position-absolute bottom-0 end-0 z-1 p-4"
    style={{ maxWidth: "100%", overflowX: "auto" }}
  >
    <div className="d-flex gap-3">
      {cards.map(({ imgSrc, alt, title }, i) => (
        <div key={i} style={{ width: "200px" }}>
          <img
            src={imgSrc}
            alt={alt}
            className="img-fluid rounded"
            style={{
              height: "150px",
              width: "100%",
              objectFit: "cover",
              borderRadius: "10px"
            }}
          />
          <p className="fw-bold mt-2 text-white">{title}</p>
        </div>
      ))}
    </div>
  </div>
);

// Updated ContentSection with cycling background images
const ContentSection = ({
  title,
  subtitle,
  features,
  bgImages,
  className,
  overlay
}) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    if (!bgImages || bgImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bgImages]);

  const currentBgImage =
    bgImages && bgImages.length > 0 ? bgImages[currentBgIndex] : "";

  const sectionStyle = {
    backgroundImage: `url(${currentBgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    position: "relative",
    fontFamily: '"Segoe UI", sans-serif'
  };

  return (
    <section className={className} style={sectionStyle}>
      <div className={overlay}>
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="col-md-5 content-box">
              {subtitle && (
                <strong className="fst-italic text-light mb-2">
                  {subtitle}
                </strong>
              )}
              <h1 className="main-heading">{title}</h1>
              {features && (
                <ul className="feature-list mt-4 mb-4">
                  {features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col-md-7 d-none d-md-block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CarFeatures = () => {
  // Cards for second page
  const cardsData = [
    {
      imgSrc:
        "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:4197df38-512a-4b57-b152-1cfcb36818ac/as/POLYHEDRAL-MUSCULAR-STANCE.png?width=750&id=1&preferwebp=true",
      alt: "Polyhedral Muscular Stance",
      title: "Polyhedral Muscular Stance"
    },
    {
      imgSrc:
        "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:0c15058b-88e9-4005-86c8-873ee506c742/as/FUTURISTIC-FRONT-FASCIA.png?width=750&id=1&preferwebp=true",
      alt: "Futuristic Front Fascia",
      title: "Futuristic Front Fascia"
    },
    {
      imgSrc:
        "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:db8f2ec3-3e3a-4aa5-9a8c-7c49e58fdb46/as/R18-AERODYNAMIC-ALLOYS-.png?width=750&id=1&preferwebp=true",
      alt: "R18 Aerodynamic Alloys",
      title: "R18 Aerodynamic Alloys"
    },
    {
      imgSrc:
        "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:d893818b-886a-4bb9-8f6f-63d5d36c3906/as/NEXTR%C3%88-3-POINT-MATRIX-LED-DRLs-.png?width=750&id=1&preferwebp=true",
      alt: "NEXTre 3-Point DRLs",
      title: "NEXTre 3-Point DRLs"
    }
  ];

  // Content sections with multiple background images for cycling
  const contentSections = [
    {
      className: "comfort-section",
      overlay: "comfort-overlay",
      subtitle: "Imagine",
      title: "Comfort Like Never Before",
      features: [
        "Long Wheelbase",
        "Ventilated Seats",
        "10-Way Power Adjustable Driver’s Seat",
        "Sliding And Reclining Rear Seats",
        "40-20-40 Rear Seat",
        "Flexible Boot Space"
      ],
      bgImages: [
        "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:5df7f7f5-e61a-481c-9b00-09f8e9e85413/as/C1_AR_BP_NEXA_E-VITARA_LONGER-WHEELBASE_03.png?width=750&id=1&preferwebp=true"
      ]
    },
    {
      className: "beast-section",
      overlay: "beast-overlay",
      subtitle: "Performs",
      title: "Like A Beast",
      features: [
        "Pure Electric Platform",
        "Advanced Aerodynamics",
        "Driving Performance"
      ],
      bgImages: [
        "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:c6522fd9-a377-4795-b3c7-bf3ae05f0474/as/AR_AB_EVITARA_AERODYNAMIC_SHOT_OUTDOOR_04-copy-2.jpg?height=1687&width=750&id=1&preferwebp=true",
        "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:5bc3400e-55cc-4983-ade3-372c64063b29/as/YY8_AssetRework_Template.jpg?height=1687&width=750&id=1&preferwebp=true"
      ]
    },
    {
      className: "Safety-section",
      overlay: "Safety-overlay",
      subtitle: "Safety",
      title: "Beyond Imagination",
      features: ["High Capacity Battery", "ADAS Level 2", "Safety Tech"],
      bgImages: [
        "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:dd526c4c-3602-415a-8524-df7245b89752/as/AR_BP_NEXA_E-VITARA_E_GRID_BATTERY_03-copy-2.jpg.png?width=750&id=1&preferwebp=true",
        "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:f6aace7c-7ce7-42cf-a200-c146a4f2fbff/as/ADAS-Hero-Image.jpg?height=3411&width=750&id=1&preferwebp=true"
      ]
    },

    {
      className: "charging-section",
      overlay: "charging-overlay",
      subtitle: "charging the future with sustainable eco-solution",
      title: "e for me",
      features: ["Home Charger", "Fast Charger", "Service On Wheels"],
      bgImages: [
        " https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:962ca924-5177-478c-8657-7b02b610c18b/as/Shot_03_CMYK.jpg?height=4500&width=750&id=1&preferwebp=true"
      ]
    }
  ];

  const cabinDetaisl = [
    {
      imgSrc:
        "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:a8bdc8ec-97df-4bfa-8bdc-c5df4ef6988f/as/AMBIENT-LIGHTING-WITH-MULTI-COLOUR-ILLUMINATION.png?width=750&id=1&preferwebp=true",
      alt: "Ambient Lighting with Multi Color illumination",
      title: "Ambient Lighting with Multi Color illumination"
    },
    {
      imgSrc:
        "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:e0e39eb4-c5ae-4da8-924d-9fd859ece4db/as/26.04-cm-MULTI-INFORMATION-DISPLAY.png?width=750&amp;id=1&amp;preferwebp=true",
      alt: "24.4 cm Multi information Display",
      title: "24.4 cm Multi information Display"
    },
    {
      imgSrc:
        "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:3bd0df62-c2c7-49bb-a26f-293a86a14c78/as/AR-AM-E-Vitara-2024-Floating-console-driver-side-SHOT--v3-copy-2.jpg?height=2731&width=750&id=1&preferwebp=true",
      alt: "Twindeck Floating Console With Shift By Wire",
      title: "Twindeck Floating Console With Shift Wire"
    },
    {
      imgSrc:
        "https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:4c19eb62-f66d-4c8a-96a9-a20776b36fe7/as/AR_BP_NEXA_E-VITARA_BROUCHER_SHOT_INTERIOR_02_V5_TIFF-copy-2.jpg?height=3000&width=750&id=1&preferwebp=true",
      alt: "Digital Cockpit Experience",
      title: "Digital Cockpit Experience"
    }
  ];

  return (
    <div>
      {/* First Page */}
      <VideoSection videoSrc="https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:82826289-cc2c-471c-baeb-48a4e8096b57/renditions/original/as/YY8%2030SEC%20A%20BROKER%20and%20DRUMMER%20CLEAN%20HD%20NEW.mp4">
        <h2 className="fw-light">Introducing The Electric SUV</h2>
        <img
          src="https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:362d415d-9d9e-4bd4-9e84-8c9327f521b0/as/e-vitara-logo-6.svg"
          alt="eVitara Logo"
          className="mb-3 hero-logo"
        />
        <p className="lead fst-italic">Spark Your eMagination</p>

        <div className="d-flex gap-4 mt-4">
          <div>
            <div className="fw-bold">Pure Electric</div>
            <div className="text-uppercase small">Platform</div>
          </div>
          <div>
            <div className="fw-bold">61 kWh</div>
            <div className="text-uppercase small">Battery</div>
          </div>
          <div>
            <div className="fw-bold">500 km*</div>
            <div className="text-uppercase small">Range</div>
          </div>
        </div>

        <div>
          <Button variant="light" className="mt-4 fw-bold rounded-pill px-4">
            Register your interest →
          </Button>
        </div>
      </VideoSection>

      {/* Second Page */}
      <VideoSection
        videoSrc="https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:82826289-cc2c-471c-baeb-48a4e8096b57/renditions/original/as/YY8%2030SEC%20A%20BROKER%20and%20DRUMMER%20CLEAN%20HD%20NEW.mp4"
        overlayOpacity={0.1}
        containerClass="ps-4"
      >
        <div>
          <h1 className="display-4 fw-bold">Polyhedral Muscular Stance</h1>
          <p className="lead">
            Shaped by aerodynamics. Designed by your imagination.
          </p>
        </div>
        <CardSlider cards={cardsData} />
      </VideoSection>

      {/* third page */}
      <VideoSection
        videoSrc="https://www.nexaexperience.com/adobe/assets/urn:aaid:aem:82826289-cc2c-471c-baeb-48a4e8096b57/renditions/original/as/YY8%2030SEC%20A%20BROKER%20and%20DRUMMER%20CLEAN%20HD%20NEW.mp4"
        overlayOpacity={0.5}
        containerClass="ps-4"
      >
        <div>
          <h1 className="display-4 fw-bold">
            Experience interiors that radiate luxury and exclusivity.
          </h1>
          <p className="lead">
            Experience interiors that radiate luxury and exclusivity.
          </p>
        </div>
        <CardSlider cards={cabinDetaisl} />
      </VideoSection>

      {/* Other Content Sections */}
      {contentSections.map(
        ({ className, subtitle, title, features, bgImages, overlay }, idx) => (
          <ContentSection
            key={idx}
            className={className}
            subtitle={subtitle}
            title={title}
            features={features}
            bgImages={bgImages}
            overlay={overlay}
          />
        )
      )}
    </div>
  );
};

export default CarFeatures;
