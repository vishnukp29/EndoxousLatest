import {
    ORDER_TICKETS_REQUEST,
    ORDER_TICKETS_SUCCESS,
    ORDER_TICKETS_FAIL,
    ALL_TICKETS_REQUEST,
    ALL_TICKETS_SUCCESS,
    ALL_TICKETS_FAIL,
    CLEAR_ERRORS,
    OPEN_TICKET_REQUEST,
    OPEN_TICKET_SUCCESS,
    OPEN_TICKET_FAIL,
    CLOSE_TICKET_REQUEST,
    CLOSE_TICKET_SUCCESS,
    CLOSE_TICKET_FAIL,
    REPLAY_TICKET_REQUEST,
    REPLAY_TICKET_SUCCESS,
    REPLAY_TICKET_FAIL,
  } from "../../constants/tiketsConstants";

  import axios from "../../axios";

// Order Tickets
export const getOrderTickets = (orderId) =>async (dispatch) => {
    try {
        dispatch({type : ORDER_TICKETS_REQUEST});


        const {data} = await axios.get(`/tickets/order/${orderId}`);
      

        dispatch({
            type : ORDER_TICKETS_SUCCESS,
            payload : data.orderTickets,
        });
        
    } catch (error) {
        dispatch({
            type : ORDER_TICKETS_FAIL,
            payload : error.response.data,
        })
        
    }

  };

  // Get All Tickets ---Admin
export const getAllTickets = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_TICKETS_REQUEST });
  
      const { data } = await axios.get(`/tickets`);
  
      dispatch({
        type: ALL_TICKETS_SUCCESS,
        payload: data.tickets,
      });
    } catch (error) {
      dispatch({
        type: ALL_TICKETS_FAIL,
        payload: error.response.data,
      });
    }
  };

  // open Ticket --Admin
export const openTicket = (id, order) => async (dispatch) => {
    try {
      dispatch({ type: OPEN_TICKET_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
     
      const { data } = await axios.put(`/tickets/open/${id}`);
  
      dispatch({
        type: OPEN_TICKET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: OPEN_TICKET_FAIL,
        payload: error.response.data,
      });
    }
  };


  // close order --Admin
export const closeTicket = (id, order) => async (dispatch) => {
    try {
      dispatch({ type: CLOSE_TICKET_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
     
      const { data } = await axios.put(`/tickets/close/${id}`);
  
      dispatch({
        type: CLOSE_TICKET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CLOSE_TICKET_FAIL,
        payload: error.response.data,
      });
    }
  };

  // Reply order --Admin
export const replyTicket = (id, reply) => async (dispatch) => {
    try {
      dispatch({ type: REPLAY_TICKET_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
     
      const { data } = await axios.post(`/tickets/reply/${id}`, reply,config);
  
      dispatch({
        type: REPLAY_TICKET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REPLAY_TICKET_FAIL,
        payload: error.response.data,
      });
    }
  };
  
  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };