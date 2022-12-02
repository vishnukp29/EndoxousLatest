import {

    ADD_COUPON_FAIL,
    ADD_COUPON_REQUEST,
    ADD_COUPON_RESET,
    ADD_COUPON_SUCCESS,
    ALL_COUPONS_FAIL,
    ALL_COUPONS_REQUEST,
    ALL_COUPONS_SUCCESS,
    CLEAR_ERRORS,
    DELETE_COUPON_FAIL,
    DELETE_COUPON_REQUEST,
    DELETE_COUPON_RESET,
    DELETE_COUPON_SUCCESS,
  } from "../../constants/couponConstants";
  
  // Add new Coupon
  export const addCouponReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_COUPON_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case ADD_COUPON_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          coupon: action.payload.coupon,
          message :action.payload.message
        };
        case ADD_COUPON_RESET:
        return {
          ...state,
          success:false,
          message:false
        };
  
      case ADD_COUPON_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  // Get All banners
  export const allCouponsReducer = (state = { coupons: [] }, action) => {
    switch (action.type) {
      case ALL_COUPONS_REQUEST:
        return {
          loading: true,
        };
  
      case ALL_COUPONS_SUCCESS:
        return {
          loading: false,
          coupons: action.payload.coupons,
          success: action.payload.success,
  
        };
  
      case ALL_COUPONS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  
  // Delelte Coupon
  export const deleteCouponReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_COUPON_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case DELETE_COUPON_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload.success,
          message: action.payload.message,
        };
      case DELETE_COUPON_RESET:
        return {
          ...state,
          isDeleted: false,
          message: false,
        };
  
      case DELETE_COUPON_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  // // Save Shipping Details
  // export const saveShippingReducer = (state = {}, action) => {
  //   switch (action.type) {
  //     case ADD_SHIPPING_REQUEST:
  //       return {
  //         ...state,
  //         loading: true,
  //       };
  
  //     case ADD_SHIPPING_SUCCESS:
  //       return {
  //         loading: false,
  //         shippingInfo: action.payload,
  //       };
  
  //     case ADD_SHIPPING_FAIL:
  //       return {
  //         loading: false,
  //         error: action.payload,
  //       };
  //     case CLEAR_ERRORS:
  //       return {
  //         ...state,
  //         error: null,
  //       };
  
  //     default:
  //       return state;
  //   }
  // };
  
  // // Get Shipping Info
  // export const shippingDetails = (state = { shippingInfo: [] }, action) => {
  //   switch (action.type) {
  //     case GET_SHIPPING_REQUEST:
  //       return {
  //         loading: true,
  //       };
  
  //     case GET_SHIPPING_SUCCESS:
  //       return {
  //         loading: false,
  //         shippingInfo: action.payload,
  //       };
  
  //     case GET_SHIPPING_FAIL:
  //       return {
  //         loading: false,
  //         error: action.payload,
  //       };
  //     case CLEAR_ERRORS:
  //       return {
  //         ...state,
  //         error: null,
  //       };
  
  //     default:
  //       return state;
  //   }
  // };