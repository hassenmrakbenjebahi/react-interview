import React from 'react';
import './Pagination.css';

const Pagination = ({ page, totalPages, onPageChange, onItemsPerPageChange, itemsPerPage }) => {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>Previous</button>
      <span>Page {page} of {totalPages}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>Next</button>
      <select onChange={onItemsPerPageChange} value={itemsPerPage}>
        <option value={4}>4 </option>
        <option value={8}>8 </option>
        <option value={12}>12 </option>
      </select>
    </div>
  );
};

export default Pagination;
