import React, { useEffect, useState } from "react";
import {
  Footer,
  Header,
  Hero,
  RenderMarkdown,
  Spinner,
} from "../../components";
import UnauthenticatedRequests from "../../services/UnauthenticatedRequests";
import pprint from "../../utils/pprint";
import { Link, useParams } from "react-router-dom";
import show_alert from "../../utils/show_alerts";

function SingleArticle() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = () => {
    setLoading(true);
    UnauthenticatedRequests.fetchArticleDetails(id)
      .then((response) => {
        setData(response.data);
        pprint(response.data);
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
    <div className="single-article-page">
      <Header />
      <Hero
        imageBGurl={data?.image || "/assets/landscape-placeholder.jpg"}
        title={data?.title || "Loading..."}
        // subtitle={`Search Term: ${searchTerm}`}
      />
      {loading && <Spinner />}
      {!loading && data ? (
        <>
          <div className="page-content-container">
            <div className="article-details">
              <RenderMarkdown content={data?.content} />
              <hr className="article-divider" />

              <h2>Article Details</h2>
              <p>
                <strong>Author: </strong>
                {data?.author}
              </p>
              <p>
                <strong>Category: </strong>
                {data?.category.charAt(0).toUpperCase() +
                  data?.category.slice(1)}
              </p>
              <p>
                <strong>Published Date: </strong>
                {data?.created_at}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="page-content-wrapper">
          <p className="body-content" style={{ textAlign: "center" }}>
            Article Not Found
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
            <Link className="btn-back" to="/">
              Go Back Home
            </Link>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default SingleArticle;
