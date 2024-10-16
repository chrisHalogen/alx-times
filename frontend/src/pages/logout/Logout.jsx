import React from "react";
import "./logout.scss";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import show_alert from "../../utils/show_alerts";
import nap from "../../utils/nap";
// import AuthenticatedRequests from "../../services/AuthenticatedRequests";
import pprint from "../../utils/pprint";
import useApi from "../../services/AuthenticatedRequests";

function Logout() {
  const { logoutUser } = useAuthContext();
  const navigate = useNavigate();
  const { registerLog } = useApi();

  const handleClick = () => {
    registerLog("User Logout")
      .then((response) => {
        pprint(response);
      })
      .catch((error) => {
        pprint(error);
      })
      .finally(() => {
        logoutUser();
        show_alert(
          "success",
          "You have been logged out successfully. Redirecting Now...",
          "Operation Success"
        );
        nap(3);
        navigate("/login");
      });
  };

  return (
    <div className="logout-user">
      <h2 className="dashboard-title">Logout</h2>
      <hr className="divider" />
      <p className="body-content">Are you sure you want to log out?</p>

      <button className="dashboard-cta" onClick={handleClick}>
        Yes
      </button>
    </div>
  );
}

export default Logout;
