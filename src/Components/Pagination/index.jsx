import { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [displayedPages, setDisplayedPages] = useState([]);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const generatePageNumbers = () => {
    const pagesToShow = 5; // Кількість елементів пагінації
    const ellipsis = '...';

    if (totalPages <= 1) {
      // Якщо сторінок одна або менше, повертаємо пустий масив
      return [];
    }

    const middlePages = Math.floor((pagesToShow - 1) / 2);
    const firstPage = Math.max(1, currentPage - middlePages);
    const lastPage = Math.min(currentPage + middlePages, totalPages);

    let pages = [];

    if (firstPage > 1) {
      pages.push(1);
      if (firstPage > 2) {
        pages.push(ellipsis);
      }
    }

    for (let i = firstPage; i <= lastPage; i++) {
      pages.push(i);
    }

    if (lastPage < totalPages) {
      if (lastPage < totalPages - 1) {
        pages.push(ellipsis);
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const renderPageNumbers = () => {
    const pages = generatePageNumbers();

    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <button key={index} className="catalog__pagination-item dots">
            {page}
          </button>
        );
      }

      return (
        <button
          key={index}
          className={page === currentPage ? 'catalog__pagination-item active' : 'catalog__pagination-item'}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="pagination">
      {renderPageNumbers()}
    </div>
  );
};

export default Pagination;
