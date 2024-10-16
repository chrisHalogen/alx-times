import React, { useState } from "react";
import "./articleBox.scss";
import { MEDIA_BASE_URL } from "../../constants/api";
import { Link } from "react-router-dom";

function ArticleBox({ article }) {
  // const [imgSrc, setImgSrc] = useState(article.image);

  // const handleImageError = () => {
  //   setImgSrc("/assets/placeholder.png");
  // };

  const aux = `${MEDIA_BASE_URL}${article.image}`;
  return (
    <div key={article.id} className="single-article">
      <img
        src={article.image ? article.image : "/assets/placeholder.png"}
        alt={article.title}
      />
      {/* <img src={imgSrc} alt={article.title} onError={handleImageError} /> */}
      <div className="text-content">
        <h3>{article.title}</h3>

        <div className="category-view">
          <p className="category">{article.category.toUpperCase()}</p>
          <Link className="view-btn" to={`/article-detail/${article.id}`}>
            Full Article
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArticleBox;
