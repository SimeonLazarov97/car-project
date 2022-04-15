import React from "react";
import { Button, Table as Tbl } from "react-bootstrap";
import { Car } from "@store/slices/cars";
import { Pagination } from "../Pagination/Pagination";

const Table: React.FC<{
  cars: Car[] | null,
  headers: string[],
  totalCount: number,
  handleShow: Function,
  currentPage: number,
  setCurrentPage: Function
}> = ({ cars, headers, handleShow, totalCount, currentPage, setCurrentPage }) => {
  return (
    <>
      {cars?.length || cars === null
        ? <>
          <Tbl striped bordered hover>
            <thead>
              <tr>
                {headers.map((header: string, i: number) => {
                  return <th key={i}>{header}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {cars?.map(car => {
                return <tr key={car.id}>
                  <td>{car.id}</td>
                  <td>{car.brand}</td>
                  <td>{car.region}</td>
                  <td>{car.createdAt?.slice(0, 10)}</td>
                  <td><Button variant="primary" onClick={() => handleShow(car.id)}>Delete</Button></td>
                </tr>
              })
              }
            </tbody>
          </Tbl>
          <Pagination totalCount={totalCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
        : <h1 className="text-align-center">No Cars Available</h1>}

    </>
  );
};

export { Table };
