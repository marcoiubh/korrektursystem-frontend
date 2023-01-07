import React, { useEffect, useState } from 'react';

import _ from 'lodash';

import '../../../css/pagination.css';

import PageButton from '../atomic/PageButton';

const Pagination = ({ currentPage, itemsCount, onPageChange, pageSize }) => {
  const [numberOfPages, setNumberOfPages] = useState(0);

  // array of page numbers to display
  const [pages, setPages] = useState([]);

  // skipping state
  const [offset, setOffset] = useState(0);

  // lowest and highest page number
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    // limit lowest and highest page number
    const setBoundaries = (left, right) => {
      if (left < 1) {
        left = 1;
        right = 4;
        setOffset(0);
      }

      if (right > numberOfPages + 1) {
        left = numberOfPages - 3;
        right = numberOfPages;
        setOffset(0);
      }
      setMin(left);
      setMax(right);
    };

    const renderButtons = (offset) => {
      // one page, no button
      if (numberOfPages === 1) {
        setBoundaries(1, 1);
      }
      // less than 4 pages
      else if (numberOfPages < 4) {
        setBoundaries(1, numberOfPages + 1);
      }
      // more than 3 pages
      else {
        // show current page in center position
        if (currentPage <= 2) {
          setBoundaries(1 + offset, 4 + offset);
        } else if (currentPage >= numberOfPages - 1) {
          setBoundaries(numberOfPages - 2 + offset, numberOfPages + 1 + offset);
        } else {
          setBoundaries(currentPage - 1 + offset, currentPage + 2 + offset);
        }
      }
      // set array with page numbers from lowest to highest
      setPages(_.range(min, max));
    };
    renderButtons(offset);
  }, [currentPage, numberOfPages, offset, min, max]);

  useEffect(() => {
    // calculate number of pages
    setNumberOfPages(Math.ceil(itemsCount / pageSize));
  });

  // next button
  const handleNext = () => {
    const newOffset = offset + 1;
    // handle clicks only within range
    if (max <= numberOfPages) setOffset(newOffset);
  };

  // previous button
  const handlePrevious = () => {
    const newOffset = offset - 1;
    // handle clicks only within range
    if (min > 1) setOffset(newOffset);
  };

  return (
    <div className='pagination'>
      {/* previous */}
      {numberOfPages > 3 && min > 1 && (
        <div className='pagination__previous'>
          <PageButton
            page={<span>&laquo;</span>}
            onClick={handlePrevious}
          />
        </div>
      )}

      {/* pages */}
      <div className='pagination__button'>
        {pages.map((page) => (
          <PageButton
            key={page}
            page={page}
            // active button
            currentPage={currentPage}
            onClick={onPageChange}
          />
        ))}
      </div>

      {/* next */}
      {numberOfPages > 3 && max <= numberOfPages && (
        <div className='pagination__next'>
          <PageButton
            page={<span>&raquo;</span>}
            onClick={handleNext}
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
