import React, { Fragment, useEffect, useState } from "react";
import "./Page3.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  addOrderNote,
  clearErrors,
  deleteOrderNote,
  getOrderDetails,
  orderActive,
  orderCancel,
  updateOrder,
} from "../../redux/actions/orderAction";
import { toast } from "react-toastify";
import DateFormatter from "../../utils/DateFormatter";
import { closeTicket, getOrderTickets, openTicket, replyTicket } from "../../redux/actions/ticketsAction";
import { ACTIVE_ORDER_NOTE_RESET, ADD_ORDER_NOTE_RESET, CANCEL_ORDER_NOTE_RESET, DELETE_ORDER_NOTE_RESET, UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import { CLOSE_TICKET_RESET, OPEN_TICKET_RESET, REPLAY_TICKET_RESET } from "../../constants/tiketsConstants";
import Loader from "../../Components/SideBar/Loader/Loader";

function AllOrdersPage3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [reply, setReply] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [open, setOpen] = useState(false);

  const { error, loading, order } = useSelector((state) => state.orderDetails);
  const { error:addNoteError, loading:addNoteLoading, success,message:addNoteMessage } = useSelector((state) => state.addNote);
  const { error:deleteNoteError, loading:deleteNoteLoading, isDeleted,message:deleteNoteMessage } = useSelector((state) => state.deleteorderNote);
  const { error:actionError, loading:actionLoading,success:actionSuccess ,isOpen ,isClosed} = useSelector((state) => state.ticketActions);
  const { error:orderError, loading:orderLoading,isCancelled,message:orderMessage,isActived} = useSelector((state) => state.order);

  const { error: ticketsError, tickets } = useSelector(
    (state) => state.ordersTicket
  );
  const {
    error: updateError,
    isUpdated,
    message,
  } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (ticketsError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (addNoteError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (orderError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (deleteNoteError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success(message);
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    if (success) {
      toast.success(addNoteMessage);
      dispatch({ type: ADD_ORDER_NOTE_RESET });
    }
    if (isDeleted) {
      toast.success(deleteNoteMessage);
      dispatch({ type: DELETE_ORDER_NOTE_RESET });
    }
    if (actionSuccess) {
      toast.success("Reply Added...");
      dispatch({ type: REPLAY_TICKET_RESET });
    }
    if (isOpen) {
      toast.success("Opened...");
      dispatch({ type: OPEN_TICKET_RESET });
    }
    if (isClosed) {
      dispatch({ type: CLOSE_TICKET_RESET });
    }
    if (isCancelled) {
      toast.success(orderMessage);
      dispatch({ type: CANCEL_ORDER_NOTE_RESET });
    }
    if (isActived) {
      toast.success(orderMessage);
      dispatch({ type: ACTIVE_ORDER_NOTE_RESET });
    }

    dispatch(getOrderDetails(id));
    dispatch(getOrderTickets(id));
  }, [id, dispatch,isActived,isCancelled,orderMessage,orderError, error, ticketsError, isUpdated,actionSuccess,isClosed, updateError,isOpen, message,addNoteError,addNoteMessage,success,deleteNoteError,isDeleted,deleteNoteMessage]);

  const ticketCloseHandler = async(id) => {
    setOpen(true)
    if (id) {
      await localStorage.setItem("UTicketID", JSON.stringify(id));
    }
 
  };

  const OrderSatusHandler = (id, status) => {
    dispatch(updateOrder(id, status));
  };

  const ticketSubmitHandler = async(e) =>{
    const ticketID =await JSON.parse(localStorage.getItem("UTicketID"));
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("reply", reply);
    dispatch(replyTicket(ticketID,myForm));
    dispatch(closeTicket(ticketID))

  }

  const ticketOpenHandler = (id)=>{
    
    dispatch(closeTicket(id))

  }
  

  const noteSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("note", note);
    dispatch(addOrderNote(myForm, order._id));
  };

  const deleteNoteHandler = ()=>{
    dispatch(deleteOrderNote(order._id))
  }

  const orderCancelHandler=(OrderId) =>{
    dispatch(orderCancel(OrderId));
  }
  const orderActiveHandler=(OrderId) =>{
    dispatch(orderActive(OrderId));
  }
  // console.log(order.createdAt)

  return (
    <Fragment>
      {loading||addNoteLoading||deleteNoteLoading||actionLoading||orderLoading ? (
        <Fragment>
          <Loader/>
          </Fragment>

      ) : (
        <div className="p3-body">
      <div className="mainsection">
        
        <div className="section2">
          <nav
            className="s2-navabar navbar navbar-expand-lg "
            style={{ backgroundColor: "white" }}
          >
            <div className="container-fluid px-5">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo03"
                aria-controls="navbarTogglerDemo03"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <NavLink className="fw-bold navbar-brand " to="/">
                All Orders
              </NavLink>
              <button
                className="btn btn-outline-success btnround"
                type="submit"
              ></button>
            </div>
            <hr />
          </nav>
          <div className="d-flex justify-content-around">
            <div>
              <div className="p3-order-block p-5 ">
                <h6 className="fw-bold">Order ID #{order && order._id}</h6>
                <div className="d-flex justify-content-between">
                  <h6>
                    <DateFormatter date={order?.createdAt} />
                    {/* {console.log(order.createdAt.slice(11,16))} */}
                  </h6>
                  {/* <h6>{order.createdAt.slice(11,16)}</h6> */}
                  <div>
                    <input
                      className="form-check-input s2-radio"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      value="Pending"
                      aria-label="..."
                      style={{
                        backgroundColor:
                          order?.orderStatus === "Shipped"
                            ? "lightgreen"
                            : order?.orderStatus === "Cancelled"
                            ? "red"
                            : order?.orderStatus === "Delivered"
                            ? "green"
                            : "orange",
                      }}
                    />{" "}
                    {order?.orderStatus}
                  </div>
                </div>
                <div>
                  <p>DELIVERING NURSERY</p>
                  <p>
                    {order?.deliveredBy
                      ? order?.deliveredBy
                      : "Name of the nursery"}
                  </p>
                  <p>Complete Address goes here with area, pincode</p>
                </div>
                <hr />
                {order &&
                  order?.orderItems &&
                  order?.orderItems.map((item, index) => (
                    <Fragment>
                      <p>{index + 1} ITEM</p>
                      <div className="d-flex ">
                        <div className="p3-order-item-block mx-4"> 
                          <img src={item.image} alt="IMG" className="w-100 h-100"/>
                        </div>
                        <div>
                          <p>{item.name}</p>
                          <p>Per Price</p>
                          <div className="d-flex justify-content-between">
                            <button className="btn bg-info">
                              {item.quantity}
                            </button>{" "}
                            x {item?.price} =
                            <div>{item.quantity * item?.price}/-</div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                <hr />
                <div className="d-flex  justify-content-between">
                  <div>item Total</div>
                  <div>{order?.itemPrice}/-</div>
                </div>
                <div className="d-flex  justify-content-between">
                  <div>Delivery</div>
                  <div>
                    {order?.shippingPrice === 0 ? "FREE" : order?.shippingPrice}
                  </div>
                </div>
                <div className="d-flex  justify-content-between">
                  <div>GRAND TOTAL</div>
                  <div>{order?.totalPrice}/-</div>
                </div>
              </div>
              <div className="p3-order-block">
                <div className="d-flex justify-content-between px-3">
                  <h6>Customer Detailes</h6>
                  <NavLink to="/">Edit</NavLink>
                </div>
                <hr />
                <div className="d-flex justify-content-between px-5 my-2">
                  <div>
                    <label>Name</label> <br />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={order?.user?.name ? order?.user?.name : " Name"}
                      readOnly
                    />
                  </div>
                  <div>
                    <label>Number</label> <br />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={
                        order?.user?.phone
                          ? order?.user?.phone
                          : " Phone Number"
                      }
                      readOnly
                    />
                  </div>
                </div>
                <div className="px-5 my-2">
                  <label>Email Id</label> <br />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={
                      order?.user?.email?.slice(0, 17) === "example@gmail.com"
                        ? "Email"
                        : order?.user?.email
                    }
                    readOnly
                  />
                </div>
                <div className="px-5 my-2">
                  <label>Address</label> <br />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={
                      order?.user?.shippingInfo?.address
                        ? order?.user?.shippingInfo?.address
                        : "Address"
                    }
                    readOnly
                  />
                </div>
                <div className="d-flex justify-content-between px-5 my-2">
                  <div>
                    <label>Area/Locality</label> <br />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={
                        order?.user?.shippingInfo?.area
                          ? order?.user?.shippingInfo?.area
                          : "Area/Locality"
                      }
                      readOnly
                    />
                  </div>
                  <div>
                    <label>Landmark</label> <br />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={
                        order?.user?.shippingInfo?.landMark
                          ? order?.user?.shippingInfo?.landMark
                          : "Landmark"
                      }
                      readOnly
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between px-5 my-2">
                  <div>
                    <label>City</label> <br />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={
                        order?.user?.shippingInfo?.city
                          ? order?.user?.shippingInfo?.city
                          : "City"
                      }
                      readOnly
                    />
                  </div>
                  <div>
                    <label>Pincode</label> <br />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={
                        order?.user?.shippingInfo?.pincode
                          ? order?.user?.shippingInfo?.pincode
                          : "Pincode"
                      }
                      readOnly
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between px-5 my-2">
                  <div>
                    <label>State</label> <br />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={
                        order?.user?.shippingInfo?.state
                          ? order?.user?.shippingInfo?.state
                          : "State"
                      }
                      readOnly
                    />
                  </div>
                  <div>
                    <label>Payment Method</label> <br />
                    <input
                      type="text"
                      placeholder="Cash on delivery"
                      value={
                        order?.paymentInfo?.method
                          ? order?.paymentInfo?.method
                          : "Payment Method"
                      }
                      readOnly
                    />
                    <button className="btn">
                      {order?.paymentInfo?.method === "online"
                        ? "online Payment"
                        : "COD"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p3-notes">
                <p> Notes</p>
               {order?.note?.message ? (
               
               <Fragment> 
                <p className="w-100">{order?.note?.message} <span> <button className="w-25" onClick={deleteNoteHandler}>Delete</button></span></p>
                
                </Fragment>
               ) : (
                <Fragment>
                   <form action="" onSubmit={noteSubmitHandler}>
                <textarea class="form-control" type="text" placeholder="Add your Note" onChange={(e)=> setNote(e.target.value)}/>
                <button type="submit" class="btn btn-outline-secondary w-25 mx-1">Send</button>
                </form>
                </Fragment>
               )}
                
              
              </div>
              <div className="p3-activity-bg">
                ACTIVITY
                <div>
                  <div>
                    <input
                      className="form-check-input bg-success"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      value="Pending"
                      aria-label="..."
                    />{" "}
                    Order Placed
                    <p>
                      <DateFormatter date={order?.createdAt} />{" "} 
                      {/* <h6>{order.createdAt.slice(11,16)}</h6> */}
                    </p>
                    
                  </div>
                  <div>
                    <input
                      className="form-check-input bg-success"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      value="Pending"
                      aria-label="..."
                    />{" "}
                    Assigned to
                    <p>
                      {order?.shippedAt ? (
                        <Fragment>
                           <DateFormatter date={order?.shippedAt} />
                        </Fragment>
                      ) : (
                        <Fragment>
                          <h6>Not Accepted</h6>
                        </Fragment>
                      )}
                     
                    </p>
                  </div>
                  <div>
                    <input
                      className="form-check-input bg-success"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      value="Pending"
                      aria-label="..."
                    />{" "}
                    Order Shipped
                    <p>
                      
                      {order?.shippedAt ? (
                        <Fragment>
                           <DateFormatter date={order?.shippedAt} />
                        </Fragment>
                      ) : (
                        <Fragment>
                          <h6>Not Shipped</h6>
                        </Fragment>
                      )}
                    </p>
                  </div>
                  <div>
                    <input
                      className="form-check-input bg-success"
                      type="radio"
                      name="radioNoLabel"
                      id="radioNoLabel1"
                      value="Pending"
                      aria-label="..."
                    />{" "}
                    Order Delivered
                    <p>
                    {order?.deliverdAt ? (
                        <Fragment>
                           <DateFormatter date={order?.deliverdAt} />
                        </Fragment>
                      ) : (
                        <Fragment>
                          <h6>Not Delevered</h6>
                        </Fragment>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              {tickets &&
                tickets.map((ticket, index) => (
                  <div className="p3-notes">
                    <h5> CUSTOMER HELP</h5>
                    <div className="p3-notes-bg">
                      <p6>{ticket?.ticket}</p6>
                      
                      <hr className="p3-customer-hr-dotted" />
                      <p6>{ticket?.reply}</p6><br/>
                      <p6 className="h6 text-right">
                        {/* - Raised at 05:00 PM, 23rd Aug 2022 */}
                        <DateFormatter date={ticket.createdAt} />
                      </p6>
                    </div>
                    {ticket?.ticketClossed?.status === true ? (
                      <Fragment>
                           <h4>Closed On <DateFormatter date={ticket?.ticketClossed?.date} /></h4>
                      </Fragment>
                    ) : (
                      <Fragment>
                        {ticket?.isOpend?.status === true ? (
                      <Fragment>
                        {open === true ? (
                      <Fragment>
                      <form action="" onSubmit={ticketSubmitHandler}>
                      <textarea class="form-control" type="text" placeholder="Add Reply" onChange={(e)=> setReply(e.target.value)}/>
                       <button type="submit" class="btn btn-outline-secondary w-25 mx-1">Send</button>
                      </form>

                      </Fragment>
                    ) : (
                      <Fragment>
                        <button
                      className="btn  bg-info"
                      onClick={() => ticketCloseHandler(ticket._id)}
                    >
                      close ticket
                    </button>

                      </Fragment>
                    )}

                      </Fragment>
                    ) : (
                      <Fragment>
                         <button
                      className="btn  bg-info"
                      type="button"
                      onClick={() => ticketOpenHandler(ticket._id)}
                    >
                      Open ticket
                    </button>

                      </Fragment>
                    ) }
                       
                      </Fragment>

                    )} 

                    


                    
                   
                  </div>
                ))}
              {/* <div className="p3-notes">
                <h5> CUSTOMER HELP</h5>
                <div className="p3-notes-bg">
                  <p6>I did not recieve my order</p6>
                  <hr className="p3-customer-hr-dotted" />
                  <p6 className="h6 text-right">
                    - Raised at 05:00 PM, 23rd Aug 2022
                  </p6>
                </div>
                <button className="btn  bg-info">close ticket</button>
              </div> */}
            </div>
          </div>
          <footer
            className="navbar navbar-expand-lg p-2 m-5 text-right "
            style={{ backgroundColor: "white" }}
          >
            <div className="container-fluid px-5 d-flex align-items-end">
              {order && order.orderStatus === "Delivered" ? (
                <h4>
                  <DateFormatter date={order && order?.deliverdAt} /> - Order
                  Delivered{" "}
                </h4>
              ) : (
                <Fragment>
                  {order && order?.orderStatus === "Cancelled" ? (
                    ""
                  ) : (
                    <Fragment>
                      {order && order?.orderStatus === "Shipped" ? (
                        <button
                          className="btn btn-outline bg-warning "
                          type="submit"
                          onClick={() =>
                            OrderSatusHandler(order && order._id, {
                              status: "Delivered",
                            })
                          }
                        >
                          Delivered
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline bg-warning "
                          type="submit"
                          onClick={() =>
                            OrderSatusHandler(order && order._id, {
                              status: "Shipped",
                            })
                          }
                        >
                          Ship Order
                        </button>
                      )}

                    </Fragment>
                  )}
                </Fragment>
              )}
              {order?.shippedAt ? ("") : (
                <Fragment>
                  
                  {order?.orderStatus === "Cancelled" ? (
                    <Fragment>
                      <button className="btn btn-outline bg-success text-white " onClick={()=>orderActiveHandler(order._id)}>Active Order</button>
                    </Fragment>
                  ) : (
                      <Fragment>
                        <button className="btn btn-outline bg-danger text-white" onClick={()=>orderCancelHandler(order._id)}>Cancel Order</button>
                      </Fragment>
                  )}

                </Fragment>
              ) }
              
            </div>
          </footer>
        </div>
      </div>
    </div>
      )}
    </Fragment>
  );
}

export default AllOrdersPage3;
