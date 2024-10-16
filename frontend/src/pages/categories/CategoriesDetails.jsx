import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  ArticleList,
  ArticlePagination,
  Footer,
  Header,
  Hero,
  Spacer,
  Spinner,
} from "../../components";
import UnauthenticatedRequests from "../../services/UnauthenticatedRequests";
import show_alert from "../../utils/show_alerts";
import pprint from "../../utils/pprint";
import { CATEGORIES_MAP } from "../../constants/categories";

const getCategoryBySlug = (slug) => {
  return CATEGORIES_MAP.find((category) => category.slug === slug);
};

function CategoriesDetails() {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  const fetchData = () => {
    setLoading(true);
    UnauthenticatedRequests.filterArticle("", slug, null, true, page)
      .then((response) => {
        setData(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 6));
        // pprint(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        show_alert("error", "Unable to fetch data", "Operation Failed");
      });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage); // Change the current page
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="category-list-page">
      <Header />
      <Hero
        imageBGurl={`/assets/${category.banner}`}
        title={"Articles By Category"}
        subtitle={`Category: ${slug.toUpperCase()}`}
      />

      {loading ? (
        <Spinner />
      ) : data?.length > 0 ? (
        <>
          {" "}
          <div className="page-content-wrapper">
            <ArticleList data={data} />
            <ArticlePagination
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              page={page}
            />
          </div>
        </>
      ) : (
        <div className="page-content-wrapper">
          <p className="body-content" style={{ textAlign: "center" }}>
            No Articles Found
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: "1.5rem",
            }}
          >
            <Link className="btn-back" to="/categories">
              Go Back
            </Link>
          </div>
        </div>
      )}

      {/* {loading && <Spinner />}
      {!loading && data?.length > 0 ? (
        <>
          {" "}
          <div className="page-content-wrapper">
            <ArticleList data={data} />
            <ArticlePagination
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              page={page}
            />
          </div>
        </>
      ) : (
        <div className="page-content-wrapper">
          <p className="body-content" style={{ textAlign: "center" }}>
            No Articles Found
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: "1.5rem",
            }}
          >
            <Link className="btn-back" to="/categories">
              Go Back
            </Link>
          </div>
        </div>
      )} */}
      <Footer />
    </div>
  );
}

export default CategoriesDetails;
