import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import verifyInputs from "../../utils/verifyInputs";
import pprint from "../../utils/pprint";
import useApi from "../../services/AuthenticatedRequests";
import { useAuthContext } from "../../context/AuthContext";
import nap from "../../utils/nap";
import show_alert from "../../utils/show_alerts";

function EditProfile() {
  const { user, logoutUser } = useAuthContext();

  const [formData, setFormData] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { editUserProfile, registerLog } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = [];

    if (!verifyInputs.verifyName(formData.firstName)) {
      error.push("Invalid First Name.");
    }

    if (!verifyInputs.verifyName(formData.lastName)) {
      error.push("Invalid Last Name.");
    }

    if (error.length > 0) {
      setErrorMessage(error.join(" "));
      return;
    }

    setErrorMessage("");

    const userData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
    };

    pprint(userData);

    editUserProfile(userData)
      .then((response) => {
        console.log("Before calling register log");
        nap(3);
        return registerLog("Profile Modification"); // Return the registerLog promise
      })
      .then((logResponse) => {
        // Handle the success response from registerLog
        console.log("After calling register log");
        pprint(logResponse);

        logoutUser();
        show_alert(
          "success",
          "Profile Modified Successfully. You have to login to again. Redirecting Now...",
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
          "We couldn't modify your profile. Check input details or try again later",
          "Operation Failed"
        );
      });
  };

  return (
    <div className="edit-profile">
      <h2 className="dashboard-title">Edit Profile</h2>
      <hr className="divider" />

      <p>Kindly fill the form below to edit your profile.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />

        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />

        <button className="dashboard-cta" type="submit">
          Save Changes
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

export default EditProfile;
