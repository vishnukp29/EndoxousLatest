import {
  ADD_BANNER_REQUEST,
  ADD_BANNER_SUCCESS,
  ADD_BANNER_FAIL,
  ADD_BANNER_RESET,
  ALL_BANNERS_REQUEST,
  ALL_BANNERS_SUCCESS,
  ALL_BANNERS_FAIL,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  DELETE_BANNER_FAIL,
  DELETE_BANNER_RESET,
  CLEAR_ERRORS,
} from "../../constants/bannerConstants";

// Add new Banner
export const addBannerReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_BANNER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        banner: action.payload.banner,
        message :action.payload.message
      };
      case ADD_BANNER_RESET:
      return {
        ...state,
        success:false,
        message:false
      };

    case ADD_BANNER_FAIL:
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
export const allBannersReducer = (state = { banners: [] }, action) => {
  switch (action.type) {
    case ALL_BANNERS_REQUEST:
      return {
        loading: true,
      };

    case ALL_BANNERS_SUCCESS:
      return {
        loading: false,
        banners: action.payload.banners,
        success: action.payload.success,

      };

    case ALL_BANNERS_FAIL:
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


// Remove cart item
export const deleteBannerReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };
    case DELETE_BANNER_RESET:
      return {
        ...state,
        isDeleted: false,
        message: false,
      };

    case DELETE_BANNER_FAIL:
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