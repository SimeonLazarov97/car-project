import React, { useEffect } from "react";
import { Pagination as Pgn } from "react-bootstrap";

const Pagination: React.FC<{ totalCount: number, currentPage: number, setCurrentPage: Function }> = ({ totalCount, currentPage, setCurrentPage }) => {
  const [totalPages] = React.useState<number>(Math.ceil(totalCount / 10));
  const [pages, setPages] = React.useState<JSX.Element[]>([]);

  useEffect(() => {
    createPaginationButtons();
  }, []);

  const createPaginationButtons = () => {
    let items = [];
    let leftSide = currentPage - 2;
    let rightSide = currentPage + 2;

    if (leftSide <= 0) {
      leftSide = 1;
    };

    if (rightSide > totalPages) {
      rightSide = totalPages;
    }

    for (let number = leftSide; number <= rightSide; number++) {
      items.push(
        <Pgn.Item
          key={number}
          onClick={() => { setCurrentPage(number) }}
          className={(number === currentPage ? 'active' : '')}
        >{number}</Pgn.Item>
      );
    }

    setPages(items);
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center mb-5">
      <Pgn>
        <Pgn.Prev onClick={prevPage} />
        {pages}
        <Pgn.Next onClick={nextPage} />
      </Pgn>
    </div>
  );
};

export { Pagination };
