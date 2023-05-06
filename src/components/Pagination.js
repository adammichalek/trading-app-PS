import React from "react";

const Pagination = ({ itemsPerPage, totalItems, setCurrentPage }) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  };

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page, index) => (
          <li key={index} className="page-item">
            <a onClick={() => setCurrentPage(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
