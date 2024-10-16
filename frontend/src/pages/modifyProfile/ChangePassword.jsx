import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useApi from "../../services/AuthenticatedRequests";
import { useNavigate } from "react-router-dom";
import nap from "../../utils/nap";
import pprint from "../../utils/pprint";
import show_alert from "../../utils/show_alerts";
import verifyInputs from "../../utils/verifyInputs";

function ChangePassword() {
  const { logoutUser, user } = useAuthContext();
  const [formData, setFormData] = useState({
    "old-password": "",
    "new-password": "",
  });

  const { changePassword, registerLog } = useApi();

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = [];

    if (!verifyInputs.verifyPassword(formData["old-password"])) {
      error.push(
        "Invalid old password. Your password must be at least 7 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
    }

    if (!verifyInputs.verifyPassword(formData["new-password"])) {
      error.push(
        "Invalid new password. Your password must be at least 7 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
    }

    if (error.length > 0) {
      setErrorMessage(error.join(" "));
      return;
    }

    setErrorMessage("");

    const userData = {
      new_password: formData["new-password"],
      re_new_password: formData["new-password"],
      current_password: formData["old-password"],
    };

    pprint(userData);

    changePassword(userData)
      .then((response) => {
        console.log("Before calling register log");
        nap(3);
        return registerLog("Password Change"); // Return the registerLog promise
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
    <div className="change-password">
      <h2 className="dashboard-title">Change Password</h2>
      <hr className="divider" />
      <p className="body-content">
        <strong>Current Email:</strong>
        {`  ${user.email}`}
      </p>
      <p className="body-content">
        Fill the form below to change your new password.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="old-password"
          value={formData["old-password"]}
          onChange={handleChange}
          placeholder="Current Password"
          required
        />

        <input
          type="password"
          name="new-password"
          value={formData["new-password"]}
          onChange={handleChange}
          placeholder="New Password"
          required
        />

        <button className="dashboard-cta" type="submit">
          Change My Password
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

export default ChangePassword;
