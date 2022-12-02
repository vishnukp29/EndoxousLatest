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
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_FAIL,
    CLEAR_ERRORS,
    USER_ORDERS_REQUEST,
    USER_ORDERS_SUCCESS,
    USER_ORDERS_FAIL,
    ADD_ORDER_NOTE_REQUEST,
    ADD_ORDER_NOTE_SUCCESS,
    ADD_ORDER_NOTE_FAIL,
    ADD_ORDER_NOTE_RESET,
    DELETE_ORDER_NOTE_REQUEST,
    DELETE_ORDER_NOTE_SUCCESS,
    DELETE_ORDER_NOTE_FAIL,
    DELETE_ORDER_NOTE_RESET,
    CANCEL_ORDER_NOTE_REQUEST,
    CANCEL_ORDER_NOTE_SUCCESS,
    CANCEL_ORDER_NOTE_FAIL,
    CANCEL_ORDER_NOTE_RESET,
    ACTIVE_ORDER_NOTE_REQUEST,
    ACTIVE_ORDER_NOTE_SUCCESS,
    ACTIVE_ORDER_NOTE_FAIL,
    ACTIVE_ORDER_NOTE_RESET,
  } from "../../constants/orderConstants";
  
  
  export const newOrderReducer = (state = {}, action) => {
      switch (action.type) {
          case CREATE_ORDER_REQUEST:
              return {
                  ...state,
                  loading : true,
              };
          case CREATE_ORDER_SUCCESS : 
              return {
                  loading: false,
                  order : action.payload,
              };
          case CREATE_ORDER_FAIL : 
              return {
                  loading: false,
                  error : action.payload,
              };
          case CLEAR_ERRORS : 
              return {
                  ...state,
                  error : null,
              };
          default:
             return state;
      }
  
  };
  
  // MY Orders
  export const myOrdersReducer = (state = {orders:[]}, action) => {
      switch (action.type) {
          case MY_ORDERS_REQUEST:
              return {
                  loading : true,
              };
          case MY_ORDERS_SUCCESS : 
              return {
                  loading: false,
                  orders : action.payload,
              };
          case MY_ORDERS_FAIL : 
              return {
                  loading: false,
                  error : action.payload,
              };
          case CLEAR_ERRORS : 
              return {
                  ...state,
                  error : null,
              };
          default:
             return state;
      }
  
  };
  
  // All Orders --Admin
  export const allOrdersReducer = (state = {orders:[]}, action) => {
      switch (action.type) {
          case ALL_ORDERS_REQUEST:
              return {
                  loading : true,
              };
          case ALL_ORDERS_SUCCESS : 
              return {
                  loading: false,
                  orders : action.payload,
              };
          case ALL_ORDERS_FAIL : 
              return {
                  loading: false,
                  error : action.payload,
              };
          case CLEAR_ERRORS : 
              return {
                  ...state,
                  error : null,
              };
          default:
             return state;
      }
  
  };
  
  
  // Orders Reducer update and Delete --Admin
  export const orderReducer = (state = {}, action) => {
      switch (action.type) {
          case UPDATE_ORDER_REQUEST:
          case DELETE_ORDER_REQUEST:
          case CANCEL_ORDER_NOTE_REQUEST:
          case ACTIVE_ORDER_NOTE_REQUEST:
              return {
                  ...state,
                  loading : true,
              };
          case UPDATE_ORDER_SUCCESS : 
              return {
                  ...state,
                  loading: false,
                  isUpdated : action.payload.success,
                  message:action.payload.message
              };
          case DELETE_ORDER_SUCCESS : 
              return {
                  ...state,
                  loading: false,
                  isDeleted : action.payload,
              };
          case CANCEL_ORDER_NOTE_SUCCESS : 
              return {
                  ...state,
                  loading: false,
                  isCancelled : action.payload.success,
                  message : action.payload.message,
              };
          case ACTIVE_ORDER_NOTE_SUCCESS : 
              return {
                  ...state,
                  loading: false,
                  isActived : action.payload.success,
                  message : action.payload.message,
              };
  
          case UPDATE_ORDER_FAIL : 
          case DELETE_ORDER_FAIL : 
          case CANCEL_ORDER_NOTE_FAIL : 
          case ACTIVE_ORDER_NOTE_FAIL : 
              return {
                  ...state,
                  loading: false,
                  error : action.payload,
              };
          case UPDATE_ORDER_RESET : 
              return {
                  ...state,
                  isUpdated : false,
              };
          case DELETE_ORDER_RESET : 
              return {
                  ...state,
                  isDeleted : false,
              };
          case CANCEL_ORDER_NOTE_RESET : 
              return {
                  ...state,
                  isCancelled : false,
                  message:false,
              };
          case ACTIVE_ORDER_NOTE_RESET : 
              return {
                  ...state,
                  isActived : false,
                  message:false,
              };
          case CLEAR_ERRORS : 
              return {
                  ...state,
                  error : null,
              };
          default:
             return state;
      }
  
  };
  
  
  // Single Order
  export const orderDetailsReducer = (state = {order:{}}, action) => {
      switch (action.type) {
          case ORDER_DETAILS_REQUEST:
              return {
                  loading : true,
              };
          case ORDER_DETAILS_SUCCESS : 
              return {
                  loading: false,
                  order : action.payload,
              };
          case ORDER_DETAILS_FAIL : 
              return {
                  loading: false,
                  error : action.payload,
              };
          case CLEAR_ERRORS : 
              return {
                  ...state,
                  error : null,
              };
          default:
             return state;
      }
  
  };
  
  
  // User's Orders --Admin
  export const usersOrdersReducer = (state = {orders:[]}, action) => {
      switch (action.type) {
          case USER_ORDERS_REQUEST:
              return {
                  loading : true,
              };
          case USER_ORDERS_SUCCESS : 
              return {
                  loading: false,
                  orders : action.payload.orders,
                  count : action.payload.ordersCount,
              };
          case USER_ORDERS_FAIL : 
              return {
                  loading: false,
                  error : action.payload,
              };
          case CLEAR_ERRORS : 
              return {
                  ...state,
                  error : null,
              };
          default:
             return state;
      }
  
  };
  
  // Add note --Admin
  export const addNoteReducer = (state = {}, action) => {
      switch (action.type) {
          case ADD_ORDER_NOTE_REQUEST:
              return {
                  ...state,
                  loading : true,
              };
          case ADD_ORDER_NOTE_SUCCESS : 
              return {
                  ...state,
                  loading: false,
                  success:action.payload.success,
                  message:action.payload.message
              };
          case ADD_ORDER_NOTE_FAIL : 
              return {
                  ...state,
                  loading: false,
                  error : action.payload,
              };
          case ADD_ORDER_NOTE_RESET : 
              return {
                  ...state,
                  success : false,
              };
          case CLEAR_ERRORS : 
              return {
                  ...state,
                  error : null,
              };
          default:
             return state;
      }
  
  };
   
  // Delete Order Note
  export const deleteorderNoteReducer = (state = {}, action) => {
      switch (action.type) {
          case DELETE_ORDER_NOTE_REQUEST:
              return {
                  ...state,
                  loading : true,
              };
         
          case DELETE_ORDER_NOTE_SUCCESS : 
              return {
                  ...state,
                  loading: false,
                  isDeleted : action.payload.success,
                  message : action.payload.message,
              };
  
          case DELETE_ORDER_NOTE_FAIL : 
              return {
                  ...state,
                  loading: false,
                  error : action.payload,
              };
          case DELETE_ORDER_NOTE_RESET : 
              return {
                  ...state,
                  isDeleted : false,
                  message : false,
              };
          case CLEAR_ERRORS : 
              return {
                  ...state,
                  error : null,
              };
          default:
             return state;
      }
  
  };