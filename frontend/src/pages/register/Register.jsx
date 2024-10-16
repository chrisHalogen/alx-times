import React, { useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import verifyInputs from "../../utils/verifyInputs";
import UnauthenticatedRequests from "../../services/UnauthenticatedRequests";
import pprint from "../../utils/pprint";
import show_alert from "../../utils/show_alerts";
import { useNavigate } from "react-router-dom";
import nap from "../../utils/nap";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = [];

    if (!verifyInputs.verifyName(formData.firstName)) {
      error.push("Invalid First Name.");
    }

    if (!verifyInputs.verifyName(formData.lastName)) {
      error.push("Invalid Last Name.");
    }

    if (!verifyInputs.verifyEmail(formData.email)) {
      error.push("Invalid Email.");
    }

    if (!verifyInputs.verifyPassword(formData.password)) {
      error.push(
        "Invalid password. Your password must be at least 7 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
    }

    if (formData.password !== formData.confirmPassword) {
      error.push("Passwords do not match.");
    }

    if (error.length > 0) {
      setErrorMessage(error.join(" "));
      return;
    }

    setErrorMessage("");

    const userData = {
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      password_confirm: formData.confirmPassword,
      re_password: formData.confirmPassword,
    };

    pprint(userData);

    UnauthenticatedRequests.createNewUser(userData)
      .then((response) => {
        pprint(response.data);
        show_alert(
          "success",
          "Your Account Have Been Created Successfully. Redirecting Now...",
          "Operation Success"
        );
        nap(3);
        navigate("/login");
      })
      .catch((error) => {
        pprint(error);
        show_alert(
          "error",
          "An error occured while trying to create your account",
          "Operation Failed"
        );
      });
  };

  return (
    <div className="register-page">
      <div className="inner-container">
        <Link to="/" className="logo-container">
          <img src="/assets/alx-times-logo-white.png" alt="Logo" />
        </Link>
        <div className="form-container">
          <p>Kindly fill the form below to create an account with us.</p>
          {errorMessage !== "" && (
            <p
              style={{
                color: "#d11a2a",
                margin: "0.5rem 0",
                fontSize: "14px",
                lineHeight: "120%",
              }}
            >
              {errorMessage}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Password Again"
              required
            />

            <div className="btn-container">
              <button type="submit">Register</button>
            </div>
          </form>
          <p className="bottom-cta">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
