import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useApi from "../../services/AuthenticatedRequests";
import { RenderMarkdown, Spinner } from "../../components";
import show_alert from "../../utils/show_alerts";
import pprint from "../../utils/pprint";
import nap from "../../utils/nap";

function ViewArticle() {
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

  //   const handleEdit = () => {
  //     navigate(`/account/articles/edit/${id}`, {
  //       state: { article: data },
  //     });
  //   };

  const handleDelete = () => {
    deleteArticle(id)
      .then((response) => {
        console.log("Before calling register log");
        nap(3);
        return registerLog(`Delete Article - ID: ${id}`); // Return the registerLog promise
      })
      .then((logResponse) => {
        // Handle the success response from registerLog
        console.log("After calling register log");
        pprint(logResponse);

        show_alert(
          "success",
          "Article Deleted Successfully. Redirecting Now...",
          "Operation Success"
        );
        nap(3);
        navigate("/account/articles");
      })
      .catch((error) => {
        // Handle any errors during the login or log registration process
        pprint(error);
        show_alert(
          "error",
          "Unable to delete article. Try again later",
          "Operation Failed"
        );
      });
  };

  return (
    <div className="view-article">
      <div className="top-cta">
        <h2 className="dashboard-title">Article Details</h2>
        <Link className="dashboard-cta" to="/account/articles">
          Go Back
        </Link>
      </div>

      <hr className="divider" />

      {loading ? (
        <Spinner />
      ) : data !== null ? (
        <>
          <p className="body-content">
            <strong>Title:</strong>
            {`  ${data.title}`}
          </p>
          <p className="body-content">
            <strong>Category:</strong>
            {`  ${data.category}`}
          </p>
          <p className="body-content">
            <strong>Created At:</strong>
            {`  ${data.created_at}`}
          </p>
          <p className="body-content">
            <strong>Last Updated At:</strong>
            {`  ${data.updated_at}`}
          </p>

          {data.image && (
            <>
              <p className="body-content">
                <strong>Image:</strong>
              </p>
              <img
                className="article-image"
                src={data.image}
                alt={data.title}
              />
              <br />
              <br />
            </>
          )}

          <p className="body-content">
            <strong>Content:</strong>
          </p>
          <RenderMarkdown content={data.content} />
          <br />
          <div className="top-cta">
            <Link className="dashboard-cta" to={`/account/articles/edit/${id}`}>
              Edit
            </Link>

            {/* <button onClick={handleEdit}>Edit</button> */}

            <button onClick={handleDelete}>Delete</button>

            {/* <Link className="dashboard-cta" to="/account/articles">
              
            </Link> */}
          </div>
        </>
      ) : (
        <p className="body-content">Article Not Found</p>
      )}
    </div>
  );
}

export default ViewArticle;
