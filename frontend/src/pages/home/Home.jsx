import React, { useEffect, useState } from "react";
import { Footer, Header, Hero, Spacer, Spinner } from "../../components";
import { Link } from "react-router-dom";
import ArticleBox from "../../components/articleList/ArticleBox";
import UnauthenticatedRequests from "../../services/UnauthenticatedRequests";
import pprint from "../../utils/pprint";
import show_alert from "../../utils/show_alerts";
import { CATEGORIES_MAP } from "../../constants/categories";

function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = () => {
    setLoading(true);
    UnauthenticatedRequests.fetchHomeArticles()
      .then((response) => {
        setData(response.data);
        // pprint(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        show_alert("error", "Unable to fetch data", "Operation Failed");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Hero
        imageBGurl="/assets/home-hero-img.jpg"
        title={"ALX TIMES"}
        subtitle={`Stay informed, explore new perspectives, and never miss a beat with ALX Times — Your source for timely updates, expert opinions, and in-depth analysis.`}
      />

      <div className="page-content-container">
        <div className="page-content">
          {loading && <Spinner />}

          {data?.latest && (
            <div className="content-box">
              <div className="top-bar-actions">
                <h2>Latest Articles</h2>
                <Link to="/latest">View All</Link>
              </div>
              <div className="articles-grid">
                {data.latest.map((item, count) => (
                  <ArticleBox article={item} key={count} />
                ))}
              </div>
            </div>
          )}

          <Spacer height={60} />

          {data?.featured && (
            <div className="content-box">
              <div className="top-bar-actions">
                <h2>Featured Articles</h2>
                <Link to="/featured">View All</Link>
              </div>
              <div className="articles-grid">
                {data.featured.map((item, count) => (
                  <ArticleBox article={item} key={count} />
                ))}
              </div>
            </div>
          )}

          <Spacer height={60} />

          <div className="content-box">
            <div className="top-bar-actions">
              <h2>Categories</h2>
              <Link to="/categories">View All</Link>
            </div>
            <div className="categories-grid">
              {CATEGORIES_MAP.slice(0, 3).map((item, index) => (
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

          <Spacer height={60} />

          <div className="content-box">
            <div className="top-bar-actions">
              <h2>About</h2>
              <Link to="/about">Learn More</Link>
            </div>
            <p style={{ marginTop: "1.5rem" }}>
              ALX Times is a dynamic project designed to keep users informed,
              organized, and connected. Built with a focus on performance and
              usability, it delivers seamless access to the latest information
              while maintaining simplicity. This platform is the culmination of
              months of learning, dedication, and hands-on experience in the ALX
              Software Engineering Program. It embodies the principles of
              practical software development, teamwork, and problem-solving -
              all of which were key pillars throughout the journey.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
