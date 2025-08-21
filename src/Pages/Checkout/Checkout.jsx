import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Form
} from "react-bootstrap";
import BreadcrumbNav from "../../Components/Breadcrumb/Breadcrumb";
import { cars } from "../../data/carsData";
import { MdEventSeat } from "react-icons/md";
import { SiTransmission } from "react-icons/si";
import { OPPS_MSG, SERVER_ERROR, SUCCESS_MSG } from "../../Utils/strings";
import { useToastr } from "../../Components/Toastr/ToastrProvider";
import api from "../../Action/Api";
import { useSelector } from "react-redux";

const Checkout = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const carId = useSelector((state) => state.selectedCar.carId);
  const { customToast } = useToastr();
  const [car, setCar] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  const gst = 200;

  const [formData, setFormData] = useState({
    userId: 7,
    vehicleId: null,
    amount: 0,
    method: "UPI"
  });

  const coupons = [
    {
      code: "DISC10",
      description: "10% off on base fare",
      badgeProps: { bg: "success", text: "light" }
    },
    {
      code: "DISC11",
      description: "15% off on base fare",
      badgeProps: { bg: "success", text: "light" }
    }
  ];

  const [selectedCoupon, setSelectedCoupon] = useState("");

  useEffect(() => {
    if (carId) {
      const foundCar = cars.find((c) => c.id === carId);
      if (foundCar) {
        const matchedCoupon = coupons.find(
          (coupon) => coupon.code === selectedCoupon
        );
        const discount = matchedCoupon
          ? parseInt(matchedCoupon.description.match(/(\d+)%/)[1], 10)
          : 0;

        setCar({ ...foundCar, features: foundCar.features || [] });

        const discountedPrice = foundCar.price * (1 - discount / 100);
        const total = discountedPrice + gst;

        setFormData((prev) => ({
          ...prev,
          vehicleId: foundCar.id,
          amount: total
        }));

        setDiscountPercent(discount);
      } else {
        setCar(null);
      }
    }
  }, [carId, selectedCoupon]);

  const applyCoupon = (code) => {
    setSelectedCoupon(code);
  };

  useEffect(() => {
    if (carId) {
      const foundCar = cars.find((c) => c.id === carId);
      setCar(foundCar || null);
    }
  }, [carId]);

  if (!carId) return <div>Please select a car first!</div>;
  if (!car) return <div>Loading car details...</div>;

  const discountedPrice = car.price * (1 - discountPercent / 100);
  const totalPrice = discountedPrice + gst;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: formData.userId,
      vehicleId: formData.vehicleId,
      amount: totalPrice,
      method: formData.method
    };

    try {
      await api.post("/payment/initiate", payload);

      customToast({
        severity: "success",
        summary: SUCCESS_MSG,
        detail: "Payment initiated successfully.",
        life: 3000,
        sticky: false,
        closable: true
      });
    } catch (error) {
      customToast({
        severity: "error",
        summary: OPPS_MSG,
        detail: error.response?.data?.message || error.message || SERVER_ERROR,
        life: 3000,
        sticky: false,
        closable: true
      });
    }
  };

  return (
    <Container className="py-4">
      <BreadcrumbNav extra={[{ name: "Payment" }]} />

      <Row>
        <Col md={4}>
          <div className="d-flex flex-wrap gap-3 align-items-center rounded mb-3">
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              style={{
                width: "100%",
                maxHeight: "31.5vh",
                objectFit: "cover",
                borderRadius: "0.5rem"
              }}
            />
          </div>

          <Card className="mb-3">
            <Card.Header className="bg-info text-white fw-bold">
              Offers & Promo Code
            </Card.Header>
            <Card.Body>
              {coupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className={`p-2 mt-2 border rounded ${
                    selectedCoupon === coupon.code ? "border-info" : "bg-light"
                  }`}
                >
                  <Form.Check
                    type="radio"
                    id={`coupon-${coupon.code}`}
                    name="couponRadio"
                    value={coupon.code}
                    label={
                      <>
                        <Badge
                          bg={coupon.badgeProps.bg}
                          text={coupon.badgeProps.text || ""}
                          className="me-2"
                        >
                          {coupon.code}
                        </Badge>
                        {coupon.description}
                      </>
                    }
                    checked={selectedCoupon === coupon.code}
                    onChange={() => applyCoupon(coupon.code)}
                  />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Header className="bg-info text-white fw-bold d-flex gap-3">
              <span
                className={`${
                  activeTab === "overview" ? "active fw-bold text-black" : ""
                }`}
                onClick={() => setActiveTab("overview")}
                style={{ cursor: "pointer", userSelect: "text" }}
              >
                Overview
              </span>

              <span
                className={`nav-link ${
                  activeTab === "specsFeatures"
                    ? "active fw-bold text-black"
                    : ""
                }`}
                onClick={() => setActiveTab("specsFeatures")}
                style={{ cursor: "pointer", userSelect: "text" }}
              >
                Specs & Features
              </span>
            </Card.Header>

            <Card.Body>
              {activeTab === "overview" && (
                <div>
                  <h6 className="fw-bold mb-3">Car Overview</h6>
                  <Row className="gy-3">
                    <Col xs={12} sm={6}>
                      <strong>Name:</strong> {car.brand}
                    </Col>
                    <Col xs={12} sm={6}>
                      <strong>Model:</strong> {car.model}
                    </Col>
                    <Col xs={12} sm={6}>
                      <strong>Fuel Type:</strong> {car.fuelType}
                    </Col>
                    <Col xs={12} sm={6}>
                      <MdEventSeat className="me-2" />
                      <strong>Seats:</strong> {car.seats}
                    </Col>
                    <Col xs={12} sm={6}>
                      <strong>Engine:</strong> {car.engineDisplacement}
                    </Col>
                    <Col xs={12} sm={6}>
                      <SiTransmission className="me-2" />
                      <strong>Transmission:</strong> {car.transmission}
                    </Col>
                  </Row>
                </div>
              )}

              {activeTab === "specsFeatures" && (
                <div>
                  <h6 className="fw-bold mb-2">Specs & Features</h6>
                  <ul>
                    {(car.features || []).map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="mt-3 shadow-sm">
            <Card.Header className="bg-info text-white fw-bold">
              Price Summary
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>Car Price</Col>
                <Col className="text-end">₹{car.price.toFixed(0)}</Col>
              </Row>
              {discountPercent > 0 && (
                <Row>
                  <Col>Discount ({discountPercent}%)</Col>
                  <Col className="text-end text-success">
                    -₹{((car.price * discountPercent) / 100).toFixed(0)}
                  </Col>
                </Row>
              )}
              <Row>
                <Col>GST</Col>
                <Col className="text-end">₹{gst}</Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <strong>Grand Total</strong>
                </Col>
                <Col className="text-end text-danger fw-bold">
                  ₹{totalPrice.toFixed(0)}
                </Col>
              </Row>

              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="info"
                  className="text-light"
                  onClick={handleSubmit}
                  type="button"
                >
                  Confirm Booking & Pay
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
