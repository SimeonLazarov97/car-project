import { createSlice } from "@reduxjs/toolkit";
import { addCar, getAllCars, removeCar } from "../../api";

export type Car = {
  id: number;
  brand: string;
  region: string;
  createdAt: string;
}

export type CarsState = {
  alert: null | { type: string, message: string };
  cars: null | Car[];
  total: number;
  isLoading: boolean;
}

const DANGER_TYPE = "danger";
const SUCCESS_TYPE = "success";

const initialState = {
  alert: null,
  cars: null,
  total: 0,
  isLoading: false
};

const { reducer: carsReducer, actions } = createSlice({
  name: "cars",
  initialState,
  reducers: {
    start: (state) => {
      state.isLoading = true;
      state.alert = null;
    },
    getCarsSuccess: (state: CarsState, action) => {
      state.isLoading = false;
      state.cars = action.payload.cars;
      state.total = action.payload.total;
      state.alert = null;
    },
    getCarsFailure: (state: CarsState, action) => {
      state.isLoading = false;
      state.cars = null;
      state.alert = { type: DANGER_TYPE, message: "Something went wrong, please try again later!" };
    },
    deleteCarSuccess: (state: CarsState, action) => {
      state.isLoading = false;
      state.cars = state.cars!.filter(car => car.id !== action.payload);
      state.alert = { type: SUCCESS_TYPE, message: "Car deleted successfully" };
    },
    deleteCarFailure: (state: CarsState, action) => {
      state.isLoading = false;
      state.cars = null;
      state.alert = { type: DANGER_TYPE, message: "Something went wrong, please try again later!" };
    },
    addCarSuccess: (state: CarsState, action) => {
      state.isLoading = false;
      state.cars = state.cars;
      state.alert = { type: SUCCESS_TYPE, message: "Car added successfully" };
    },
    addCarFailure: (state: CarsState, action) => {
      state.isLoading = false;
      state.cars = null;
      state.alert = { type: "danger", message: "Something went wrong, please try again later!" };
    },
  },
});

export const getCars = ({ page, brand, regionId }: { page: number, brand?: string, regionId?: number }) => {
  return async (dispatch: Function) => {
    try {
      dispatch(actions.start());

      const data = await getAllCars({ page, brand, regionId });

      dispatch(actions.getCarsSuccess(data));
    } catch (err: any) {
      dispatch(actions.getCarsFailure(err));
    }
  };
};

export const createCar = ({ brand, regionId }: { brand: string, regionId: number }) => {
  return async (dispatch: Function) => {
    try {
      dispatch(actions.start());

      const data = await addCar({ brand, regionId });

      dispatch(actions.addCarSuccess(data));
    } catch (err: any) {
      dispatch(actions.addCarFailure(err));
    }
  };
};

export const deleteCar = (carId: number) => {
  return async (dispatch: Function) => {
    try {
      dispatch(actions.start());

      await removeCar(carId);

      dispatch(actions.deleteCarSuccess(carId));
    } catch (err: any) {
      dispatch(actions.deleteCarFailure(err));
    }
  };
};

export { carsReducer };