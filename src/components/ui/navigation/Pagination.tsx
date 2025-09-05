import React from 'react';
import Button from '../Button';

const generatePagination = (currentPage: number, totalPages: number): (number | string)[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }
  if (currentPage > totalPages - 4) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, className }) => {
  if (totalPages <= 1) return null;

  const paginationNumbers = generatePagination(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className={className}>
      <div className="inline-flex items-center -space-x-px shadow-sm">
        <Button 
          size="sm" 
          variant="secondary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-r-none"
          aria-label="Previous page"
        >
          <i className="bi bi-chevron-left"></i>
        </Button>
       
        {paginationNumbers.map((page, index) => 
          typeof page === 'number' ? (
            <Button
              key={index}
              size="sm"
              variant={currentPage === page ? 'primary' : 'secondary'}
              onClick={() => onPageChange(page)}
              disabled={currentPage === page}
              className="rounded-none"
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Button>
          ) : (
            <span key={index} className="px-3 py-1.5 text-sm font-medium text-neutral-600 bg-neutral-0 border-y border-neutral-300 dark:bg-neutral-1000 dark:border-neutral-700 dark:text-neutral-300">
              ...
            </span>
          )
        )}
        <Button 
          size="sm" 
          variant="secondary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-l-none"
          aria-label="Next page"
        >
          <i className="bi bi-chevron-right"></i>
        </Button>
      </div>
    </nav>
  );
};

export default Pagination;
