import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CarsState, createCar } from "@store/slices/cars";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { getRegions, regionsState } from "@store/slices/regions";
import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { AddCarValidationSchema } from "../../validations/schemas/addCar";

const CreateCar: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const regions = useSelector((state: { regions: regionsState }) => state.regions.regions);
  const alert = useSelector((state: { cars: CarsState }) => state.cars.alert);

  const onSubmit = async (values: { brand: string, regionId: string }, formikProps: FormikHelpers<{ brand: string; regionId: string; }>) => {
    dispatch(createCar({ brand: values.brand, regionId: Number.parseInt(values.regionId) }));
    formikProps.resetForm();
  }

  useEffect(() => {
    dispatch(getRegions());
  }, [])

  return (
    <div className="row d-flex justify-content-center align-items-center h-100">
      <Card className="col-11 col-md-8 col-lg-6 col-xl-5">
        <Card.Body>
          {alert && <Alert variant={alert?.type}>{alert?.message}</Alert>}
          <Formik
            initialValues={{
              brand: "",
              regionId: "",
            }}
            validationSchema={AddCarValidationSchema}
            onSubmit={onSubmit}
          >
            {formik => (
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Field className="form-control" placeholder="Brand" name="brand" />
                  <ErrorMessage component="div" name="brand" className="text-danger small" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Region</Form.Label>
                  <Field className="form-control" as="select" name="regionId">
                    <option key={0} value={0}>None</option>
                    {regions?.map(region => {
                      return <option key={region.id} value={region.id}>{region.name}</option>
                    })
                    }
                  </Field>
                  <ErrorMessage component="div" name="regionId" className="text-danger small" />
                </Form.Group>
                <div className="d-flex flex-row-reverse">
                  <Button type="submit" variant="primary" className="float-right">Add Car</Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body >
      </Card >
    </div>
  );
};

export { CreateCar };
