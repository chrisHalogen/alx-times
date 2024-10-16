import React from "react";
import { Link } from "react-router-dom";
import { MDArticleForm, MarkdownArticleForm } from "../../components";

function CreateArticle() {
  return (
    <div className="create-articles">
      <div className="top-cta">
        <h2 className="dashboard-title">Create New Article</h2>
        <Link className="dashboard-cta" to="/account/articles">
          Go Back
        </Link>
      </div>

      <hr className="divider" />

      <p className="body-content">Fill the form below to create new article</p>
      <MarkdownArticleForm />
    </div>
  );
}

export default CreateArticle;
