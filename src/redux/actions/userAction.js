import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_ERRORS,
  VERIFY_PHONE_REQUEST,
  VERIFY_PHONE_SUCCESS,
  VERIFY_PHONE_FAIL,
  RESEND_PHONE_OTP_REQUEST,
  RESEND_PHONE_OTP_SUCCESS,
  RESEND_PHONE_OTP_FAIL,
  RETURNING_USERS_REQUEST,
  RETURNING_USERS_SUCCESS,
  RETURNING_USERS_FAIL,
} from "../../constants/userConstants";
import axios from "../../axios";
import axiosWithoutToken from "../../axios-without";

// Login
export const login = (phone) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axiosWithoutToken.post(`/login`, { phone }, config);
    if (data && data.phone) {
      await localStorage.setItem("Uphone", JSON.stringify(data.phone));
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data });
  }
};

// Verify OTP
export const verifyOTP = (otp, phone) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_PHONE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axiosWithoutToken.post(
      `/verify/phone`,
      { otp, phone },
      config
    );
    if (data && data.token) {
      await localStorage.setItem("token", JSON.stringify(data.token));
    }

    dispatch({ type: VERIFY_PHONE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VERIFY_PHONE_FAIL, payload: error.response.data });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/register`, userData, { config });

    if (data && data.user) {
      await localStorage.setItem("Udetails", JSON.stringify(data.user));
    }

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await localStorage.removeItem("Udetails");
    await localStorage.removeItem("token");
    const {data} =await axios.get(`/logout`);
    console.log(data&&data);

    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
  }
};

// Get All Users --Admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const { data } = await axios.get(`/admin/users`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data });
  }
};

// Get User Details --Admin
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/admin/user/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data });
  }
};

// Get Returning --Admin
export const getReturningUsers = () => async (dispatch) => {
  try {
    dispatch({ type: RETURNING_USERS_REQUEST });

    const { data } = await axios.get(`/admin/returningusers`);
    console.log(data && data, "data");
    dispatch({ type: RETURNING_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: RETURNING_USERS_FAIL, payload: error.response.data });
  }
};

// Resend Phone OTP
export const resendPhoneOTP = (id) => async (dispatch) => {
  try {
    dispatch({ type: RESEND_PHONE_OTP_REQUEST });

    const { data } = await axios.get(`/resendotp/${id}`);
    dispatch({ type: RESEND_PHONE_OTP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESEND_PHONE_OTP_FAIL,
      payload:
        ((error || {}).response || {}).data ||
        "something went wrong please try again",
      // payload: error.response.data,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
