import React from "react";
import { Link } from "react-router-dom";
import "./confirmEmail.scss";

function ConfirmEmail() {
  return (
    <div className="confirm-email">
      <div className="inner-container">
        <Link to="/" className="logo-container">
          <img src="/assets/alx-times-logo-white.png" alt="Logo" />
        </Link>
        <div className="form-container">
          <p>Kindly fill the form below to create an account with us.</p>
          {/* {errorMessage !== "" && (
            <p
              style={{
                color: "#d11a2a",
                margin: "0.5rem 0",
                fontSize: "14px",
                lineHeight: "120%",
              }}
            >
              {"errorMessage"}
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmail;
