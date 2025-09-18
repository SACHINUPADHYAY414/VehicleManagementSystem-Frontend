import { useEffect, useState } from "react";
import {
  FaBus,
  FaTaxi,
  FaGlobe,
  FaTags,
  FaSignOutAlt,
  FaCarAlt
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../../Redux/store";
import { CLEAR_LOGIN_DATA } from "../../Redux/authSlice";
import { IoMdLogOut } from "react-icons/io";
import { useToastr } from "../Toastr/ToastrProvider";
import { SUCCESS_MSG } from "../../Utils/strings";
import { RiAccountCircleLine } from "react-icons/ri";
import * as bootstrap from "bootstrap";
import { CLEAR_SELECT_CAR } from "../../Redux/buyCar";
import api from "../../Action/Api";

const NavbarEMT = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const dispatch = useDispatch();
  const { customToast } = useToastr();
  const user = useSelector((state) => state.login?.login_data?.user);

  const [cars, setCars] = useState([]);
  const loginData = useSelector((state) => state.login?.login_data);
  const isLoggedIn = !!loginData?.token;
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/api/vehicles/all");
        const carsWithData = response.data.map((car) => ({
          ...car,
          brand: car.model.split(" ")[0],
          type: car.type,
          year: car.year
        }));

        setCars(carsWithData);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch cars"
        );
      }
    };

    fetchCars();
  }, []);

  const brands = Array.from(new Set(cars.map((car) => car.brand)));

  const handleLoginClick = () => {
    closeOffcanvas();
    navigate("/login");
  };

  const handleRegisterClick = () => {
    closeOffcanvas();
    navigate("/register");
  };

  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById("offcanvasNavbar");
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    bsOffcanvas?.hide();
  };

  const handleProfileSetting = () => {
    navigate("/profile-setting");
  };

  const handleLogout = () => {
    dispatch({ type: CLEAR_LOGIN_DATA });
    persistor.purge();
    dispatch({ type: CLEAR_SELECT_CAR });
    closeOffcanvas();
    customToast({
      severity: "success",
      summary: SUCCESS_MSG,
      detail: "Logout successful.",
      life: 3000,
      sticky: false,
      closable: true
    });
    navigate("/");
  };

  useEffect(() => {
    const offcanvas = document.getElementById("offcanvasNavbar");

    if (offcanvas) {
      offcanvas.addEventListener("show.bs.offcanvas", () =>
        setIsOffcanvasOpen(true)
      );
      offcanvas.addEventListener("hidden.bs.offcanvas", () =>
        setIsOffcanvasOpen(false)
      );
    }

    return () => {
      if (offcanvas) {
        offcanvas.removeEventListener("show.bs.offcanvas", () =>
          setIsOffcanvasOpen(true)
        );
        offcanvas.removeEventListener("hidden.bs.offcanvas", () =>
          setIsOffcanvasOpen(false)
        );
      }
    };
  }, []);

  return (
    <>
      <div
        className={`emt-navbar sticky-top py-2 pb-0 ${
          isOffcanvasOpen ? "z-lower" : "z-top"
        }`}
      >
        <div className="container">
          {/* Top Bar */}
          <div className="top-bar d-flex justify-content-between align-items-center py-1">
            <div className="d-flex align-items-center">
              <NavLink to="/" className="text-decoration-none">
                <h5
                  className="mb-0"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600
                  }}
                >
                  <span style={{ color: "#007bff", fontSize: "1.5rem" }}>
                    VehicleHub
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#007bff",
                      marginLeft: "1px"
                    }}
                  >
                    .com
                  </span>
                </h5>
              </NavLink>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-light d-md-none"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
              >
                ☰
              </button>
              <div className="bottom-menu d-none d-md-flex justify-content-center gap-3 align-items-center">
                {/* ✅ New Cars Dropdown */}
                <div className="dropdown">
                  <span
                    className="menu-item dropdown-toggle"
                    id="newCarsDropdown"
                    role="button"
                    aria-expanded="false"
                    style={{ cursor: "pointer" }}
                  >
                    <FaTaxi
                      style={{ verticalAlign: "middle", marginRight: "6px" }}
                    />
                     Cars
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="newCarsDropdown"
                  >
                    <li>
                      <h6 className="dropdown-header">By Brand</h6>
                    </li>
                   {brands.slice(0, 5).map((brand) => (
                      <li key={brand}>
                        <NavLink
                          className="dropdown-item"
                          to={`/cars?brand=${brand}`}
                        >
                          {brand}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Used Cars Dropdown */}
                <div className="dropdown">
                  <span
                    className="menu-item dropdown-toggle"
                    id="usedCarsDropdown"
                    role="button"
                    aria-expanded="false"
                    style={{ cursor: "pointer" }}
                  >
                    <FaTaxi
                      style={{ verticalAlign: "middle", marginRight: "6px" }}
                    />
                    Used Cars
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="usedCarsDropdown"
                  >
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/used-cars/under-5-years"
                      >
                        Under 5 Years
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/used-cars/under-10-years"
                      >
                        Under 10 Years
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/* Offers Dropdown */}
                <div className="dropdown">
                  <span
                    className="menu-item dropdown-toggle"
                    id="offersDropdown"
                    role="button"
                    aria-expanded="false"
                    style={{ cursor: "pointer" }}
                  >
                    <FaTags
                      style={{ verticalAlign: "middle", marginRight: "6px" }}
                    />
                    Offers
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="offersDropdown"
                  >
                    <li>
                      <NavLink className="dropdown-item" to="/offers/seasonal">
                        Seasonal Offers
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/offers/bank">
                        Bank Offers
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/offers/exchange">
                        Exchange Bonus
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/* For Sale Vehicles Dropdown */}
                <div className="dropdown">
                  <span
                    className="menu-item dropdown-toggle"
                    id="forSaleDropdown"
                    role="button"
                    aria-expanded="false"
                    style={{ cursor: "pointer" }}
                  >
                    <FaCarAlt
                      style={{ verticalAlign: "middle", marginRight: "6px" }}
                    />
                    For Sale Vehicles
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="forSaleDropdown"
                  >
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/for-sale-vehicles/car-fetures"
                      >
                        Cars
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/for-sale-vehicles/bikes"
                      >
                        Bikes
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/* User Info */}
                <span
                  className="fw-bold mb-1"
                  style={{
                    marginRight: "-0.8rem",
                    fontSize: "1.1rem"
                  }}
                >
                  {user?.name}
                </span>
                {isLoggedIn ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-link"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <RiAccountCircleLine size={34} className="text-primary" />
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-start"
                      aria-labelledby="userDropdown"
                    >
                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center fw-bold gap-2"
                          onClick={handleProfileSetting}
                        >
                          <RiAccountCircleLine /> Profile Setting
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center fw-bold gap-2"
                          onClick={handleLogout}
                        >
                          <IoMdLogOut /> Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Offcanvas Menu */}
      <div
        className="offcanvas offcanvas-start d-block d-md-none"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            <span style={{ color: "#007bff", fontWeight: "bold" }}>
              {user && user.name ? user.name : "Home"}
            </span>
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body position-relative">
          <ul className="navbar-nav justify-content-end flex-grow-1">
            {user ? (
              <li className="nav-item">
                <NavLink
                  to="/profile-setting"
                  onClick={closeOffcanvas}
                  className={({ isActive }) =>
                    `nav-NavLink ${
                      isActive ? "text-primary fw-semibold" : "text-secondary"
                    }`
                  }
                >
                  <RiAccountCircleLine className="nav-icon" /> Profile Settings
                </NavLink>
              </li>
            ) : null}

            <li className="nav-item">
              <NavLink
                to="/car-fetures"
                onClick={closeOffcanvas}
                className={({ isActive }) =>
                  `nav-NavLink ${
                    isActive ? "text-primary fw-semibold" : "text-secondary"
                  }`
                }
              >
                <FaBus className="nav-icon" /> New Cars
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/used-cars"
                onClick={closeOffcanvas}
                className={({ isActive }) =>
                  `nav-NavLink ${
                    isActive ? "text-primary fw-semibold" : "text-secondary"
                  }`
                }
              >
                <FaTaxi className="nav-icon" /> Used Cars
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/offers"
                onClick={closeOffcanvas}
                className={({ isActive }) =>
                  `nav-NavLink ${
                    isActive ? "text-primary fw-semibold" : "text-secondary"
                  }`
                }
              >
                <FaTags className="nav-icon" /> Offers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/more"
                onClick={closeOffcanvas}
                className={({ isActive }) =>
                  `nav-NavLink ${
                    isActive ? "text-primary fw-semibold" : "text-secondary"
                  }`
                }
              >
                <FaGlobe className="nav-icon" /> More
              </NavLink>
            </li>

            {/* NEW: For Sale Vehicles */}
            <li className="nav-item">
              <NavLink
                to="/for-sale-vehicles"
                onClick={closeOffcanvas}
                className={({ isActive }) =>
                  `nav-NavLink ${
                    isActive ? "text-primary fw-semibold" : "text-secondary"
                  }`
                }
              >
                <FaCarAlt className="nav-icon" /> For Sale Vehicles
              </NavLink>
            </li>
          </ul>
        </div>

        {user ? (
          <div className="position-absolute bottom-0 end-0 p-3">
            <FaSignOutAlt
              className="text-danger fs-4 cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        ) : (
          <div className="position-absolute bottom-0 w-100 p-3">
            <button
              className="btn btn-primary w-100"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="btn btn-primary w-100 mt-2"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NavbarEMT;
