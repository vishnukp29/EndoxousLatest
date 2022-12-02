import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getUserDetails } from "../../redux/actions/userAction";
import { toast } from "react-toastify";
import { getUsersOrders } from "../../redux/actions/orderAction";

const CustomerName = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [filteredOrders, setFilterOrders] = useState([]);
  const [state, setState] = useState(false);

  const { error, loading, user } = useSelector((state) => state.userDetails);
  const { error:orderError, loading:orderLoading,orders  } = useSelector((state) => state.usersOrders);


  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (orderError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    if (orders) {
      setFilterOrders(orders);
    }
   


    dispatch(getUserDetails(id))
    dispatch(getUsersOrders(id))
  }, [dispatch,id,error,orderError,setFilterOrders]);

  const orderDetailsHandler = (id) =>{
      navigate(`/orders/${id}`)
  }

  const AllOrdders = orders && orders.filter((order) => order);
  const pendingOrdders =
    orders && orders.filter((order) => order.orderStatus === "pending");
  const shippedOrdders =
    orders && orders.filter((order) => order.orderStatus === "Shipped");
  const deliveredOrdders =
    orders && orders.filter((order) => order.orderStatus === "Delivered");
  const CancelledOrdders =
    orders && orders.filter((order) => order.orderStatus === "Cancelled");

    const showAll = () => {
      setFilterOrders(AllOrdders);
      setState(true)
    };
    const showPending = () => {
      setFilterOrders(pendingOrdders);
      setState(true)
    };
    const showShippied = () => {
      setFilterOrders(shippedOrdders);
      setState(true)
    };
    const showDelivered = () => {
      setFilterOrders(deliveredOrdders);
      setState(true)
    };
    const showCancelled = () => {
      setFilterOrders(CancelledOrdders);
      setState(true)
    };


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
            Customer Name
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
            <button className="s2-btn fs-6" style={{ padding: "0 .7rem" }} onClick={() => showAll()}
							autoFocus>
              All
            </button>
            <button className="s2-btn fs-6" style={{ padding: "0 .7rem" }} onClick={() => showPending()}>
              Pending
            </button>
            <button className="s2-btn fs-6" style={{ padding: "0 .7rem" }} onClick={() => showShippied()}>
              Shipped
            </button>
            <button className="s2-btn fs-6" style={{ padding: "0 .7rem" }} onClick={() => showDelivered()}>
              Delivered
            </button>
            <button className="s2-btn fs-6" style={{ padding: "0 .7rem" }} onClick={() => showCancelled()}>
              Cancelled
            </button>
          </div>
          <div className="container d-flex flex-wrap">
            {state === false ? (
              <Fragment>
                {orders&&orders.map((order,index)=>(
              <div className="card m-2" style={{ width: "46%" }} key={index}>
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
                      src={order.orderItems[0]?.image}
                      className="img-fluid rounded-start"
                      alt="img"
                    />
                   
                  </div>
                </div>
               
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title text-capitalize">Order no #{order?._id}</h5>
                    <p className="card-text">
                      <small className="text-muted text-capitalize">
                       item {order?.orderItems.length}
                      </small>
                    </p>
                    <span className="card-text fs-5">Rs {order?.totalPrice}</span>

                    <span
                      className="form-check form-switch d-inline me-2"
                      style={{ position: "absolute", right: "0" }}
                    >
                      <input
                        className=""
                        type="button"
                        id="flexSwitchCheckDefault"
                        value={order.paymentInfo?.method}
                        readOnly
                      />
                      {/* <input
                        className="form-check-input"
                        type="button"
                        id="flexSwitchCheckDefault"
                      /> */}
                    </span>
                  </div>
                </div>
                <hr style={{ width: "95%" }} />
                <div className="d-flex p-2 justify-content-between align-items-center">
                  <h5>{order?.orderStatus}</h5>
                  <button
                    type="button"
                    className="btn bg-success btn-success btn-md"
                    onClick={()=>orderDetailsHandler(order?._id)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
            ))}

              </Fragment>
            ) : (
              <Fragment>
                {filteredOrders&&filteredOrders.map((order,index)=>(
              <div className="card m-2" style={{ width: "46%" }} key={index}>
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
                      src={order.orderItems[0]?.image}
                      className="img-fluid rounded-start"
                      alt="img"
                    />
                   
                  </div>
                </div>
               
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title text-capitalize">Order no #{order?._id}</h5>
                    <p className="card-text">
                      <small className="text-muted text-capitalize">
                       item {order?.orderItems.length}
                      </small>
                    </p>
                    <span className="card-text fs-5">Rs {order?.totalPrice}</span>

                    <span
                      className="form-check form-switch d-inline me-2"
                      style={{ position: "absolute", right: "0" }}
                    >
                      <input
                        className=""
                        type="button"
                        id="flexSwitchCheckDefault"
                        value={order.paymentInfo?.method}
                        readOnly
                      />
                      {/* <input
                        className="form-check-input"
                        type="button"
                        id="flexSwitchCheckDefault"
                      /> */}
                    </span>
                  </div>
                </div>
                <hr style={{ width: "95%" }} />
                <div className="d-flex p-2 justify-content-between align-items-center">
                  <h5>{order?.orderStatus}</h5>
                  <button
                    type="button"
                    className="btn bg-success btn-success btn-md"
                    onClick={()=>orderDetailsHandler(order?._id)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
            ))}
              </Fragment>
    
            )}
            
          </div>
        </div>
        <div
          className="container-md d-flex flex-column"
          style={{ width: "40%", backgroundColor: "white" }}
        >
          <div
            className="d-flex align-items-center justify-content-between w-100 px-3"
            style={{ height: "4rem" }}
          >
            <h5 className="m-0">Customer Details</h5>
            <button className="btn py-0">Edit</button>
          </div>
          <hr />
          <div
            className="px-3"
            style={{ lineHeight: ".4rem", margin: ".7rem 0" }}
          >
            <p>Name</p>
            <h6>{user?.name ? user?.name : "USER NAME"}</h6>
          </div>
          <div
            className="px-3"
            style={{ lineHeight: ".4rem", margin: ".7rem 0" }}
          >
            <p>Phone</p>
            <h6>{user?.phone ??  "USER PHONE"}</h6>
          </div>
          <div
            className="px-3"
            style={{ lineHeight: ".4rem", margin: ".7rem 0" }}
          >
            <p>Email</p>
            <h6>{user?.email?.slice(0, 17) === "example@gmail.com"
                        ? "USER EMAIL"
                        : user?.email}</h6>
          </div>
          <div
            className="px-3"
            style={{ lineHeight: ".4rem", margin: ".7rem 0" }}
          >
            <p>Address</p>
            <h6>{user?.address ?? "USER ADDRESS"}</h6>
          </div>
          <div
            className="px-3"
            style={{ lineHeight: ".4rem", margin: ".7rem 0" }}
          >
            <p>Area/Locality</p>
            <h6>{user?.area ?? "USER AREA/LOCALITY"}</h6>
          </div>
          <div
            className="px-3"
            style={{ lineHeight: ".4rem", margin: ".7rem 0" }}
          >
            <p>State</p>
            <h6>{user?.state ?? "USER STATE"}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerName;
