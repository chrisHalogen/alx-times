import React from "react";
import { Link } from "react-router-dom";
import "./notFound.scss";

function NotFound() {
  return (
    <div className="not-found">
      <div className="inner-container">
        <Link to="/" className="logo-container">
          <img src="/assets/alx-times-logo-white.png" alt="Logo" />
        </Link>
        <div className="form-container">
          <p>The page you are looking for cannot be found</p>

          <div className="btn-container">
            <Link to="/">Back To Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
