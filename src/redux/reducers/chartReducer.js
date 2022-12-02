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

// Get Chart Sales Report
export const chartReducer = (
  state = { dateOrder: [], totalOrder: [] },
  action
) => {
  switch (action.type) {
    case ORDERS_CHART_REQUEST:
      return {
        loading: true,
      };

    case ORDERS_CHART_SUCCESS:
      return {
        loading: false,
        dateOrder: action.payload.dateArray,
        totalOrder: action.payload.totalArray,
        success: action.payload.success,
      };

    case ORDERS_CHART_FAIL:
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

// Get Chart Sales Report
export const chartSalesReducer = (
  state = { dateSales: [], totalSales: [] },
  action
) => {
  switch (action.type) {
    case SALES_CHART_REQUEST:
      return {
        loading: true,
      };

    case SALES_CHART_SUCCESS:
      return {
        loading: false,
        dateSales: action.payload.dateArray,
        totalSales: action.payload.totalArray,
        success: action.payload.success,
      };
    case SALES_CHART_FAIL:
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

// Get Sales per Day Report
export const salePerDayReducer = (
  state = { dateSales: [], totalSales: [] ,salesReport:[]},
  action
) => {
  switch (action.type) {
    case SALES_PER_DAY_REQUEST:
      return {
        loading: true,
      };

    case SALES_PER_DAY_SUCCESS:
      return {
        loading: false,
        dateSales: action.payload.dateArray,
        totalSales: action.payload.totalArray,
        success: action.payload.success,
        salesReport: action.payload.salesReport,
      };
   
    case SALES_PER_DAY_FAIL:
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

// Get orders per Day Report
export const ordersPerDayReducer = (
  state = { dateSales: [], totalSales: [] ,ordersReport:[]},
  action
) => {
  switch (action.type) {
    case ORDER_PER_DAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PER_DAY_SUCCESS:
      return {
        loading: false,
        dateSales: action.payload.dateArray,
        totalSales: action.payload.totalArray,
        success: action.payload.success,
        ordersReport: action.payload.orderReport,
      };
   
    case ORDER_PER_DAY_FAIL:
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
