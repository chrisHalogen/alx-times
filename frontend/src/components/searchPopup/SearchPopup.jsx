import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchPopup.scss";
import { FaTimes } from "react-icons/fa";

function SearchPopup({ isOpen, setIsPopupOpen }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (searchTerm.trim()) {
      handleClose();
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`); // Redirect to search page
      setSearchTerm("");
    }
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={`popup-container-wrapper ${isOpen && "open"}`}>
      <div
        className="close-container"
        onClick={handleClose}
        id="close-container"
      >
        <FaTimes />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
      </form>
    </div>
  );
}

export default SearchPopup;
