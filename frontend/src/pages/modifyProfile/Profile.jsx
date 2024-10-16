import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useAuthContext();
  return (
    <div className="my-profile">
      <h2 className="dashboard-title">Profile</h2>
      <hr className="divider" />
      <p className="body-content">
        <strong>First Name:</strong>
        {`  ${user.first_name}`}
      </p>
      <p className="body-content">
        <strong>Last Name:</strong>
        {`  ${user.last_name}`}
      </p>
      <p className="body-content">
        <strong>Current Email:</strong>
        {`  ${user.email}`}
      </p>
      <p className="body-content">
        Click the button below to edit your profile.
      </p>

      <Link className="dashboard-cta" to="/account/my-profile/edit">
        Edit My Profile
      </Link>
    </div>
  );
}

export default Profile;
