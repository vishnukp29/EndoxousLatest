import {
    ORDER_TICKETS_REQUEST,
    ORDER_TICKETS_SUCCESS,
    ORDER_TICKETS_FAIL,
    CLEAR_ERRORS,
    ALL_TICKETS_REQUEST,
    ALL_TICKETS_SUCCESS,
    ALL_TICKETS_FAIL,
    OPEN_TICKET_REQUEST,
    OPEN_TICKET_SUCCESS,
    OPEN_TICKET_FAIL,
    OPEN_TICKET_RESET,
    CLOSE_TICKET_REQUEST,
    CLOSE_TICKET_SUCCESS,
    CLOSE_TICKET_FAIL,
    CLOSE_TICKET_RESET,
    REPLAY_TICKET_REQUEST,
    REPLAY_TICKET_SUCCESS,
    REPLAY_TICKET_FAIL,
    REPLAY_TICKET_RESET,
  } from "../../constants/tiketsConstants";

// All Orders --Admin
export const ordersTicketReducer = (state = {tickets:[]}, action) => {
    switch (action.type) {
        case ORDER_TICKETS_REQUEST:
            return {
                loading : true,
            };
        case ORDER_TICKETS_SUCCESS : 
            return {
                loading: false,
                tickets : action.payload,
            };
        case ORDER_TICKETS_FAIL : 
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

// All Tickets --Admin
export const allTicketsReducer = (state = {tickets:[]}, action) => {
    switch (action.type) {
        case ALL_TICKETS_REQUEST:
            return {
                loading : true,
            };
        case ALL_TICKETS_SUCCESS: 
            return {
                loading: false,
                tickets : action.payload,
            };
        case ALL_TICKETS_FAIL : 
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

// Ticket Action --Admin
export const ticketActionsReducer = (state = {}, action) => {
    switch (action.type) {
        case OPEN_TICKET_REQUEST:
        case CLOSE_TICKET_REQUEST:
        case REPLAY_TICKET_REQUEST:
            return {
                ...state,
                loading : true,
            };
        case OPEN_TICKET_SUCCESS : 
            return {
                ...state,
                loading: false,
                isOpen : action.payload.success,
                ticket : action.payload.ticket,
            };
        case CLOSE_TICKET_SUCCESS : 
            return {
                ...state,
                loading: false,
                isClosed : action.payload.success,
                ticket : action.payload.ticket,
            };
        case REPLAY_TICKET_SUCCESS : 
            return {
                ...state,
                loading: false,
                success : action.payload.success,
                ticket : action.payload.ticket,
            };

        case OPEN_TICKET_FAIL : 
        case CLOSE_TICKET_FAIL : 
        case REPLAY_TICKET_FAIL : 
            return {
                ...state,
                loading: false,
                error : action.payload,
            };
        case OPEN_TICKET_RESET : 
            return {
                ...state,
                isOpen : false,
            };
        case CLOSE_TICKET_RESET : 
            return {
                ...state,
                isClosed : false,
            };
        case REPLAY_TICKET_RESET : 
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