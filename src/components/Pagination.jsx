import { Link } from '@tanstack/react-router';

const Pagination = ({ currentPage, totalPages, searchParams, basePath = '/' }) => {
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

  return (
    <div className="flex items-center justify-center space-x-2 my-6 px-3">
      <Link
        to={basePath}
        search={(prev) => ({ ...prev, page: Math.max(1, currentPage - 1) })}
        disabled={currentPage === 1}
        className={`px-3 sm:px-4 py-2 text-sm border rounded ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        Previous
      </Link>

      {/* Show first page and ellipsis if needed */}
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

      {/* Visible page numbers */}
      {getPageNumbers().map((page) => (
        <Link
          key={page}
          to={basePath}
          search={(prev) => ({ ...prev, page })}
          className={`px-3 sm:px-4 py-2 text-sm border rounded ${
            page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Show last page and ellipsis if needed */}
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
        search={(prev) => ({ ...prev, page: Math.min(totalPages, currentPage + 1) })}
        disabled={currentPage === totalPages}
        className={`px-3 sm:px-6 py-2 text-sm border rounded ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;