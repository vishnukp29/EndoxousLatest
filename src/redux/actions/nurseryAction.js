import axios from "../../axios";
import {
  ADD_NURSERY_REQUEST,
  ADD_NURSERY_SUCCESS,
  ADD_NURSERY_FAIL,
  ALL_NURSERYS_REQUEST,
  ALL_NURSERYS_SUCCESS,
  ALL_NURSERYS_FAIL,
  DELETE_NURSERY_REQUEST,
  DELETE_NURSERY_SUCCESS,
  DELETE_NURSERY_FAIL,
  ASSIGN_TO_NURSERY_REQUEST,
  ASSIGN_TO_NURSERY_SUCCESS,
  ASSIGN_TO_NURSERY_FAIL,
  ASSIGN_TO_NURSERY_RESET,
  CLEAR_ERRORS,
} from "../../constants/nurseryConstants";

// Add Nursery --Admin
export const addBanner = (banner) => async (dispatch) => {
  try {
    dispatch({ type: ADD_NURSERY_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`/admin/banner/new`, banner, config);

    dispatch({ type: ADD_NURSERY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_NURSERY_FAIL,
      payload: error.response.data,
    });
  }
};

// Assing to Nursery
export const assignToNursery = (orderId,name) => async (dispatch) => {
    try {
      dispatch({ type: ADD_NURSERY_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(`/admin/orders/assignToUser/${orderId}`, name, config);
  
      dispatch({ type: ADD_NURSERY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_NURSERY_FAIL,
        payload: error.response.data,
      });
    }
  };

// GET All banners
export const getAllNurseries = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_NURSERYS_REQUEST });

    const { data } = await axios.get(`/nurseries`);

    dispatch({ type: ALL_NURSERYS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_NURSERYS_FAIL,
      payload: error.response.data,
    });
  }
};

// Delete Banner ---Admin
export const deleteBanner = (id) => async (dispatch) => {
  console.log(id, "=== delete Banner id");
  try {
    dispatch({ type: DELETE_NURSERY_REQUEST });

    const { data } = await axios.delete(`/admin/banners/${id}`);

    dispatch({ type: DELETE_NURSERY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_NURSERY_FAIL,
      payload: error.response.data,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
