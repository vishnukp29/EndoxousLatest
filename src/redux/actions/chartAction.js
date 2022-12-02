import axios from "../../axios";
import {
  ORDERS_CHART_REQUEST,
  ORDERS_CHART_SUCCESS,
  ORDERS_CHART_FAIL,
  SALES_CHART_REQUEST,
  SALES_CHART_SUCCESS,
  SALES_CHART_FAIL,
  SALES_PER_DAY_REQUEST,
  SALES_PER_DAY_SUCCESS,
  SALES_PER_DAY_FAIL,
  ORDER_PER_DAY_REQUEST,
  ORDER_PER_DAY_SUCCESS,
  ORDER_PER_DAY_FAIL,
  
  CLEAR_ERRORS,
} from "../../constants/chartConstants";
// GET Order Chart
export const getOrderChart = () => async (dispatch) => {
  try {
    dispatch({ type: ORDERS_CHART_REQUEST });

    const { data } = await axios.get(`/admin/orderchart`);

    dispatch({ type: ORDERS_CHART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDERS_CHART_FAIL,
      payload: error.response.data,
    });
  }
};

// GET Sales Chart
export const getSalesOrdders = () => async (dispatch) => {
  try {
    dispatch({ type: SALES_CHART_REQUEST });

    const { data } = await axios.get(`/admin/chart`);

    dispatch({ type: SALES_CHART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SALES_CHART_FAIL,
      payload: error.response.data,
    });
  }
};
// GET Sales Per day
export const getSalesperDay = () => async (dispatch) => {
  try {
    dispatch({ type: SALES_PER_DAY_REQUEST });

    const { data } = await axios.get(`/admin/perDaysales`);

    dispatch({ type: SALES_PER_DAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SALES_PER_DAY_FAIL,
      payload: error.response.data,
    });
  }
};

export const getperDayOders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_PER_DAY_REQUEST });

    const { data } = await axios.get(`/admin/perDayOders`);

    dispatch({ type: ORDER_PER_DAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_PER_DAY_FAIL,
      payload: error.response.data,
    });
  }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };