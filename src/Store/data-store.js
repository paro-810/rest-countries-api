import { createSlice } from "@reduxjs/toolkit";

const initialState = { countries: [] };
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getData(state, actions) {
      state.countries = actions.payload;
    },
  },
});

export const fetchData = (url) => {
  return (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(dataSlice.actions.getData(data));
    };
    sendRequest();
  };
};

export const regionWiseFetch = (url, region) => {
  return (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(url);
      const data = await response.json();
      if (region !== "#") {
        const filteredData = data.filter(
          (country) =>
            country.region.trim().toLowerCase() === region.trim().toLowerCase()
        );
        dispatch(dataSlice.actions.getData(filteredData));
      } else if (region === "#") {
        dispatch(dataSlice.actions.getData(data));
      }
    };
    sendRequest();
  };
};

export const dataSliceActions = dataSlice.actions;
export default dataSlice;
