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
import { Link, useLocation } from "react-router-dom";
import UnauthenticatedRequests from "../../services/UnauthenticatedRequests";
import show_alert from "../../utils/show_alerts";
import pprint from "../../utils/pprint";

function Latest() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  const fetchData = () => {
    setLoading(true);
    UnauthenticatedRequests.filterArticle("", "", null, true, page)
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
    <div className="latest-page">
      <Header />
      <Hero
        imageBGurl="/assets/latest-hero-img.jpg"
        title={"Latest Articles"}
        // subtitle={`Search Term: ${searchTerm}`}
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
        </div>
      )} */}

      <Footer />
    </div>
  );
}

export default Latest;
