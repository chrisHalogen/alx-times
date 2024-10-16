import React from "react";
import "./objectTable.scss";
import { Link } from "react-router-dom";

const ObjectTable = ({ data, head }) => {
  function formatString(str) {
    // Replace underscores with spaces
    str = str.replace(/_/g, " ");

    // Capitalize every word
    str = str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });

    return str;
  }

  return (
    <>
      <table className="styled-table">
        <thead>
          <tr>
            {head.map((col, index) => (
              <th key={index}>{formatString(col)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((rowData, index) => (
            <tr key={index}>
              {head.map((col, index) =>
                col === "action" ? (
                  <td key={index}>
                    <Link className="table-action-link" to={rowData[col]}>
                      View
                    </Link>
                  </td>
                ) : (
                  <td key={index}>{rowData[col]}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mobile-tables" style={{ padding: 0 }}>
        {data.map((rowData, index) => (
          <table key={index} className="mobile-table" style={{ padding: 0 }}>
            <tbody>
              {head.map((col, idx) => (
                <tr key={idx}>
                  <td className="row-key">
                    <strong>{formatString(col)}</strong>
                  </td>
                  {col === "action" ? (
                    <td className="row-value">
                      <Link className="table-action-link" to={rowData[col]}>
                        View
                      </Link>
                    </td>
                  ) : (
                    <td className="row-value">{rowData[col]}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </>
  );
};

export default ObjectTable;
