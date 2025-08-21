import React, { useState } from "react";
const OffersTabs = () => {
 
const faqs = [
  {
    question: "What is the process to buy a car online?",
    answer: "You can select your car, customize options, and book online with minimal paperwork."
  },
  {
    question: "Are there financing options available?",
    answer: "Yes, we offer attractive EMI plans and loan options through partner banks."
  },
  {
    question: "Can I test drive the car before buying?",
    answer: "Absolutely! Schedule a test drive at your nearest dealership through our platform."
  },
  {
    question: "What warranty do the cars come with?",
    answer: "All new cars come with a manufacturer warranty of at least 2 years."
  }
];

  const [openIndex, setOpenIndex] = useState(0);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-4 container-fluid mx-auto px-md-5">
     
      <div className="my-4 shadow-lg">
        <div className="bg-body rounded shadow-md p-4">
          <h4 className="fw-bold mb-4">
            Experience Flying with our Airline Partners
          </h4>

          <div className="row g-4">
            {/* Air Asia */}
            <div className="col-12 col-md-6">
              <div className="overflow-hidden rounded-4">
                <img
                  src="https://platforms.makemytrip.com/contents/07e30964-bcda-4c81-873f-fbb283b1845f"
                  alt="Air Asia"
                  className="img-fluid w-100"
                  style={{ objectFit: "cover", height: "180px" }}
                />
              </div>
            </div>

            {/* Cathay Pacific */}
            <div className="col-12 col-md-6">
              <div className="overflow-hidden rounded-4">
                <img
                  src="https://platforms.makemytrip.com/contents/fb0b8518-346f-4c5d-b86e-bc520d8111cf"
                  alt="Cathay Pacific"
                  className="img-fluid w-100"
                  style={{ objectFit: "cover", height: "180px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 shadow-lg">
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="row align-items-center">
            {/* Left section */}
            <div className="col-md-7">
              <div className="d-flex align-items-center mb-3">
                <img
                  src="https://img.icons8.com/color/48/000000/downloads.png"
                  alt="Download icon"
                  className="me-2"
                  style={{ width: "48px", height: "48px" }}
                />
                <h4 className="fw-bold mb-0">Download App Now !</h4>
              </div>
              <p className="mb-3">
                Use code <strong>WELCOMEMMT</strong> and get{" "}
                <strong>FLAT 12% OFF</strong> on your first domestic flight
                booking
              </p>

              {/* Mobile input and button */}
              <div className="input-group mb-4" style={{ maxWidth: "500px" }}>
                <span className="input-group-text bg-white">
                  <img
                    src="https://flagcdn.com/w40/in.png"
                    alt="India Flag"
                    width="20"
                    className="me-1"
                  />
                  +91
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Mobile number"
                />
                <button className="btn btn-outline-primary fw-bold">
                  GET APP LINK
                </button>
              </div>

              {/* App download buttons */}
              <div className="d-flex gap-3">
                <a href="#" target="_blank" rel="noreferrer">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
                    alt="Google Play"
                    height="40"
                  />
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="App Store"
                    height="40"
                  />
                </a>
              </div>
            </div>

            {/* QR code section */}
            <div className="col-md-5 text-md-end text-center mt-4 mt-md-0">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://your-app-link.com"
                alt="QR Code"
                width="150"
                height="150"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 bg-body text-center rounded shadow-lg p-4">
        <h2 className="fw-bold text-center mb-4">FAQ's</h2>
        <div className="accordion">
          {faqs.map((faq, index) => (
            <div key={index} className="border-bottom pb-3 mb-2">
              <button
                className="w-100 text-start border-0 bg-white py-1 px-0 d-flex justify-content-between align-items-center"
                onClick={() => toggleFAQ(index)}
                style={{ fontSize: "1.1rem", fontWeight: "600" }}
              >
                {faq.question}
                <i
                  className={`bi bi-chevron-${
                    openIndex === index ? "up" : "down"
                  }`}
                ></i>
              </button>
              <div
                className={`faq-answer text-start ${
                  openIndex === index ? "show" : ""
                }`}
              >
                <p className="text-muted pe-3">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersTabs;
