import axios from "../../axios";
import {
  ADD_BANNER_REQUEST,
  ADD_BANNER_SUCCESS,
  ADD_BANNER_FAIL,
  ALL_BANNERS_REQUEST,
  ALL_BANNERS_SUCCESS,
  ALL_BANNERS_FAIL,
  CLEAR_ERRORS,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  DELETE_BANNER_RESET,
} from "../../constants/bannerConstants";

// Add banner --Admin
export const addBanner = (banner) => async (dispatch) => {
 
  try {
    dispatch({ type: ADD_BANNER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`/admin/banner/new`, banner, config);

    dispatch({ type: ADD_BANNER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_BANNER_FAIL,
      payload: error.response.data,
    });
  }
};


// GET All banners 
export const getAllBanners = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BANNERS_REQUEST });

    const { data } = await axios.get(`/banners`);

    dispatch({ type: ALL_BANNERS_SUCCESS, payload: data });
    
  } catch (error) {
    dispatch({
      type: ALL_BANNERS_FAIL,
      payload: error.response.data,
    });
  }
};

// Delete Banner ---Admin
export const deleteBanner = (id) => async (dispatch) => {
  console.log(id,"=== delete Banner id");
  try {
    dispatch({ type:   DELETE_BANNER_REQUEST, });

    const { data } = await axios.delete(`/admin/banners/${id}`);

    dispatch({ type: DELETE_BANNER_SUCCESS,
       payload: data,
     
    });
  } catch (error) {
    dispatch({
      type: DELETE_BANNER_RESET,
      payload: error.response.data,
    });
  }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

