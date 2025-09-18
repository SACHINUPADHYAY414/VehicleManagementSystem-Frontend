import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Badge
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import BreadcrumbNav from "../../Components/Breadcrumb/Breadcrumb";
import api from "../../Action/Api";
import { useToastr } from "../../Components/Toastr/ToastrProvider";
import { OPPS_MSG, SERVER_ERROR, SUCCESS_MSG } from "../../Utils/strings";
import { useSelector } from "react-redux";

const Checkout = () => {
  const location = useLocation();
  const carId = location.state?.carId;
  const { customToast } = useToastr();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.login?.login_data?.user);

  const [formData, setFormData] = useState({
    userId: null,
    vehicleId: null,
    fuel: "Petrol",
    variant: "",
    color: "",
    pan: "",
    amount: 0,
    method: "UPI"
  });

  useEffect(() => {
    if (!carId) return;
    const fetchCar = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/vehicles/${carId}`);
        const carData = response.data;
        setCar(carData);

        // Update form with vehicle info
        setFormData((prev) => ({
          ...prev,
          vehicleId: carData?.id || null,
          amount: carData?.price || 0
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await api.post("/payment/initiate", formData);
      customToast({
        severity: "success",
        summary: SUCCESS_MSG,
        detail: "Booking successful!"
      });
    } catch (error) {
      customToast({
        severity: "error",
        summary: OPPS_MSG,
        detail: error.response?.data?.message || SERVER_ERROR
      });
    }
  };

  if (loading)
    return <div className="text-center py-5">Loading car details...</div>;
  if (!car) return <div className="text-center py-5">Car not found!</div>;

  return (
    <div style={{ background: "#0d0d0d", color: "#fff", minHeight: "90vh" }}>
      <Container className="py-2" style={{ minHeight: "90vh" }}>
        <BreadcrumbNav extra={[{ name: "Booking" }]} />
        <Row className="g-4 align-items-center">
          <Col md={6} className="text-center">
            <div className="p-0 m-0">
              <img
                src={
                  car?.imageUrl ||
                  "https://d31sro4iz4ob5n.cloudfront.net/upload/car/city-2024/color/lhd-lx-platinum-white-pearl/1.png?v=570974139"
                }
                alt={car?.model || "Car image"}
                style={{
                  width: "100%",
                  maxHeight: "550px",
                  objectFit: "contain",
                  display: "block",
                  margin: 0,
                  padding: 0,
                  backgroundColor: "transparent",
                  filter: "drop-shadow(0 0 5px rgba(0,0,0,0.3))"
                }}
              />
            </div>
          </Col>

          <Col md={6}>
            <Card className="bg-dark text-light border-0 shadow-lg">
              <Card.Body className="mx-2 my-2">
                <div className="mb-2 d-flex justify-content-between align-items-center">
                  <h4 className="fw-bold" style={{ letterSpacing: "1px" }}>
                    Booking Details
                  </h4>
                  <h4
                    style={{
                      fontWeight: "900",
                      background: "linear-gradient(90deg, #ff4d4d, #ff1a1a)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: "1px 1px 4px rgba(0,0,0,0.5)"
                    }}
                  >
                    <i className="bi bi-car-front-fill me-2"></i>
                    {car?.model}
                  </h4>
                </div>

                {/* Fuel */}
                <Form.Group className="mb-2">
                  <div className="d-flex gap-3">
                    {["Petrol", "Diesel"].map((fuel) => (
                      <Form.Check
                        key={fuel}
                        type="radio"
                        label={fuel}
                        name="fuel"
                        value={fuel}
                        checked={formData.fuel === fuel}
                        onChange={handleChange}
                        className="text-light"
                      />
                    ))}
                  </div>
                </Form.Group>

                {/* Variant */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-uppercase">
                    Variant
                  </Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {["SIGMA", "ZETA", "DELTA", "ALPHA"].map((v) => (
                      <Button
                        key={v}
                        variant={
                          formData.variant === v ? "danger" : "outline-light"
                        }
                        className="flex-grow-1"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, variant: v }))
                        }
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </Form.Group>

                {/* Color */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-uppercase">
                    Color
                  </Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {[
                      "Nexa Blue (Stargaze)",
                      "Arctic White",
                      "Splendid Silver",
                      "Grandeur Grey",
                      "Opulent Red",
                      "Midnight Black",
                      "Chestnut Brown"
                    ].map((c) => (
                      <Button
                        key={c}
                        variant={
                          formData.color === c ? "danger" : "outline-light"
                        }
                        className="text-light flex-grow-1"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, color: c }))
                        }
                      >
                        {c}
                      </Button>
                    ))}
                  </div>
                </Form.Group>

                {/* PAN */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-uppercase">
                    PAN Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    placeholder="Enter PAN Number"
                    className="bg-dark text-light border-secondary"
                  />
                </Form.Group>
                {/* Price */}
                <h5 className="text-end">
                  ₹ {formData.amount?.toLocaleString() || 0}
                </h5>
                {/* Submit */}
                <Button
                  onClick={handleSubmit}
                  className="w-100 fw-bold fs-5 mt-1"
                  style={{
                    background: "linear-gradient(90deg, #ff0000, #cc0000)",
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0 4px 20px rgba(255,0,0,0.6)"
                  }}
                >
                  Confirm Booking & Pay
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;
