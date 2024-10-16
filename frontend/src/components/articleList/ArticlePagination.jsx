import React from "react";
import "./pagination.scss";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function ArticlePagination({ page, totalPages, handlePageChange }) {
  // Calculate the start and end page numbers for the pagination buttons
  const maxButtons = 5;
  const halfMax = Math.floor(maxButtons / 2);
  let startPage = Math.max(1, page - halfMax);
  let endPage = Math.min(totalPages, page + halfMax);

  // Adjust the start and end page if there are not enough pages
  if (endPage - startPage < maxButtons - 1) {
    if (startPage === 1) {
      endPage = Math.min(startPage + maxButtons - 1, totalPages);
    } else {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
  }

  return (
    <div className="pagination-wrapper">
      <div className="pagination">
        {/* Previous Button */}
        {page > 1 && (
          <button onClick={() => handlePageChange(page - 1)}>
            <FaAngleLeft />
          </button>
        )}

        {/* First Page Button */}
        {startPage > 1 && (
          <>
            <button onClick={() => handlePageChange(1)}>1</button>
            {startPage > 2 && <span>...</span>}{" "}
            {/* Ellipsis if there are skipped pages */}
          </>
        )}

        {/* Page Number Buttons */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <button
            key={startPage + i}
            onClick={() => handlePageChange(startPage + i)}
            className={page === startPage + i ? "active" : ""}
          >
            {startPage + i}
          </button>
        ))}

        {/* Last Page Button */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span>...</span>}{" "}
            {/* Ellipsis if there are skipped pages */}
            <button onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        {page < totalPages && (
          <button onClick={() => handlePageChange(page + 1)}>
            <FaAngleRight />
          </button>
        )}
      </div>
    </div>
  );
}

export default ArticlePagination;
