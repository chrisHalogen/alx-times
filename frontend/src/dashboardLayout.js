import React from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { Footer, Header, Sidebar } from "./components";
import {
  Activity,
  ChangeEmail,
  ChangePassword,
  CreateArticle,
  Dashboard,
  EditArticle,
  EditProfile,
  ListArticles,
  Logout,
  Profile,
  ViewArticle,
} from "./pages";

function DashboardLayout() {
  return (
    <>
      <Header />
      <div className="user-area-layout">
        <div className="innerContainer">
          <Sidebar />
          <div className="content-area">
            <Routes>
              <Route path="articles" element={<ListArticles />} />
              <Route path="articles/create" element={<CreateArticle />} />
              <Route path="articles/edit/:id" element={<EditArticle />} />
              <Route path="articles/view/:id" element={<ViewArticle />} />
              <Route path="activity-logs" element={<Activity />} />
              <Route path="logout" element={<Logout />} />
              <Route path="change-email" element={<ChangeEmail />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="my-profile/edit" element={<EditProfile />} />
              <Route path="my-profile" element={<Profile />} />
              {/* <Route path="/all-offenses/:id" element={<SingleOffense />} /> */}
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashboardLayout;
