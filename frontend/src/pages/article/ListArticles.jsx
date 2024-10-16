import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../services/AuthenticatedRequests";
import {
  ArticlePagination,
  ObjectTable,
  Spacer,
  Spinner,
} from "../../components";
import show_alert from "../../utils/show_alerts";
import convertActionToLink from "../../utils/convertAction";
import pprint from "../../utils/pprint";

function ListArticles() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  const { getArticles } = useApi();

  const fetchData = () => {
    setLoading(true);
    getArticles(page)
      .then((response) => {
        setData(convertActionToLink(response.data.results));
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
    <div className="list-articles">
      <div className="top-cta">
        <h2 className="dashboard-title">My Articles</h2>
        <Link className="dashboard-cta" to="/account/articles/create">
          Create New
        </Link>
      </div>

      <hr className="divider" />

      {loading ? (
        <Spinner />
      ) : data?.data.length > 0 ? (
        <>
          <ObjectTable head={data.head} data={data.data} />
          <Spacer height={30} />
          <ArticlePagination
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            page={page}
          />
        </>
      ) : (
        <p className="body-content">You don't have any articles.</p>
      )}

      {/* {loading && <Spinner />}
      {!loading && data?.data.length > 0 ? (
        <>
          <ObjectTable head={data.head} data={data.data} />
          <Spacer height={30} />
          <ArticlePagination
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            page={page}
          />
        </>
      ) : (
        <p className="body-content">You don't have any articles.</p>
      )} */}
    </div>
  );
}

export default ListArticles;
