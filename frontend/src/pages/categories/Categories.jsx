import React from "react";
import { Footer, Header, Hero } from "../../components";
import { CATEGORIES_MAP } from "../../constants/categories";
import { Link } from "react-router-dom";
import "./categories.scss";

function Categories() {
  return (
    <div className="categories-page">
      <Header />
      <Hero
        imageBGurl="/assets/categories-hero-img.jpg"
        title={"Categories"}
        // subtitle={`Search Term: ${searchTerm}`}
      />
      <div className="category-page-content-wrapper">
        <div className="categories-grid">
          {CATEGORIES_MAP.map((item, index) => (
            <Link
              className="single-category"
              key={index}
              to={`/categories/${item.slug}`}
            >
              <img src={`/assets/${item.banner}`} alt={item.name} />
              <div className="text-content">
                <h3>{item.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Categories;
