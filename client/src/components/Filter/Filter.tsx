import React from "react";
import { ErrorMessage, Field, Formik } from "formik";
import { Button, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { regionsState } from "@store/slices/regions";

const Filter: React.FC<{
  setBrand: Function,
  setRegionId: Function,
  setCurrentPage: Function
}> = ({ setBrand, setRegionId, setCurrentPage }) => {
  const regions = useSelector((state: { regions: regionsState }) => state.regions.regions);

  const onSubmit = async (values: { brand: string, regionId: string }, formikProps: any) => {
    setBrand(values.brand);
    setRegionId(Number.parseInt(values.regionId));
    setCurrentPage(1)
  };

  return (
    <Formik
      initialValues={{
        brand: "",
        regionId: "",
      }}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form onSubmit={formik.handleSubmit} className="mb-3">
          <Row>
            <Form.Group className="col-4">
              <Form.Label>Brand</Form.Label>
              <Field className="form-control" placeholder="Brand" name="brand" />
              <ErrorMessage component="div" name="brand" className="text-danger small" />
            </Form.Group>
            <Form.Group className="col-4">
              <Form.Label>Region</Form.Label>
              <Field className="form-control" as="select" name="regionId">
                <option key={0} value={0}>All</option>
                {regions?.map(region => {
                  return <option key={region.id} value={region.id}>{region.name}</option>
                })
                }
              </Field>
              <ErrorMessage component="div" name="regionId" className="text-danger small" />
            </Form.Group>
            <Form.Group className="col-4 d-flex align-items-end">
              <Button type="submit" className="col-12" variant="primary"> Filter </Button>
            </Form.Group>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export { Filter };
