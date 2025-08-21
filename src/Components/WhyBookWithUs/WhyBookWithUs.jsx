import React from "react";

const WhyBuyFromUs = () => {
  return (
    <div className="container-fluid mx-auto px-md-5 py-3">
      <h2 className="fw-bold text-center mb-5">Why Buy From Us?</h2>

      <div className="row text-center mb-2 position-relative">
        {/* Feature 1 */}
        <div className="col-6 col-md-3 mb-2">
          <img
            src="https://img.icons8.com/fluency/48/discount.png"
            alt="Best Prices"
            className="mb-3"
          />
          <h5 className="fw-bold">Unbeatable Prices</h5>
          <p className="text-white small fw-semibold">
            Get the best deals and value for money on top car models.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="col-6 col-md-3 mb-2">
          <img
            src="https://img.icons8.com/fluency/48/car-rental.png"
            alt="Wide Selection"
            className="mb-2"
          />
          <h5 className="fw-bold">Wide Car Selection</h5>
          <p className="text-white small fw-semibold">
            Choose from 1000+ new and used cars across all major brands.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="col-6 col-md-3 mb-2">
          <img
            src="https://img.icons8.com/fluency/48/security-checked.png"
            alt="Verified Cars"
            className="mb-2"
          />
          <h5 className="fw-bold">Certified & Verified</h5>
          <p className="text-white small fw-semibold">
            All cars are inspected and certified by experts before listing.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="col-6 col-md-3 mb-2">
          <img
            src="https://img.icons8.com/fluency/48/thumb-up.png"
            alt="Trusted"
            className="mb-2"
          />
          <h5 className="fw-bold">Trusted by Thousands</h5>
          <p className="text-white small fw-semibold">
            Join 50K+ happy customers who’ve found their perfect car with us.
          </p>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="row">
        <div className="col-md-3 mb-2">
          <div className="card shadow-sm border-0 p-3 h-100">
            <div className="d-flex align-items-center mb-2">
              <img
                src="https://img.icons8.com/color/48/000000/star.png"
                height="20"
                alt="star"
              />
              <span className="ms-2 text-muted small fw-semibold">Verified</span>
            </div>
            <h6 className="fw-bold">Smooth car delivery</h6>
            <p className="small text-muted mb-0">
              My new car was delivered quickly and in perfect condition!
            </p>
            <span className="text-muted small fw-semibold">
              Neha, 2 hours ago
            </span>
          </div>
        </div>

        <div className="col-md-3 mb-2">
          <div className="card shadow-sm border-0 p-3 h-100">
            <div className="d-flex align-items-center mb-2">
              <img
                src="https://img.icons8.com/color/48/000000/star.png"
                height="20"
                alt="star"
              />
              <span className="ms-2 text-muted small fw-semibold">Verified</span>
            </div>
            <h6 className="fw-bold">Best price in the market</h6>
            <p className="small text-muted mb-0">Got my SUV at a great deal.</p>
            <span className="text-muted small fw-semibold">
              Rohan, 4 hours ago
            </span>
          </div>
        </div>

        <div className="col-md-3 mb-2">
          <div className="card shadow-sm border-0 p-3 h-100">
            <div className="d-flex align-items-center mb-2">
              <img
                src="https://img.icons8.com/color/48/000000/star.png"
                height="20"
                alt="star"
              />
              <span className="ms-2 text-muted small fw-semibold">Verified</span>
            </div>
            <h6 className="fw-bold">Excellent support team</h6>
            <p className="small text-muted mb-0">
              Very helpful in guiding me through my purchase.
            </p>
            <span className="text-muted small fw-semibold">
              Anjali, 6 hours ago
            </span>
          </div>
        </div>

        <div className="col-md-3 mb-2">
          <div className="card shadow-sm border-0 p-3 h-100">
            <div className="d-flex align-items-center mb-2">
              <img
                src="https://img.icons8.com/color/48/000000/star.png"
                height="20"
                alt="star"
              />
              <span className="ms-2 text-muted small fw-semibold">Verified</span>
            </div>
            <h6 className="fw-bold">Easy financing options</h6>
            <p className="small text-muted mb-0">
              The EMI plans made it affordable for me.
            </p>
            <span className="text-muted small fw-semibold">
              Raj, 7 hours ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyBuyFromUs;
