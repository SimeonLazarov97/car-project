import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Filter } from "@components/Filter/Filter";
import { Table } from "@components/Table/Table";
import { CarsState, deleteCar, getCars, } from "@store/slices/cars";
import { getRegions } from "@store/slices/regions";

const ListCars: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<number>();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [brand, setBrand] = React.useState<string>();
  const [regionId, setRegionId] = React.useState<number>();

  const isLoading = useSelector((state: { cars: CarsState }) => state.cars.isLoading);
  const cars = useSelector((state: { cars: CarsState }) => state.cars.cars);
  const alert = useSelector((state: { cars: CarsState }) => state.cars.alert);
  const totalCount = useSelector((state: { cars: CarsState }) => state.cars.total);

  const tableHeaders = ["Id", "Brand", "Region", "Date of creation", ""];

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (id: number) => {
    setShow(true);
    setSelectedCarId(id);
  };

  const handleDelete = () => {
    dispatch(deleteCar(selectedCarId!));
    setShow(false);
  }

  useEffect(() => {
    dispatch(getCars({ page: currentPage, brand, regionId }));
    dispatch(getRegions());
  }, [currentPage, brand, regionId])

  return (
    <>
      {isLoading
        ? <div className="d-flex justify-content-center align-items-center mb-5">
          <Spinner animation="border" variant="primary" role="status" style={{ width: "150px", height: "150px" }} />
        </div>
        : <>
          {alert && <Alert variant={alert?.type}>{alert?.message}</Alert>}
          <Filter setBrand={setBrand} setRegionId={setRegionId} setCurrentPage={setCurrentPage} />
          <hr />
          <Table
            cars={cars}
            headers={tableHeaders}
            totalCount={totalCount}
            handleShow={handleShow}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage} />
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>Are you sure you want to delete this car?</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleDelete}>
                Confirm
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      }
    </>
  );
};

export { ListCars };
