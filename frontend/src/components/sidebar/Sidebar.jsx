import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";

function Sidebar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <NavLink
            to="/account/articles"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            My Articles
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account/my-profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            My Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account/activity-logs"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Activity Logs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account/change-email"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Change Email
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account/change-password"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Change Password
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account/logout"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
