import React from "react";
import { FaCar } from "react-icons/fa";

const Loader = () => {
  const keyframes = `
    @keyframes carMove {
      0% { left: -50px; }
      100% { left: 100vw; }
    }
    @keyframes stripeMove {
      0% { background-position: 0 0; }
      100% { background-position: 40px 0; }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255,255,255,0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}
      >
        <div
          style={{
            position: "relative",
            width: "80vw",
            maxWidth: 600,
            height: 4,
            backgroundColor: "#3b3b3b",
            borderRadius: 2,
            marginBottom: 25,
            overflow: "hidden"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: "100%",
              height: 2,
              backgroundImage:
                "repeating-linear-gradient(to right, #fff 0 30%, transparent 30% 60%)",
              transform: "translateY(-50%)",
              animation: "stripeMove 1.2s linear infinite"
            }}
          ></div>

          <FaCar
            style={{
              position: "absolute",
              bottom: 6,
              left: -50,
              fontSize: 24,
              color: "#ff4d4d",
              animation: "carMove 5s linear infinite"
            }}
          />
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#ffff",
            fontWeight: "600",
            textAlign: "center",
            maxWidth: 400
          }}
        >
          Please wait a moment.
        </div>
      </div>
    </>
  );
};

export default Loader;
