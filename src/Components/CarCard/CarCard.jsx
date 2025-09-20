import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedCar } from "../../Redux/buyCar";

const CarCard = ({ car }) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  const handleCardClick = () => {
    dispatch(setSelectedCar(car.id));
    navigate("/checkout", { state: { carId: car.id } });
  };

  return (
    <div
      className="card position-relative h-100"
      onClick={handleCardClick}
      style={{
        width: "100%",
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
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden"
        }}
      >
        <img
          src={
            car.imageUrl ||
            "https://imgd.aeplcdn.com/1280x720/n/cw/ec/106815/creta-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80"
          }
          alt={car.model}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        />
      </div>
      <hr className="m-0 text-muted w-100" />
      <div
        className="card-body px-3 py-2 pb-2"
        style={{
          backgroundColor: "#e5e5e5",
          padding: 0,
          lineHeight: 1
        }}
      >
        <h6
          className="card-title d-flex align-items-center justify-content-between fw-bold"
          title={`${car.brand} ${car.model}`}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "1.1rem",
            color: "#333",
            margin: 0,
            padding: 0,
            lineHeight: 1
          }}
        >
          <span
            className="text-muted fw-bold"
            style={{ flex: 1, lineHeight: 1 }}
          >
            <span style={{ fontWeight: 700 }}>{car.model}</span>
          </span>
          <i
            onClick={toggleLike}
            className={liked ? "bi bi-heart-fill" : "bi bi-heart"}
            style={{
              color: liked ? "#dc3545" : "#6c757d",
              fontSize: "1.5rem",
              cursor: "pointer",
              transition: "color 0.25s ease",
              marginLeft: "8px",
              lineHeight: 1
            }}
            aria-label={liked ? "Unlike" : "Like"}
          ></i>
        </h6>

        <div
          className="text-start"
          style={{
            margin: 0,
            padding: 0,
            fontWeight: "700",
            fontSize: "1.1rem",
            lineHeight: 1
          }}
        >
          ₹{car.price.toLocaleString()}
        </div>

        <button
          className="btn btn-link p-0"
          style={{
            fontWeight: "700",
            color: "#dc3545",
            fontSize: "0.95rem",
            textDecoration: "none"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#a71d2a";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#dc3545";
          }}
        >
          Book Now &rarr;
        </button>
      </div>
    </div>
  );
};

export default CarCard;
