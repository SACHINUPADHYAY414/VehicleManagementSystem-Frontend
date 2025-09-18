import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home.jsx/Home";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setToastHandler } from "./Action/Api";
import ProtectedRoute from "./ProtectRoute.jsx/ProtectRoute";
import { CLEAR_LOGIN_DATA } from "./Redux/authSlice";
import { persistor } from "./Redux/store";
import { useToastr } from "./Components/Toastr/ToastrProvider";
import { OPPS_MSG, SESSION_EXPIRE } from "./Utils/strings";
import Checkout from "./Pages/Checkout/Checkout";
import CarFilters from "./Pages/CarFiltters/CarFiltters";
import CarFeatures from "./Pages/CarFeatures/CarFeatures";
import AllCars from "./Pages/AllCars/AllCars";

const App = () => {
  const { customToast } = useToastr();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [config] = useState(null);

  const rawToken = useSelector((state) => state.login?.login_data?.token || "");
  const token = typeof rawToken === "string" ? rawToken : "";

  const EXPIRATION_TIME = 10 * 60 * 1000;

  useEffect(() => {
    window.loadingStart?.();
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.loadingEnd?.();
    }, 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Set token in API headers
  useEffect(() => {
    setToken(token);
  }, [token]);

  useEffect(() => {
    if (token) {
      const now = Date.now();
      localStorage.setItem("loginTime", now.toString());
      localStorage.setItem("tokenExpiresIn", EXPIRATION_TIME.toString());
    }
  }, [token]);

  useEffect(() => {
    const loginTime = localStorage.getItem("loginTime");
    const tokenExpiresIn = localStorage.getItem("tokenExpiresIn");

    if (token && loginTime && tokenExpiresIn) {
      const now = Date.now();
      const expiresAt = parseInt(loginTime, 10) + parseInt(tokenExpiresIn, 10);
      if (now >= expiresAt) {
        handleTokenExpiry();
      }
    }
  }, [token, pathname]);

  // Interval check every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const loginTime = localStorage.getItem("loginTime");
      const tokenExpiresIn = localStorage.getItem("tokenExpiresIn");

      if (token && loginTime && tokenExpiresIn) {
        const now = Date.now();
        const expiresAt =
          parseInt(loginTime, 10) + parseInt(tokenExpiresIn, 10);
        if (now >= expiresAt) {
          clearInterval(interval);
          handleTokenExpiry();
        }
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [token]);

  const handleTokenExpiry = async () => {
    dispatch({ type: CLEAR_LOGIN_DATA });
    await persistor.purge();
    setToken("");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("tokenExpiresIn");
    customToast({
      severity: "error",
      summary: OPPS_MSG,
      detail: SESSION_EXPIRE,
      life: 3000,
      sticky: false,
      closable: true
    });
    navigate("/login");
  };
  useEffect(() => {
    setToastHandler(customToast);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout config={config} />}>
        <Route index element={<Home config={config} />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="car" element={<CarFilters />} />
        <Route path="car-fetures" element={<CarFeatures />} />
        <Route path="cars" element={<AllCars />} />
        <Route path="checkout" element={<Checkout />} />

        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
