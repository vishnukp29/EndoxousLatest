import axios from "../../axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  USER_ORDERS_REQUEST,
  USER_ORDERS_SUCCESS,
  USER_ORDERS_FAIL,
  ADD_ORDER_NOTE_REQUEST,
  ADD_ORDER_NOTE_SUCCESS,
  ADD_ORDER_NOTE_FAIL,
  DELETE_ORDER_NOTE_REQUEST,
  DELETE_ORDER_NOTE_SUCCESS,
  DELETE_ORDER_NOTE_FAIL,
  CLEAR_ERRORS,
  CANCEL_ORDER_NOTE_REQUEST,
  CANCEL_ORDER_NOTE_SUCCESS,
  CANCEL_ORDER_NOTE_FAIL,
  ACTIVE_ORDER_NOTE_REQUEST,
  ACTIVE_ORDER_NOTE_SUCCESS,
  ACTIVE_ORDER_NOTE_FAIL,
} from "../../constants/orderConstants";

// CREATE order
export const craeteOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/order/new`, order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data,
    });
  }
};

// My-Orders
export const myOrders = (order) => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get(`/orders/me`);

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data,
    });
  }
};

// Single Order Deatiils
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/admin/order/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

// Get All Orders ---Admin
export const getAllOrders = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`/admin/orders`);

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data,
    });
  }
};

// Update order --Admin
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
   
    const { data } = await axios.put(`/admin/order/${id}`, order);

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data,
    });
  }
};

// Delete order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/admin/order/${id}`);

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data,
    });
  }
};

// Users Order Deatils
export const getUsersOrders = (id) => async (dispatch) => {

  try {
    dispatch({ type: USER_ORDERS_REQUEST });

    const { data } = await axios.get(`/admin/user/orders/${id}`);
    

    dispatch({
      type: USER_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ORDERS_FAIL,
      payload: error.response.data,
    });
  }
};

// Add Note
export const addOrderNote = (message,id) => async (dispatch) => {
  
  try {
    dispatch({ type: ADD_ORDER_NOTE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/admin/note/add/${id}`,message, config);

    dispatch({
      type: ADD_ORDER_NOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ORDER_NOTE_FAIL,
      payload: error.response.data,
    });
  }
};

// Delete order Note
export const deleteOrderNote = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_NOTE_REQUEST });

    const { data } = await axios.delete(`/admin/note/remove/${id}`);

    dispatch({
      type: DELETE_ORDER_NOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_NOTE_FAIL,
      payload: error.response.data,
    });
  }
};

// Order Cancel
export const orderCancel = (id) => async (dispatch) => {
  try {
    dispatch({ type: CANCEL_ORDER_NOTE_REQUEST });

    const { data } = await axios.delete(`/order/${id}`);

    dispatch({
      type: CANCEL_ORDER_NOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CANCEL_ORDER_NOTE_FAIL,
      payload: error.response.data,
    });
  }
};

// Order active
export const orderActive = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACTIVE_ORDER_NOTE_REQUEST });

    const { data } = await axios.put(`/order/${id}`);

    dispatch({
      type: ACTIVE_ORDER_NOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACTIVE_ORDER_NOTE_FAIL,
      payload: error.response.data,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
