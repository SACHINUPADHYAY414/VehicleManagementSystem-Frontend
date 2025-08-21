import React, { useState } from "react";
import CustomInputField from "../CustomInput/CustomInputField";
import {
  ERROR_REQUIRED,
  ERROR_VALIDATE_EMAIL,
  ERROR_LEADING_OR_TRAILING_SPACE,
  ERROR_DOUBLE_SPACE,
  OPPS_MSG,
  SUCCESS_MSG,
  SERVER_ERROR
} from "../../Utils/strings.js";

import {
  sanitizeEmail,
  verifyEmail,
  sanitizePassword,
  verifyDoubleSpace,
  verifyStartingOrEndingCharacters,
  start_with_char_or_number,
  sanitizeInput
} from "../../Utils/allValidation.js";
import api from "../../Action/Api";
import { useToastr } from "../Toastr/ToastrProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_LOGIN_DATA } from "../../Redux/authSlice.js";

const Login = () => {
  const { customToast } = useToastr();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const fields = [
    {
      id: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      required: true
    },
    {
      id: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      required: true
    }
  ];

  const handleChange = (e, required, label, pastedValue) => {
    let { name, value } = e.target;

    if (pastedValue) {
      value = value + pastedValue;
    }

    let sanitizedValue = sanitizeInput(value);
    let updatedValue;
    let error = "";

    switch (name) {
      case "email":
        updatedValue = sanitizeEmail(sanitizedValue);
        break;
      case "password":
        updatedValue = sanitizePassword(sanitizedValue);
        break;
      default:
        updatedValue = sanitizedValue;
        break;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue
    }));
    if (!value && required) {
      error = ERROR_REQUIRED(label);
    }
    if (value && start_with_char_or_number.test(value)) {
      error = ERROR_LEADING_OR_TRAILING_SPACE;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
    return;
  };

  const handleOnBlur = (e, label) => {
    let { name, value } = e.target;
    let error = "";
    const fieldRequired = fields.find((field) => field.name === name)?.required;

    if (
      name === "email" &&
      !verifyStartingOrEndingCharacters(value) &&
      name !== "password"
    ) {
      error = ERROR_LEADING_OR_TRAILING_SPACE;
    } else if (verifyDoubleSpace(value)) {
      error = ERROR_DOUBLE_SPACE;
    }

    if (name === "email") {
      if (!verifyEmail(value)) {
        error = ERROR_VALIDATE_EMAIL;
      }
    }

    if ((!value || value === "") && fieldRequired) {
      error = ERROR_REQUIRED(label);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const onPaste = (e, label) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.clipboardData.getData("Text");
    if (value.includes("<") || value.includes(">")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Pasted content contains invalid characters."
      }));
      return;
    }
    handleChange(e, label, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempErrors = {};

    fields.forEach(({ name, label }) => {
      const value = formData[name];

      if (!value || value === "") {
        tempErrors[name] = ERROR_REQUIRED(label);
        return;
      }

      if (name === "email" && !verifyEmail(value)) {
        tempErrors[name] = ERROR_VALIDATE_EMAIL;
      }
    });

    setErrors(tempErrors);
    if (Object.keys(tempErrors).length === 0) {
      try {
        const response = await api.post("/auth/login", formData);
        const firstName = response.data.user.firstName;
        const lastName = response.data.user.lastName;

        dispatch({
          type: SET_LOGIN_DATA,
          payload: {
            token: response.data.token,
            user: { firstName, lastName }
          }
        });
        navigate(from, { replace: true });

        customToast({
          severity: "success",
          summary: SUCCESS_MSG,
          detail: "Login successful.",
          life: 3000,
          sticky: false,
          closable: true
        });
      } catch (error) {
        customToast({
          severity: "error",
          summary: OPPS_MSG,
          detail:
            error.response?.data?.message || error.message || SERVER_ERROR,
          life: 3000,
          sticky: false,
          closable: true
        });
      }
    }
  };

  const returnControls = (field) => {
    return (
      <CustomInputField
        key={field.id}
        type={field.type}
        field={field}
        value={formData[field.name] || ""}
        placeholder={field.placeholder}
        onChange={(e) => handleChange(e, field.label)}
        onBlur={(e) => handleOnBlur(e, field.label)}
        onPaste={(e) => onPaste(e, field.label)}
        error={errors[field.name] || ""}
      />
    );
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center my-3"
      style={{ minHeight: "87vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <h3
          className="text-center mb-4 fw-bold"
          style={{ fontFamily: "Poppins" }}
        >
          Login
        </h3>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => returnControls(field))}

          {/* Forgot Password Link */}
          <div className="text-end">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-decoration-none fw-semibold"
              style={{
                fontSize: "0.6rem",
                cursor: "pointer",
                color: "#0d6efd"
              }}
            >
              Forgot Password?
            </span>
          </div>

          <div className="d-grid mt-1">
            <button type="submit" className="btn btn-primary fw-semibold">
              Login
            </button>
          </div>
        </form>

        <p className="text-center mt-2 mb-0" style={{ fontSize: "0.9rem" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-primary fw-semibold text-decoration-none"
            style={{ cursor: "pointer" }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
