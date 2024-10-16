import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import verifyInputs from "../../utils/verifyInputs";
import pprint from "../../utils/pprint";
import useApi from "../../services/AuthenticatedRequests";
import show_alert from "../../utils/show_alerts";
import nap from "../../utils/nap";
import { useNavigate } from "react-router-dom";

function ChangeEmail() {
  const { user, logoutUser } = useAuthContext();
  const [formData, setFormData] = useState({
    email: "",
  });

  const { changeEmailAddress, registerLog } = useApi();

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      new_email: formData.email,
      re_new_email: formData.email,
      current_password: formData.password,
    };

    pprint(userData);

    changeEmailAddress(userData)
      .then((response) => {
        console.log("Before calling register log");
        nap(3);
        return registerLog("Email Change"); // Return the registerLog promise
      })
      .then((logResponse) => {
        // Handle the success response from registerLog
        console.log("After calling register log");
        pprint(logResponse);

        logoutUser();
        show_alert(
          "success",
          "Email Changed Successfully. You have to login to again. Redirecting Now...",
          "Operation Success"
        );
        nap(3);
        navigate("/login");
      })
      .catch((error) => {
        // Handle any errors during the login or log registration process
        pprint(error);
        show_alert(
          "error",
          "We couldn't change your email. Check input details or try again later",
          "Operation Failed"
        );
      });
  };
  return (
    <div className="change-email">
      <h2 className="dashboard-title">Change Email</h2>
      <hr className="divider" />
      <p className="body-content">
        <strong>Current Email:</strong>
        {`  ${user.email}`}
      </p>
      <p className="body-content">
        Enter a new email below to change your email address.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="New Email Address"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Current Password"
          required
        />

        <button className="dashboard-cta" type="submit">
          Change My Email
        </button>
      </form>
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
    </div>
  );
}

export default ChangeEmail;
