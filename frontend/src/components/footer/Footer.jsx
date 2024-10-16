import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="inner-container">
          <div className="col1">
            <Link to="/" className="logo-container">
              <img src="/assets/alx-times-logo-white.png" alt="Logo" />
            </Link>
            <p>Empowering Minds, One Story at a Time.</p>
          </div>
          <div className="col2">
            <h2>About</h2>
            <p>
              ALX Times is a dynamic project designed to keep users informed,
              organized, and connected. Built with a focus on performance and
              usability, it delivers seamless access to the latest information
              while maintaining simplicity....{" "}
              <Link to="/about">Learn More</Link>
            </p>
          </div>
          <div className="col3">
            <h2>Useful Links</h2>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
              <li>
                <Link to="/latest">Latest</Link>
              </li>
              <li>
                <Link to="/featured">Featured</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="col4">
            <h2>Contact Us</h2>
            <p>
              We'd love to hear from you! Whether you have a question, feedback,
              or need support, the ALX Times team is here to help.
            </p>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
      <div className="footer-credit">
        <div className="content">
          <p>
            ALX Sprint Specialization Final Project Built by{" "}
            <Link to="https://github.com/chrisHalogen">Christian Chi</Link> &{" "}
            <Link to="https://github.com/mooreArrqs">Amanda Nxumalo</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
