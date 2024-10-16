import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./MDE.scss";
import styled from "styled-components";
import useApi from "../../services/AuthenticatedRequests";
import pprint from "../../utils/pprint";
import { useNavigate } from "react-router-dom";
import show_alert from "../../utils/show_alerts";
import nap from "../../utils/nap";

const mdParser = new MarkdownIt();

const EditorWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  margin-bottom: 20px;

  .rc-md-editor .section {
    padding: 15px;
    border-radius: 8px;
    background-color: #ffffff;
  }

  .rc-md-editor .section-left {
    border-right: 1px solid #e5e5e5;
  }

  .rc-md-editor .section-right {
    background-color: #f4f4f4;
  }

  .rc-md-editor .button-wrap button {
    padding: 10px;
    border-radius: 5px;
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
    transition: background-color 0.3s ease;
  }

  .rc-md-editor .button-wrap button:hover {
    background-color: #eaeaea;
  }

  .rc-md-editor .input {
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    color: #333;
  }

  .rc-md-editor .preview {
    font-family: "Georgia", serif;
    font-size: 16px;
    color: #444;
    line-height: 1.6;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  max-width: 20rem;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: white;
  color: #333;
  cursor: pointer;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  font-family: "Poppins", sans-serif;
  margin: 0.5rem 0 1.5rem 0;

  &:focus {
    outline: none;
  }

  option {
    padding: 10px;
  }
`;

function MarkdownArticleForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // For image upload
  const navigate = useNavigate();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  const { createNewArticle, registerLog } = useApi();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the image file
    setImagePreviewUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    if (image) {
      formData.append("image", image); // Append the image file
    }

    createNewArticle(formData)
      .then((response) => {
        // console.log("Before calling register log");
        nap(3);
        return registerLog("New Article Creation"); // Return the registerLog promise
      })
      .then((logResponse) => {
        // Handle the success response from registerLog
        // console.log("After calling register log");
        // pprint(logResponse);

        show_alert(
          "success",
          "Article Created Successfully. Redirecting Now...",
          "Operation Success"
        );
        nap(3);
        navigate("/account/articles");
      })
      .catch((error) => {
        // Handle any errors during the login or log registration process
        // pprint(error);
        show_alert(
          "error",
          "We couldn't create the new article. Check input details or try again later",
          "Operation Failed"
        );
      });

    // onSubmit(formData); // Pass FormData object to onSubmit
  };

  // Create a styled container for the markdown editor

  return (
    <>
      {/* <p>Article Title</p> */}
      <input
        type="text"
        placeholder="Enter Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p>Choose Article Category</p>
      <StyledSelect
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="sports">Sports</option>
        <option value="medicine">Medicine</option>
        <option value="lifestyle">Lifestyle</option>
        <option value="entertainment">Entertainment</option>
        <option value="politics">Politics</option>
        <option value="business">Business</option>
        <option value="education">Education</option>
      </StyledSelect>
      <p>Article Content</p>
      <span className="md-label" style={{ fontSize: "14px", color: "#333333" }}>
        Expand Editor to full width for better experience
      </span>
      <br />
      <MdEditor
        value={content}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
        className="custom-editor"
      />
      <br />
      <p>Choose Blog Banner</p>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imagePreviewUrl && (
        <img
          src={imagePreviewUrl}
          alt="article image"
          className="article-image"
          style={{ display: "block", marginTop: "1rem" }}
        />
      )}
      <br />
      <br />
      <button onClick={handleSubmit}>Submit Article</button>
    </>
  );
}

export default MarkdownArticleForm;
