import React from "react";
import { NavLink } from "react-router-dom";
import { COMPANY_NAME } from "../../Utils/strings";

const footerData = {
  columns: [
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" }
      ]
    },
    {
      title: "Sell Your Car",
      links: [
        { name: "Sell My Car", path: "/sell-car" },
        { name: "Car Valuation", path: "/car-valuation" },
        { name: "How It Works", path: "/how-it-works" },
        { name: "Dealer Locator", path: "/dealers" }
      ]
    },
    {
      title: "Buy Cars",
      links: [
        { name: "New Cars", path: "/new-cars" },
        { name: "Used Cars", path: "/used-cars" },
        { name: "Car Financing", path: "/financing" },
        { name: "Car Reviews", path: "/reviews" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "FAQs", path: "/faqs" },
        { name: "Help Center", path: "/help" },
        { name: "Terms & Conditions", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" }
      ]
    }
  ],
  logo: "/images/VehicleHub-logo.png",
  description: `${COMPANY_NAME} offers the best platform to buy and sell cars with ease, trusted dealers, and hassle-free financing options.`,
  appBadges: [
    { href: "#", imgSrc: "/assets/PlayStore.png", alt: "Google Play" },
    { href: "#", imgSrc: "/assets/AppStore.png", alt: "App Store" }
  ],
  qrCode: "/assets/Qr.png",
  copyright: `© 2025 ${COMPANY_NAME} All rights reserved.`
};

const Footer = () => {
  return (
    <footer className="position-relative text-white">
      {/* Background video */}
      <video
        className="position-absolute top-0 start-0 w-100 h-100"
        autoPlay
        loop
        muted
        playsInline
        poster="https://res.cloudinary.com/dt9kb92su/image/upload/v1757514344/13495-248644905_myuek5.jpg"
        style={{ objectFit: "cover", zIndex: -1 }}
      >
        <source
          src="https://res.cloudinary.com/dt9kb92su/video/upload/v1757514344/13495-248644905_myuek5.mp4"
          type="video/mp4"
        />
      </video>

      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: -1 }}
      ></div>

      <div className="container d-flex flex-column justify-content-center align-items-center">
        <div className="d-none d-md-block w-100 mt-4">
          <div className="d-flex justify-content-between">
            {footerData.columns.map((col, idx) => (
              <div key={idx} style={{ flexBasis: "10%" }}>
                <h6 className="fw-semibold text-white mb-2">{col.title}</h6>
                <ul className="list-unstyled">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="mb-2">
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          "nav-link small px-0" +
                          (isActive ? " text-primary" : " text-white-50")
                        }
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <hr className="border-secondary mt-0" />
        </div>

        {/* Bottom Row */}
        <div className="d-none d-md-block w-100">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex flex-column align-items-start">
                <h5 className="mb-0 fw-bold">{COMPANY_NAME}</h5>
                <p className="small text-white-50 mb-0">
                  {footerData.description}
                </p>
              </div>
            </div>

            <div className="col-md-6 d-flex flex-column flex-md-row align-items-center justify-content-md-end gap-4 mt-3 mt-md-0">
              <div>
                <p className="small fw-semibold mb-1">
                  Download {COMPANY_NAME} App
                </p>
                <div className="d-flex gap-2">
                  {footerData.appBadges.map((badge, idx) => (
                    <a key={idx} href={badge.href}>
                      <img
                        src={badge.imgSrc}
                        alt={badge.alt}
                        style={{ height: "36px" }}
                        className="img-fluid"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-center d-flex flex-column justify-content-md-end align-items-center">
                <p className="small fw-semibold mb-1">SCAN QR CODE</p>
                <img
                  src={footerData.qrCode}
                  alt="QR"
                  className="img-fluid"
                  style={{ height: "50px", filter: "invert(100%)" }}
                />
              </div>
            </div>
          </div>

          <hr className="border-secondary my-1" />
        </div>

        {/* Mobile copyright remains as is */}
        <div className="text-center text-white-50 small d-block d-md-none py-1">
          {footerData?.copyright}
          <div className="d-flex justify-content-center align-items-center mt-1">
            <span>Created by&nbsp;</span>
            <NavLink
              to="https://portfoliosachinkumar.vercel.app/"
              className="text-decoration-none nav-link p-0"
            >
              Sachin Upadhyay
            </NavLink>
          </div>
        </div>
        {/* Desktop copyright - placed here between */}
        <div className="d-none small text-white-50 d-md-flex justify-content-between align-items-center w-100 py-2">
          <div>{footerData.copyright}</div>
          <div className="text-center ms-3 d-flex">
            Created by{" "}
            <NavLink
              to="https://portfoliosachinkumar.vercel.app/"
              className="ms-1 text-decoration-none nav-link"
            >
              Sachin Upadhyay
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
