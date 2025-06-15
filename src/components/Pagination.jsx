'use client';

import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const Pagination = ({ currentPage, totalPages, basePath = '/' }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 2;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 my-6 px-3">
      <Link
        to={basePath}
        search={(prev) => ({ ...prev, page: Number(currentPage) - 1 })}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        Previous
      </Link>

      {currentPage > 3 && (
        <>
          <Link
            to={basePath}
            search={(prev) => ({ ...prev, page: 1 })}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            1
          </Link>
          {currentPage > 4 && <span className="px-2">...</span>}
        </>
      )}

      {getPageNumbers().map((page) => (
        <Link
          key={page}
          to={basePath}
          search={(prev) => ({ ...prev, page })}
          className={`px-4 py-2 border rounded ${
            page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && <span className="px-2">...</span>}
          <Link
            to={basePath}
            search={(prev) => ({ ...prev, page: totalPages })}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            {totalPages}
          </Link>
        </>
      )}

      <Link
        to={basePath}
        search={(prev) => ({ ...prev, page: Number(currentPage) + 1 })}
        disabled={currentPage === totalPages}
        className={`px-8 py-2 border rounded ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;
