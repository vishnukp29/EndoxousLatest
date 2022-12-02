import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OPEN_TICKET_RESET } from "../../constants/tiketsConstants";
import { clearErrors } from "../../redux/actions/orderAction";
import { getAllTickets, openTicket } from "../../redux/actions/ticketsAction";
import Loader from "../../Components/SideBar/Loader/Loader";
 
const CustomerSupport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterTickets, setFilterTickets] = useState([]);
  const [state, setState] = useState(false);

  const { error, loading, tickets } = useSelector((state) => state.allTickets);
  const { error:actionError,isOpen  } = useSelector((state) => state.ticketActions); 



  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (actionError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    if(tickets){
      setFilterTickets(tickets)
    }
    
    if(isOpen){
      toast.success('Opened')
      
      dispatch({type:OPEN_TICKET_RESET})
    }
    
    dispatch(getAllTickets());
  }, [dispatch,error,setFilterTickets,isOpen,actionError]);

  const clossedTickets = tickets&&tickets.filter((ticket)=>ticket.ticketClossed?.status === true );
  const newTickets = tickets&&tickets.filter((ticket)=> !ticket.ticketClossed?.status === true && !ticket.isOpend?.status === true);
  const allTickets = tickets&&tickets.filter((ticket)=> ticket);



  const showAll = () =>{
    setFilterTickets(allTickets)
    setState(true)
  }

  const showNew= () =>{
    setFilterTickets(newTickets)
    setState(true)
   
  }

  const showClossed= () =>{
    setFilterTickets(clossedTickets);
    setState(true)
  }

  const openTicketHandler = (id,open,orderId)=>{
    if(open?.status === false){
       dispatch(openTicket(id))
    }else if(open?.status === true) {
      navigate(`/orders/${orderId}`)
    }
    
  }




  return (
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

          <NavLink className="fw-bold navbar-brand" to="/">
            Customer Support
          </NavLink>
          <button
            className="btn btn-outline-success btnround"
            type="submit"
          ></button>
        </div>
        <hr />
      </nav>

      <div className="d-flex">
        <div className="d-flex flex-wrap px-4" style={{ width: "60%" }}>
          <div className="section2-btn">
            <button className="s2-btn fs-6" style={{ padding: "0 .7rem" }} onClick={() => showAll()} autoFocus>
              All
            </button>
            <button className="s2-btn fs-6" style={{ padding: "0 .7rem" }} onClick={() => showNew()}>
              New tickets
            </button>
            <button className="s2-btn fs-6" style={{ padding: "0 .7rem" }} onClick={() => showClossed()}>
              Closed tickets
            </button>
          </div>

          {loading ? (
            <Loader/>
          ): (
            <div className="container d-flex flex-wrap">
           {state === false ? (
            <Fragment>
              {tickets&&tickets.map((ticket,key)=>(
            <Fragment>
               <div className="card m-2" style={{ width: "46%" }} key={key}>
              <div className="row g-0 d-flex justify-content-center">
                <div
                  className="col-md-4"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="cardBox"
                    style={{
                      backgroundColor: "#ececec",
                      borderRadius: ".5rem",
                      width: "70px",
                      height: "70px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={ticket.orderID?.orderItems[0]?.image}
                      className="img-fluid rounded-start"
                      alt="img"
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title text-capitalize">#{ticket.orderID?._id}</h5>
                    <p className="card-text">
                      <small className="text-muted text-capitalize">
                        per piece
                      </small>
                    </p>
                    <span className="card-text fs-5">Rs {ticket.orderID?.totalPrice}</span>

                    <span
                      className="form-check form-switch d-inline me-2"
                      style={{ position: "absolute", right: "0" }}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        
                      />
                    </span>
                  </div>
                </div>
                <hr style={{ width: "95%" }} />
                <div className="d-flex p-2 justify-content-between align-items-center">
                 
                  {ticket?.ticketClossed?.status === true ? (
                     <Fragment>

                     <h5>Closed</h5>
                  </Fragment>
                  ) : (
                    <Fragment>
                      {ticket?.isOpend?.status === true ? (
                         <Fragment>
                         <h5>Opened</h5>
                       </Fragment>

                      ) : (
                        <Fragment>
                        <h5>New</h5>
                       </Fragment>

                      )}

                    </Fragment>
                  )}

                  {ticket?.isOpend?.status === true ? (
                    <Fragment>
                      <button
                    type="button"
                    className="btn bg-success btn-success btn-md"
                    onClick={()=> openTicketHandler(ticket._id,{status:ticket?.isOpend?.status},ticket.orderID?._id)}
                  >
                    Details
                  </button>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <button
                    type="button"
                    className="btn bg-success btn-success btn-md"
                    onClick={()=> openTicketHandler(ticket._id,{status:ticket?.isOpend?.status},ticket.orderID?._id)}
                  >
                    Open
                  </button>


                    </Fragment>
                  )}
                 
                  
                </div>
              </div>
            </div>
            </Fragment>
           ))}

            </Fragment>
           ) : (
            <Fragment>
              {filterTickets&&filterTickets.map((ticket,key)=>(
            <Fragment>
               <div className="card m-2" style={{ width: "46%" }} key={key}>
              <div className="row g-0 d-flex justify-content-center">
                <div
                  className="col-md-4"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="cardBox"
                    style={{
                      backgroundColor: "#ececec",
                      borderRadius: ".5rem",
                      width: "70px",
                      height: "70px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={ticket.orderID?.orderItems[0]?.image}
                      className="img-fluid rounded-start"
                      alt="img"
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title text-capitalize">#{ticket.orderID?._id}</h5>
                    <p className="card-text">
                      <small className="text-muted text-capitalize">
                        per piece
                      </small>
                    </p>
                    <span className="card-text fs-5">Rs {ticket.orderID?.totalPrice}</span>

                    <span
                      className="form-check form-switch d-inline me-2"
                      style={{ position: "absolute", right: "0" }}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                      />
                    </span>
                  </div>
                </div>
                <hr style={{ width: "95%" }} />
                <div className="d-flex p-2 justify-content-between align-items-center">
                {ticket?.ticketClossed?.status === true ? (
                     <Fragment>

                     <h5>Closed</h5>
                  </Fragment>
                  ) : (
                    <Fragment>
                      {ticket?.isOpend?.status === true ? (
                         <Fragment>
                         <h5>Opened</h5>
                       </Fragment>

                      ) : (
                        <Fragment>
                        <h5>New</h5>
                       </Fragment>

                      )}

                    </Fragment>
                  )}

                  {ticket?.isOpend?.status === true ? (
                    <Fragment>
                      <button
                    type="button"
                    className="btn bg-success btn-success btn-md"
                    onClick={()=> openTicketHandler(ticket._id,{status:ticket?.isOpend?.status},ticket.orderID?._id)}
                  >
                    Details
                  </button>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <button
                    type="button"
                    className="btn bg-success btn-success btn-md"
                    onClick={()=> openTicketHandler(ticket._id,{status:ticket?.isOpend?.status},ticket.orderID?._id)}
                  >
                    Open
                  </button>


                    </Fragment>
                  )}
                </div>
              </div>
            </div>
            </Fragment>
           ))}
            </Fragment>
           )} 
          </div>
          )}

        </div>
        <div
          className="container-md d-flex flex-column"
          style={{ width: "40%", backgroundColor: "white" }}
        >
          <div
            className="d-flex align-items-center w-100 px-3"
            style={{ height: "4rem" }}
          >
            <h5 className="m-0">Replies</h5>
          </div>
          <hr />
          <div className="px-3" style={{ margin: ".5rem 0" }}>
            <p style={{ backgroundColor: "#f6f6f6", padding: ".5rem" }}>
              Lorem ipsum dolor sit amet consectetur sam hekk.
            </p>
            <p style={{ backgroundColor: "#f6f6f6", padding: ".5rem" }}>
              Lorem ipsum dolor sit amet consectetur sam hekk.
            </p>
            <p style={{ backgroundColor: "#f6f6f6", padding: ".5rem" }}>
              Lorem ipsum dolor sit amet consectetur sam hekk.
            </p>
            <p style={{ backgroundColor: "#f6f6f6", padding: ".5rem" }}>
              Lorem ipsum dolor sit amet consectetur sam hekk.
            </p>
            <p style={{ backgroundColor: "#f6f6f6", padding: ".5rem" }}>
              Lorem ipsum dolor sit amet consectetur sam hekk.
            </p>
            <div className="input-group mb-3">
              <input
                type="text"
                placeholder="Add new"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
