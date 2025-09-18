import React, { useEffect, useRef, useState } from "react";

const Car360 = ({ imagePath, amount = 36, autoplay = true, speed = 100 }) => {
  const imgRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Autoplay rotation
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % amount);
    }, speed);
    return () => clearInterval(interval);
  }, [autoplay, speed, amount]);

  // Drag rotation
  const handleMouseDown = (e) => {
    setDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const delta = e.clientX - startX;
    if (Math.abs(delta) > 5) {
      const step = delta > 0 ? -1 : 1;
      setIndex((prev) => (prev + step + amount) % amount);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div
      style={{ width: "100%", maxWidth: "500px", margin: "0 auto", cursor: "grab" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      <img
        ref={imgRef}
        src={`${imagePath}/${index + 1}.jpg`}
        alt={`Car view ${index + 1}`}
        style={{ width: "100%", objectFit: "contain", userSelect: "none", pointerEvents: "none" }}
        draggable={false}
      />
    </div>
  );
};

export default Car360;
