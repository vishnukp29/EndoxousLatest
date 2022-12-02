import axios from "../../axios";
import {
  ADD_COUPON_FAIL,
  ADD_COUPON_REQUEST,
  ADD_COUPON_SUCCESS,
  ALL_COUPONS_FAIL,
  ALL_COUPONS_REQUEST,
  ALL_COUPONS_SUCCESS,
  DELETE_COUPON_FAIL,
  DELETE_COUPON_REQUEST,
  DELETE_COUPON_SUCCESS,
  CLEAR_ERRORS,
} from "../../constants/couponConstants";

// Add Coupon --Admin
export const addCoupon = (coupon) => async (dispatch) => {
  try {
    dispatch({ type: ADD_COUPON_REQUEST });

    const config = {headers: {"Content-Type": "application/json", },};

    const { data } = await axios.post(`/coupon/new`, coupon, config);

    dispatch({ type: ADD_COUPON_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_COUPON_FAIL,
      payload: error.response.data,
    });
  }
};


// GET All Coupons
export const getAllCoupons = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_COUPONS_REQUEST });

    const { data } = await axios.get(`/coupons`);

    dispatch({ type: ALL_COUPONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_COUPONS_FAIL,
      payload: error.response.data,
    });
  }
};


// Delete Coupon ---Admin
export const deleteCoupon = (id) => async (dispatch) => {
  console.log(id, "=== delete Banner id");
  try {
    dispatch({ type: DELETE_COUPON_REQUEST });

    const { data } = await axios.delete(`/coupons/${id}`);

    dispatch({ type: DELETE_COUPON_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_COUPON_FAIL,
      payload: error.response.data,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
