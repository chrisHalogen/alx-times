import React from "react";
import ArticlePagination from "./ArticlePagination";

function ArticleGrid({ data, handlePageChange }) {
  return (
    <>
      <div className="articles-list">
        <div className="grid-container">
          {data.map((article) => (
            <div key={article.id} className="single-article">
              <img
                src={`http://127.0.0.1:8000${article.image}`}
                alt={article.title}
              />
              <div className="text-content">
                <h3>{article.title}</h3>

                <div className="category-view">
                  <p className="category">{article.category}</p>
                  <Link to={`/article-detail/${article.id}`}>Full Article</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ArticlePagination
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      {/* <div className="pagination-wrapper">
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={page === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default ArticleGrid;
