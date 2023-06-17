import React from "react";
import { Pagination } from "react-bootstrap";

// interface Props {
//   activePage: number;
//   totalPages: number;
//   onPageChange: (pageNumber: number) => void;
//   prevButtonLabel?: string;
//   nextButtonLabel?: string;
//   hideEllipsis?: boolean;
//   prevButtonStyle?: React.CSSProperties;
//   nextButtonStyle?: React.CSSProperties;
// }

const SmartPagination = ({
  activePage,
  totalPages,
  onPageChange,
  prevButtonLabel = "Previous",
  nextButtonLabel = "Next",
  hideEllipsis = false,
  prevButtonStyle = {},
  nextButtonStyle = {},
}) => {
  const getPageItems = () => {
    const pageItems = [];

    // Add previous button
    pageItems.push(
      <Pagination.Prev
        key="prev"
        disabled={activePage === 1}
        style={prevButtonStyle}
        onClick={() => onPageChange(activePage - 1)}
      >
        {prevButtonLabel}
      </Pagination.Prev>
    );

    // Add first page item
    if (activePage > 3) {
      pageItems.push(
        <Pagination.Item key={1} onClick={() => onPageChange(1)}>
          1
        </Pagination.Item>
      );
    }

    // Add ellipsis
    if (!hideEllipsis && activePage > 4) {
      pageItems.push(<Pagination.Ellipsis key="ellipsis1" />);
    }

    // Add middle pages
    for (let i = activePage - 2; i <= activePage + 2; i++) {
      if (i > 0 && i <= totalPages) {
        pageItems.push(
          <Pagination.Item
            key={i}
            // active={i === activePage}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    }

    // Add ellipsis
    if (!hideEllipsis && activePage < totalPages - 3) {
      pageItems.push(<Pagination.Ellipsis key="ellipsis2" />);
    }

    // Add last page item
    if (activePage+1 < totalPages - 1) {
      pageItems.push(
        <Pagination.Item
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    // Add next button
    pageItems.push(
      <Pagination.Next
        key="next"
        disabled={activePage === totalPages}
        style={nextButtonStyle}
        onClick={() => onPageChange(activePage + 1)}
      >
        {nextButtonLabel}
      </Pagination.Next>
    );

    return pageItems;
  };

  return (
    <Pagination >
      {getPageItems()}
    </Pagination>
  );
};

export default SmartPagination;
