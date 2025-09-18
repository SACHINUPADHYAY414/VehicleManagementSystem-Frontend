import React, { useState, useEffect, useCallback } from "react";
import api from "../../Action/Api";
import { useToastr } from "../Toastr/ToastrProvider";
import TooltipWrapper from "../Tooltip/TooltipWrapper";
import { RiInformation2Line } from "react-icons/ri";
import {
  OPPS_MSG,
  SUCCESS_MSG,
  ERROR_REQUIRED,
  ERROR_VALIDATE_EMAIL,
  ERROR_MAXIMUM_LENGTH,
  ERROR_MINIMUM_LENGTH,
  ERROR_LEADING_OR_TRAILING_SPACE,
  ERROR_DOUBLE_SPACE,
  DOB_RANGE_MESSAGE,
  ERROR_PASTE_DATA,
  ERROR_MUST_LENGTH,
  ERROR,
  ENTER_VALID_DATA,
  SUCCESS,
  OPPS_ERROR,
  FALSE,
  TRUE
} from "../../Utils/strings.js";
import CustomInputField from "../../Components/CustomInput/CustomInputField.jsx";
import { Form, Placeholder } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  sanitizeInput,
  validatePersonName,
  verifyEmail,
  validateLength,
  validateDateOfBirthField,
  verifyStartingOrEndingCharacters,
  verifyDoubleSpace,
  sanitizeEmail,
  sanitizeMobileNumber,
  sanitizeZipCode,
  sanitizeAddress,
  verifyPasteData,
  allowOnlyNumbersFilter,
  start_with_char,
  start_with_char_or_number
} from "../../Utils/allValidation.js";
import { useNavigate } from "react-router-dom";

const defaultFormData = {
  title: "",
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  presentAddressLine1: "",
  presentPincode: "",
  presentCountry: "1",
  presentState: "",
  presentCity: "",
  email: "",
  mobileNumber: "",
  password: ""
};

const Register = () => {
  const navigate=useNavigate();
  const { customToast } = useToastr();
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const titleList = [
    { id: "1", name: "Mr." },
    { id: "2", name: "Mrs." },
    { id: "3", name: "Ms." }
  ];
  const genderList = [
    { id: "1", name: "Male" },
    { id: "2", name: "Female" },
    { id: "3", name: "Other" }
  ];

  const countryList = [
    { id: "1", name: "India" },
    { id: "2", name: "United States" },
    { id: "3", name: "Canada" },
    { id: "4", name: "Australia" }
  ];

  const hardcodedStates = {
    1: [
      // India
      {
        stateId: "1",
        name: "Maharashtra",
        cities: [
          { cityId: "1", name: "Mumbai" },
          { cityId: "2", name: "Pune" }
        ]
      },
      {
        stateId: "2",
        name: "Karnataka",
        cities: [
          { cityId: "3", name: "Bengaluru" },
          { cityId: "4", name: "Mysuru" }
        ]
      }
    ],
    2: [
      // United States
      {
        stateId: "3",
        name: "California",
        cities: [
          { cityId: "5", name: "Los Angeles" },
          { cityId: "6", name: "San Francisco" }
        ]
      },
      {
        stateId: "4",
        name: "Texas",
        cities: [
          { cityId: "7", name: "Houston" },
          { cityId: "8", name: "Dallas" }
        ]
      }
    ]
  };

  useEffect(() => {
    if (!formData.presentCountry) {
      setStateList([]);
      setCityList([]);
      setFormData((prev) => ({
        ...prev,
        presentState: "",
        presentCity: ""
      }));
      return;
    }

    const states = hardcodedStates[formData.presentCountry] || [];
    setStateList(states);

    setCityList([]);
    setFormData((prev) => ({
      ...prev,
      presentCity: ""
    }));
  }, [formData.presentCountry]);

  useEffect(() => {
    const selectedState = stateList.find(
      (state) => state.stateId.toString() === formData.presentState
    );

    if (selectedState?.cities) {
      setCityList(selectedState.cities);
    } else {
      setCityList([]);
    }

    if (formData.presentCity) {
      const cityExists = selectedState?.cities?.some(
        (city) => city.cityId.toString() === formData.presentCity
      );
      if (!cityExists) {
        setFormData((prev) => ({ ...prev, presentCity: "" }));
      }
    }
  }, [formData.presentState, stateList]);

  const selectFields = [
    "title",
    "gender",
    "presentCountry",
    "presentState",
    "presentCity"
  ];

  const handleChange = useCallback(
    (e, required = FALSE, label = "", pastedValue = "") => {
      let { name, value } = e.target;
      if (pastedValue) value += pastedValue;

      // Reset city if state changes
      if (name === "presentState") {
        setFormData((prev) => ({
          ...prev,
          presentState: value,
          presentCity: ""
        }));
        return;
      }

      let sanitizedValue = sanitizeInput(value);
      let updatedValue = sanitizedValue;
      let error = "";

      if (!selectFields.includes(name)) {
        const regex = [
          "dateOfBirth",
          "presentPincode",
          "mobileNumber"
        ].includes(name)
          ? start_with_char_or_number
          : start_with_char;

        if (!updatedValue && required) error = ERROR_REQUIRED(label);
        else if (regex.test(value)) error = ERROR_LEADING_OR_TRAILING_SPACE;

        switch (name) {
          case "firstName":
          case "lastName":
            updatedValue = validatePersonName(sanitizedValue);
            if (updatedValue.length > 30) error = ERROR_MAXIMUM_LENGTH(30);
            break;
          case "presentAddressLine1":
            updatedValue = sanitizeAddress(sanitizedValue);
            if (updatedValue.length > 250) error = ERROR_MAXIMUM_LENGTH(250);
            break;
          case "presentPincode":
            updatedValue = sanitizeZipCode(value, 6);
            break;
          case "mobileNumber":
            updatedValue = sanitizeMobileNumber(sanitizedValue);
            break;
          case "email":
            updatedValue = sanitizeEmail(sanitizedValue);
            break;
          case "dateOfBirth":
            if (!validateDateOfBirthField(sanitizedValue))
              error = DOB_RANGE_MESSAGE;
            break;
          default:
            break;
        }
      }

      setFormData((prev) => ({ ...prev, [name]: updatedValue }));
      setErrors((prev) => ({ ...prev, [name]: error }));

      if (name === "title") {
        setFormData((prev) => ({
          ...prev,
          gender: value === "1" ? "1" : "2"
        }));
        setErrors((prev) => ({
          ...prev,
          gender: "" // clear gender error
        }));
      }
    },
    []
  );

  const handleOnBlur = useCallback((e, required, label) => {
    let { name, value } = e.target;
    let error = "";

    if (selectFields.includes(name)) {
      return;
    }

    if (!value && required) {
      error = ERROR_REQUIRED(label);
    } else {
      if (!verifyStartingOrEndingCharacters(value))
        error = ERROR_LEADING_OR_TRAILING_SPACE;
      else if (verifyDoubleSpace(value)) error = ERROR_DOUBLE_SPACE;

      switch (name) {
        case "firstName":
        case "lastName":
          if (!validateLength(value, 2, 30)) {
            error =
              value.length < 2
                ? ERROR_MINIMUM_LENGTH(2)
                : ERROR_MAXIMUM_LENGTH(30);
          }
          break;
        case "presentAddressLine1":
          if (!validateLength(value, 3, 250)) {
            error =
              value.length < 3
                ? ERROR_MINIMUM_LENGTH(3)
                : ERROR_MAXIMUM_LENGTH(250);
          }
          break;
        case "presentPincode":
          if (!validateLength(value, 6, 6)) error = ERROR_MUST_LENGTH(6);
          break;
        case "mobileNumber":
          if (!validateLength(value, 10, 10)) error = ERROR_MUST_LENGTH(10);
          break;
        case "email":
          if (!verifyEmail(value)) error = ERROR_VALIDATE_EMAIL;
          break;
        default:
          break;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const onPaste = useCallback(
    (e, required, label) => {
      e.preventDefault();
      const name = e.target.name;
      const value = e.clipboardData.getData("Text");
      const result = verifyPasteData(value);
      if (!result.valid) {
        setErrors((prev) => ({ ...prev, [name]: ERROR_PASTE_DATA }));
        return;
      }
      handleChange(e, required, label, value);
    },
    [handleChange]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    let tempErrors = {};

    formFields.forEach(({ name, label, required }) => {
      const value = formData[name];
      if (required && !value?.trim()) {
        tempErrors[name] = ERROR_REQUIRED(label);
      }
    });

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) {
      customToast({
        severity: ERROR,
        summary: OPPS_MSG,
        detail: ENTER_VALID_DATA,
        life: 3000
      });
      return;
    }

    const mapTitleToString = (id) => {
      switch (id) {
        case "1":
          return "Mr";
        case "2":
          return "Mrs";
        case "3":
          return "Ms";
        default:
          return "";
      }
    };

    try {
      const payload = {
        title: mapTitleToString(formData.title),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        gender: formData.gender,
        dob: formData.dateOfBirth,
        mobileNumber: formData.mobileNumber,
        country: formData.presentCountry,
        city: formData.presentCity,
        state: formData.presentState,
        pinCode: formData.presentPincode,
        password: formData.password
      };

      const response = await api.post("/api/auth/register", payload);
      customToast({
        severity: SUCCESS,
        summary: SUCCESS_MSG,
        detail: response?.data?.message,
        life: 4000
      });
      navigate("/login")
    } catch (err) {
      console.log("Error response:", err.response);
      customToast({
        severity: ERROR,
        summary: OPPS_MSG,
        detail:
          err.response?.data?.message ||
          err.response?.data ||
          "Something went wrong",
        life: 3000
      });
    }
  };

  const formFields = [
    {
      label: "Title",
      id: "title",
      name: "title",
      type: "select",
      options: titleList,
      required: TRUE,
      placeholder: "Select Title"
    },
    {
      label: "Gender",
      id: "gender",
      name: "gender",
      type: "select",
      options: genderList,
      required: TRUE,
      placeholder: "Select Gender"
    },
    {
      label: "First Name",
      id: "firstName",
      name: "firstName",
      type: "text",
      required: TRUE,
      placeholder: "Enter First Name"
    },
    {
      label: "Last Name",
      id: "lastName",
      name: "lastName",
      type: "text",
      required: TRUE,
      placeholder: "Enter Last Name"
    },
    {
      label: "Date of Birth",
      id: "dateOfBirth",
      name: "dateOfBirth",
      type: "date",
      required: TRUE,
      placeholder: "Select Date of Birth"
    },
    {
      label: "Email",
      id: "email",
      name: "email",
      type: "email",
      required: TRUE,
      placeholder: "Enter Email Address"
    },
    {
      label: "Mobile No",
      id: "mobileNumber",
      name: "mobileNumber",
      type: "tel",
      required: TRUE,
      placeholder: "Enter Mobile Number"
    },
    {
      label: "Password",
      id: "password",
      name: "password",
      type: "password",
      required: TRUE,
      placeholder: "Enter Password"
    },
    {
      label: "Country",
      id: "presentCountry",
      name: "presentCountry",
      type: "select",
      options: countryList,
      required: TRUE,
      placeholder: "Select Country"
    },
    {
      label: "State",
      id: "presentState",
      name: "presentState",
      type: "select",
      options: stateList,
      required: TRUE,
      placeholder: "Select State"
    },
    {
      label: "City",
      id: "presentCity",
      name: "presentCity",
      type: "select",
      options: cityList,
      required: TRUE,
      placeholder: "Select City"
    },
    {
      label: "Address Line 1",
      id: "presentAddressLine1",
      name: "presentAddressLine1",
      type: "text",
      required: TRUE,
      placeholder: "Enter Address Line 1"
    },
    {
      label: "Pincode",
      id: "presentPincode",
      name: "presentPincode",
      type: "text",
      required: TRUE,
      placeholder: "Enter Pincode"
    }
  ];

  const renderField = (field) => {
    const { type, name, label, options, required, placeholder } = field;
    const value = formData[name] || "";
    const error = errors[name] || "";
    const colClass = field.colClass || "col-12 col-md-3";

    if (type === "select") {
      return (
        <div className={colClass} key={name} style={{ position: "relative" }}>
          <label className="form-label required-label">{label}</label>
          <select
            name={name}
            value={value}
            onChange={(e) => handleChange(e, required, label)}
            onBlur={(e) => handleOnBlur(e, required, label)}
            className={`form-select ${
              error ? "hasError" : value ? "is-valid" : ""
            }`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => {
              let optionValue = opt.id || opt.stateId || opt.cityId || "";
              return (
                <option key={optionValue} value={optionValue}>
                  {opt.name}
                </option>
              );
            })}
          </select>
          {error && (
            <TooltipWrapper tooltipMessage={error}>
              <span
                style={{
                  position: "absolute",
                  right: "2.1rem",
                  top: "70%",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                }}
              >
                <RiInformation2Line color="#ff3d42" />
              </span>
            </TooltipWrapper>
          )}
        </div>
      );
    }

    return (
      <CustomInputField
        key={name}
        field={field}
        colClass={colClass}
        errors={errors}
        formData={formData}
        formHandlers={{ handleChange }}
        allowOnlyNumbersFilter={allowOnlyNumbersFilter}
        onPaste={(e) => onPaste(e, required, label)}
        value={value}
        placeholder={Placeholder}
        onInput={(e) => {
          if (e.target.type === "number") {
            e.target.value = allowOnlyNumbersFilter(e.target.value);
          }
        }}
        onBlur={(e) => handleOnBlur(e, required, label)}
        error={error}
        onChange={(e) => handleChange(e, required, label)}
      />
    );
  };

  return (
    <Form>
      <div
        className="container d-flex justify-content-center align-items-center my-3"
        style={{ minHeight: "87vh" }}
      >
        <div className="card shadow p-4 w-100" style={{ maxWidth: "700px" }}>
          <h3 className="text-center mb-4 fw-bold">Register</h3>

          <div className="row g-2">{formFields.map(renderField)}</div>
          <div className="d-grid mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              // disabled={submitted}
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Register;
