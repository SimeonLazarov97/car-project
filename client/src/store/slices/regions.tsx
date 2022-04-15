import { createSlice } from "@reduxjs/toolkit";
import { getAllRegions } from "../../api";

export type Region = {
  id: number;
  name: string;
  createdAt: string;
}

export type regionsState = {
  regions: null | Region[];
  isLoading: boolean;
}

const initialState = {
  regions: null,
  isLoading: false
};

const { reducer: regionsReducer, actions } = createSlice({
  name: "regions",
  initialState,
  reducers: {
    getRegionsStart: (state: regionsState) => {
      state.isLoading = true;
    },
    getRegionsSuccess: (state: regionsState, action) => {
      state.isLoading = false;
      state.regions = action.payload.regions;
    },
    getRegionsFailure: (state: regionsState, action) => {
      state.isLoading = false;
      state.regions = null;
    },
  },
});

export const getRegions = () => {
  return async (dispatch: Function) => {
    try {
      dispatch(actions.getRegionsStart());

      const data = await getAllRegions();
      dispatch(actions.getRegionsSuccess(data));
    } catch (err: any) {
      dispatch(actions.getRegionsFailure(err?.response?.data?.message));
    }
  };
};

export { regionsReducer };