import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import verifyInputs from "../../utils/verifyInputs";
import show_alert from "../../utils/show_alerts";
import nap from "../../utils/nap";
import UnauthenticatedRequests from "../../services/UnauthenticatedRequests";
import pprint from "../../utils/pprint";
import { useAuthContext } from "../../context/AuthContext";
import useApi from "../../services/AuthenticatedRequests";
import manualLogger from "../../utils/manualLogger";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { logUserIn } = useAuthContext();
  const { registerLog } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = [];

    if (!verifyInputs.verifyEmail(formData.email)) {
      error.push("Invalid Email.");
    }

    if (!verifyInputs.verifyPassword(formData.password)) {
      error.push(
        "Invalid password. Your password must be at least 7 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
    }

    if (error.length > 0) {
      setErrorMessage(error.join(" "));
      return;
    }

    setErrorMessage("");

    const userData = {
      email: formData.email,
      password: formData.password,
    };

    pprint(userData);

    UnauthenticatedRequests.loginNewUser(userData)
      .then((response) => {
        // Log in the user
        pprint(response.data);
        logUserIn(response.data);

        // After logging in the user, register the activity log
        console.log("Before calling manualLogger");
        nap(3);
        return manualLogger(response.data.access, "User Login"); // Return the registerLog promise
      })
      .then((logResponse) => {
        // Handle the success response from registerLog
        console.log("After calling manualLogger");
        pprint(logResponse);
        show_alert(
          "success",
          "You are now logged in. Redirecting Now...",
          "Operation Success"
        );

        // Wait for 3 seconds and then redirect to the dashboard
        nap(3);
        navigate("/account/articles");
      })
      .catch((error) => {
        // Handle any errors during the login or log registration process
        pprint(error);
        show_alert(
          "error",
          "We cannot log you in. Check input details or try again later",
          "Operation Failed"
        );
      });

    // UnauthenticatedRequests.loginNewUser(userData)
    //   .then((response) => {
    //     pprint(response.data);
    //     logUserIn(response.data);
    //   })
    //   .catch((error) => {
    //     pprint(error);
    //     show_alert(
    //       "error",
    //       "We cannot log you in. Check input details or try again later",
    //       "Operation Failed"
    //     );
    //   });

    // console.log("Before calling registerLog");

    // registerLog("User Login")
    //   .then((response) => {
    //     pprint(response);
    //   })
    //   .catch((error) => {
    //     pprint(error);
    //   })
    //   .finally(() => {
    //     show_alert(
    //       "success",
    //       "You are now logged in. Redirecting Now...",
    //       "Operation Success"
    //     );
    //     nap(3);
    //     navigate("/account/dashboard");
    //   });
  };

  return (
    <div className="login-page">
      <div className="inner-container">
        <Link to="/" className="logo-container">
          <img src="/assets/alx-times-logo-white.png" alt="Logo" />
        </Link>
        <div className="form-container">
          <p>Kindly fill the form below to log into your account.</p>
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
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />

            <div className="btn-container">
              <button type="submit">Login</button>
            </div>
          </form>
          <p className="bottom-cta">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
