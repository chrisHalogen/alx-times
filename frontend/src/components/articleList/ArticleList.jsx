import React from "react";
import { MEDIA_BASE_URL } from "../../constants/api";
import "./list.scss";
import { Link } from "react-router-dom";
import ArticleBox from "./ArticleBox";

function ArticleList({ data }) {
  return (
    <div className="articles-wrapper">
      <div className="articles-grid">
        {data.map((article, count) => (
          <ArticleBox article={article} key={count} />
          //   <div key={article.id} className="single-article">
          //     <img
          //       src={
          //         article.image
          //           ? `${MEDIA_BASE_URL}${article.image}`
          //           : "/assets/placeholder.png"
          //       }
          //       alt={article.title}
          //     />
          //     <div className="text-content">
          //       <h3>{article.title}</h3>

          //       <div className="category-view">
          //         <p className="category">{article.category.toUpperCase()}</p>
          //         <Link className="view-btn" to={`/article-detail/${article.id}`}>
          //           Full Article
          //         </Link>
          //       </div>
          //     </div>
          //   </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
