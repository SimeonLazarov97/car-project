import { combineReducers } from "redux";

import { regionsReducer } from "./slices/regions";
import { carsReducer } from "./slices/cars";

export const rootReducer = combineReducers({
  regions: regionsReducer,
  cars: carsReducer,
});
