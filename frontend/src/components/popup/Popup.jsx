import { useState, useEffect } from "react";
import "./popup.scss";

function Popup({ isOpen, children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true); // Show the popup
    } else {
      // Delay hiding to allow fade-out effect to complete
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    visible && (
      <div className={`popup-container-wrapper ${isOpen ? "open" : ""}`}>
        {children}
      </div>
    )
  );
}

export default Popup;
