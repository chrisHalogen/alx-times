import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaBars, FaTimes, FaUser } from "react-icons/fa";
import "./header.scss";
import { useAuthContext } from "../../context/AuthContext";
import SearchPopup from "../searchPopup/SearchPopup";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { user } = useAuthContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closeMenuBySearch = () => {
    setIsMenuOpen(false);
    setIsPopupOpen(true);
  };

  return (
    <header>
      <div className="outter-container">
        <div className="inner-container">
          <div className="row1">
            <div className="search-container" onClick={togglePopup}>
              <FaSearch />
            </div>

            <Link to="/" className="logo-container">
              <img src="/assets/alx-times-logo-black.png" alt="Logo" />
            </Link>

            <div className="cta-cover">
              {user ? (
                <Link to="/account/articles" className="account-ower-widget">
                  <FaUser />
                  <p>My Account</p>
                </Link>
              ) : (
                <div className="cta-container">
                  <Link to="/register" className="register">
                    Register
                  </Link>
                  <Link to="/login" className="login">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="outter-container" id="menu">
        <div className="inner-container">
          <div className="row2">
            <nav>
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/categories">Categories</NavLink>
                </li>
                <li>
                  <NavLink to="/latest">Latest</NavLink>
                </li>
                <li>
                  <NavLink to="/featured">Featured</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}

      <div className="mobile-menu">
        <div className="inner-container">
          <Link to="/" className="logo-container">
            <img src="/assets/alx-times-logo-black.png" alt="Logo" />
          </Link>

          <div className="toggle-container" onClick={toggleMenu}>
            <FaBars />
          </div>
        </div>
      </div>

      <div className={`mobile-menu-panel ${isMenuOpen ? "open" : ""}`}>
        <div className="inner-container">
          <div className="close-container" onClick={toggleMenu}>
            <FaTimes />
          </div>
          <div className="close-container" onClick={closeMenuBySearch}>
            <FaSearch />
          </div>
          <Link to="/" className="logo-container">
            <img src="/assets/alx-times-logo-white.png" alt="Logo" />
          </Link>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/categories">Categories</NavLink>
              </li>
              <li>
                <NavLink to="/latest">Latest</NavLink>
              </li>
              <li>
                <NavLink to="/featured">Featured</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </nav>
          {user ? (
            <Link to="/account/articles" className="account-ower-widget">
              <FaUser />
              <p>My Account</p>
            </Link>
          ) : (
            <div className="cta-container">
              <Link to="/register" className="register">
                Register
              </Link>
              <Link to="/login" className="login">
                Login
              </Link>
            </div>
          )}

          {/* <div className="cta-container">
            <Link to="/register" className="register">
              Register
            </Link>
            <Link to="/login" className="login">
              Login
            </Link>
          </div> */}
        </div>
      </div>

      <SearchPopup isOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />
    </header>
  );
}

export default Header;
