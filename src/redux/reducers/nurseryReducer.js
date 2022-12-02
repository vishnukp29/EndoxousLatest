import {
  ADD_NURSERY_REQUEST,
  ADD_NURSERY_SUCCESS,
  ADD_NURSERY_FAIL,
  ALL_NURSERYS_REQUEST,
  ALL_NURSERYS_SUCCESS,
  ALL_NURSERYS_FAIL,
  ASSIGN_TO_NURSERY_REQUEST,
  ASSIGN_TO_NURSERY_SUCCESS,
  ASSIGN_TO_NURSERY_FAIL,
  ASSIGN_TO_NURSERY_RESET,
  DELETE_NURSERY_REQUEST,
  DELETE_NURSERY_SUCCESS,
  DELETE_NURSERY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_RESET,
  UPDATE_CATEGORY_FAIL,
  ADD_NURSERY_RESET,
  DELETE_NURSERY_RESET,
  CLEAR_ERRORS,

} from "../../constants/nurseryConstants";


// Create New Products
export const newCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NURSERY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_NURSERY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case ADD_NURSERY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_NURSERY_RESET:
      return {
        ...state,
        success: false,
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

// Assing to Nursery
export const AssingtoNurseryReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSIGN_TO_NURSERY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ASSIGN_TO_NURSERY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case ASSIGN_TO_NURSERY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ASSIGN_TO_NURSERY_RESET:
      return {
        ...state,
        success: false,
        message:false
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

// All Nurseries --Admin
export const allNurseriesReducer = (state = { nurseries: [] }, action) => {
  switch (action.type) {
    case ALL_NURSERYS_REQUEST:
      return {
        loading: true,
      };
    case ALL_NURSERYS_SUCCESS:
      return {
        loading: false,
        nurseries: action.payload.nurseries,
      };
    case ALL_NURSERYS_FAIL:
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

// // Single Category
// export const categoryDetailsReducer = (state = {category:{}}, action) => {
//     switch (action.type) {
//         case GET_CATEGORY_REQUEST:
//             return {
//                 loading : true,
//             };
//         case GET_CATEGORY_SUCCESS :
//             return {
//                 loading: false,
//                 category : action.payload,
//             };
//         case GET_CATEGORY_FAIL :
//             return {
//                 loading: false,
//                 error : action.payload,
//             };
//         case CLEAR_ERRORS :
//             return {
//                 ...state,
//                 error : null,
//             };
//         default:
//            return state;
//     }

// };

// // Orders Reducer update and Delete --Admin
// export const categoryReducer = (state = {}, action) => {
//   switch (action.type) {
//     case UPDATE_CATEGORY_REQUEST:
//     case DELETE_NURSERY_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case UPDATE_CATEGORY_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload.success,
//         message: action.payload.message,
//       };
//     case DELETE_NURSERY_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isDeleted: action.payload.success,
//         message: action.payload.message,
//       };

//     case UPDATE_CATEGORY_FAIL:
//     case DELETE_NURSERY_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     case UPDATE_CATEGORY_RESET:
//       return {
//         ...state,
//         isUpdated: false,
//         message: null,
//       };
//     case DELETE_NURSERY_RESET:
//       return {
//         ...state,
//         isDeleted: false,
//         message: null,
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
