import React from 'react';
import type { SearchParams } from '@/types/todo';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  updateSearchParams: (_updates: Partial<SearchParams>) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  updateSearchParams: updateParams
}) => {
  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 3; // Increased from 2 to show more pages
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    // Adjust if we're at the beginning or end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (page: number) => {
    updateParams({ page });
  };

  return (
    <div className="flex items-center justify-center space-x-2 my-6 px-3">
      <button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 sm:px-4 py-2 text-sm border rounded ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        Previous
      </button>

      {/* Show first page and ellipsis if needed */}
      {currentPage > 3 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            1
          </button>
          {currentPage > 4 && <span className="px-2">...</span>}
        </>
      )}

      {/* Visible page numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 sm:px-4 py-2 text-sm border rounded ${
            page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Show last page and ellipsis if needed */}
      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && <span className="px-2">...</span>}
          <button
            onClick={() => handlePageChange(totalPages)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 sm:px-6 py-2 text-sm border rounded ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;