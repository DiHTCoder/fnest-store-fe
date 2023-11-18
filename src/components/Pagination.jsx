import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pageButtons = [];

    for (let i = 0; i < totalPages; i++) {
        pageButtons.push(
            <button
                key={i}
                className={`join-item btn btn-md ${currentPage === i ? 'btn-active' : ''}`}
                onClick={() => onPageChange(i)}
            >
                {i + 1}
            </button>,
        );
    }

    return (
        <div className="mt-16 flex justify-end">
            <div className="join bg-slate-400">{pageButtons}</div>
        </div>
    );
};

export default Pagination;
