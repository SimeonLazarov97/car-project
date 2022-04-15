import * as yup from "yup";

export const AddCarValidationSchema = yup.object({
  brand: yup
    .string()
    .max(20, "Brand should be less than 20 characters")
    .required("Brand is required"),
  regionId: yup
    .string()
    .required("Region is required"),
});
