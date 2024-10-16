import React, { useEffect, useState } from "react";
import { MarkdownEditArticle, Spinner } from "../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import useApi from "../../services/AuthenticatedRequests";
import show_alert from "../../utils/show_alerts";
import pprint from "../../utils/pprint";

function EditArticle() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { getArticle, deleteArticle, registerLog } = useApi();

  const fetchData = () => {
    setLoading(true);
    getArticle(id)
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
    <div className="create-articles">
      <div className="top-cta">
        <h2 className="dashboard-title">Edit Article</h2>
        <Link className="dashboard-cta" to="/account/articles">
          Go Back
        </Link>
      </div>

      <hr className="divider" />

      {loading ? (
        <Spinner />
      ) : data !== null ? (
        <>
          <p className="body-content">Modify the article as needed</p>
          <MarkdownEditArticle article={data} />
        </>
      ) : (
        <p className="body-content">Article Not Found</p>
      )}

      {/* {loading && <Spinner />}
      {!loading && data !== null ? (
        <>
          <p className="body-content">Modify the article as needed</p>
          <MarkdownEditArticle article={data} />
        </>
      ) : (
        <p className="body-content">Article Not Found</p>
      )} */}

      {/* <p className="body-content">Modify the article as needed</p>
      <MarkdownEditArticle /> */}

      {/* <Link className="dashboard-cta" to="/account/my-profile/edit">
Edit My Profile
</Link> */}
    </div>
  );
}

export default EditArticle;
