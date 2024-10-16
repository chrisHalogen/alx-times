import React, { useEffect, useState } from "react";
import { ObjectTable, Spinner } from "../../components";
import useApi from "../../services/AuthenticatedRequests";
import pprint from "../../utils/pprint";
import show_alert from "../../utils/show_alerts";

function Activity() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const { getLogs } = useApi();

  const fetchData = () => {
    setLoading(true);
    getLogs()
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
    <div className="activity-logs">
      <h2 className="dashboard-title">Activity Logs</h2>
      <hr className="divider" />

      {loading ? (
        <Spinner />
      ) : data?.data.length > 0 ? (
        <ObjectTable head={data.head} data={data.data} />
      ) : (
        <p className="body-content">No Logs Found</p>
      )}

      {/* {loading && <Spinner />}
      {!loading && data?.data.length > 0 ? (
        <ObjectTable head={data.head} data={data.data} />
      ) : (
        <p className="body-content">No Logs Found</p>
      )} */}
      {/* {!loading && data?.data.length === 0 && (
        
      )} */}
    </div>
  );
}

export default Activity;
