import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedCar } from "../../Redux/buyCar";

const CarCard = ({ car }) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };
  const navigate = useNavigate();

  const handleCardClick = () => {
    dispatch(setSelectedCar(car.id));
    navigate("/checkout");
  };

  return (
    <div
      className="card position-relative"
      onClick={handleCardClick}
      style={{
        // maxWidth: "25rem",
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "transform 0.3s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.1)";
      }}
    >
      <img
        src={car.image}
        alt={car.model}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px"
        }}
      />
      <div className="card-body px-3 py-3">
        <h6
          className="card-title mb-1 text-secondary-emphasis fw-semibold justify-content-between"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
          title={`${car.brand} ${car.model}`}
        >
          <span>
            {car.brand} {car.model}
          </span>
          <i
            onClick={toggleLike}
            className={liked ? "bi bi-heart-fill" : "bi bi-heart"}
            style={{
              color: liked ? "#dc3545" : "#6c757d",
              fontSize: "1.2rem",
              cursor: "pointer"
            }}
          ></i>
        </h6>

        <p className="text-muted mb-2" style={{ fontSize: "0.85rem" }}>
          {car.fuel} &bull; {car.transmission}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="text-black fw-semibold">₹{car.price}</h6>
          <div className="form-check" style={{ fontSize: "0.9rem" }}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`compareCheck-${car.id}`}
              style={{ cursor: "pointer" }}
            />
            <label
              className="form-check-label"
              htmlFor={`compareCheck-${car.id}`}
              style={{ cursor: "pointer" }}
            >
              Compare
            </label>
          </div>
        </div>
        <hr style={{ margin: "0 0 1px 0", borderColor: "#e0e0e0" }} />
        <button
          className="btn btn-link p-0 text-decoration-none"
          style={{
            fontWeight: "700",
            color: "#dc3545",
            fontSize: "0.95rem",
            textDecoration: "none"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#a71d2a";
            e.currentTarget.style.textDecoration = "none";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#dc3545";
            e.currentTarget.style.textDecoration = "none";
          }}
        >
          View Seller Details &rarr;
        </button>
        <span
          className="text-muted"
          style={{
            fontSize: "0.8rem",
            display: "flex",
            alignItems: "center"
          }}
        >
          <i
            className="bi bi-geo-alt-fill"
            style={{
              marginRight: "6px",
              fontSize: "0.9rem",
              color: "#6c757d"
            }}
          ></i>
          {car.location}
        </span>
      </div>
    </div>
  );
};

export default CarCard;
