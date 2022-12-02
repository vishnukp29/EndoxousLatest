import React, { Fragment, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./Page2.css";
import DateFormatter from "../../utils/DateFormatter";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getAllOrders } from "../../redux/actions/orderAction";
import { getAllNurseries } from "../../redux/actions/nurseryAction";
import Loader from "../../Components/SideBar/Loader/Loader";

function AllOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, orders } = useSelector((state) => state.allOrders);
  const { error: nurseriesError, nurseries } = useSelector(
    (state) => state.allNurseries
  );

  const [nursery, setNursery] = useState("");
  const [keyword, setKeyword] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredOrders, setFilterOrders] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (nurseriesError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    if (orders) {
      setFilterOrders(orders);
    }

    dispatch(getAllOrders());
    dispatch(getAllNurseries());
  }, [dispatch, error, nurseriesError, keyword, filterStatus, setFilterOrders]);

  const assigntoHandler = (orderId, nursery) => {
    dispatch();
  };

  const viewDeatils = (id) => {
    navigate(`/orders/${id}`);
  };

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
    setState(true);
  };
  const showPending = () => {
    setFilterOrders(pendingOrdders);
    setState(true);
  };
  const showShippied = () => {
    setFilterOrders(shippedOrdders);
    setState(true);
  };
  const showDelivered = () => {
    setFilterOrders(deliveredOrdders);
    setState(true);
  };
  const showCancelled = () => {
    setFilterOrders(CancelledOrdders);
    setState(true);
  };

  const handleSelect = (e) => {
    let item = parseInt(e.target.value);
    if (item === 1) {
      setFilterOrders(pendingOrdders);
      setState(true);
    } else if (item === 2) {
      setFilterOrders(shippedOrdders);
      setState(true);
    } else if (item === 3) {
      setFilterOrders(deliveredOrdders);
      setState(true);
    } else if (item === 4) {
      setFilterOrders(CancelledOrdders);
      setState(true);
    } else {
      setFilterOrders(AllOrdders);
      setState(true);
    }
  };

  const nurseryDropDownHandler = (e) => {
    const nursery = e.target.value;
    const nuserysOrders =
      orders && orders.filter((order) => order.deliveredBy === nursery);
    setFilterOrders(nuserysOrders);
    setState(true);

    if (nursery === 1) {
      setFilterOrders(AllOrdders);
      setState(true);
    }
  };

  // Date
  let currentDate = new Date().toJSON().slice(0, 10);

  // Week
  const getLastWeeksDate = () => {
    const now = new Date();
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      .toJSON()
      .slice(0, 10);
  };
  const weekend = getLastWeeksDate();

  // Month
  function getMonthEndDate(numOfMonths, date = new Date()) {
    const dateCopy = new Date(date.getTime());
    dateCopy.setMonth(dateCopy.getMonth() - numOfMonths);
    return dateCopy;
  }
  const date = new Date();
  const monthend = getMonthEndDate(1, date).toJSON().slice(0, 10);
  console.log(monthend);

  // Custom Date
  const [showDatePicker, setShowDatePicker] = useState(false);
  //   const [selectedDate, setSelectedDate] = useState(new Date())
  // const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(''); 

  const [customDate, setCustomDate] = useState(
    startDate, endDate
  );
  
  useEffect(() => {
    setCustomDate(startDate);
    const customOrders =
      orders &&
      orders.filter((order) => (order.createdAt.slice(0, 10) >= startDate && order.createdAt.slice(0, 10) <= endDate ));
    setFilterOrders(customOrders);
  }, [startDate, orders, customDate, endDate]);

  

  // Filtering
  const todayOrders =
    orders &&
    orders.filter((order) => order.createdAt.slice(0, 10) === currentDate);

  const weekOrders =
    orders && orders.filter((order) => order.createdAt.slice(0, 10) >= weekend);

  const monthOrders =
    orders &&
    orders.filter((order) => order.createdAt.slice(0, 10) >= monthend);

  const getCustomOrders = (date) => {
    setStartDate(date);
  };

  const daysSelect = (e) => {
    let item = parseInt(e.target.value);
    setShowDatePicker(false);
    if (item === 1) {
      setFilterOrders(todayOrders);
      setState(true);
    } else if (item === 2) {
      setFilterOrders(weekOrders);
      setState(true);
    } else if (item === 3) {
      setFilterOrders(monthOrders);
      setState(true);
    } else if (item === 4) {
      setShowDatePicker(true);
      setState(true);
    } else {
      setFilterOrders(AllOrdders);
      setState(true);
    }
  };

  return (
    <div>
      <div className="mainsection">
        <div className="section2 ">
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
                All Orders
              </NavLink>
              <button
                className="btn btn-outline-success btnround"
                type="submit"
              ></button>
            </div>
            <hr />
          </nav>
          <div className="d-flex justify-content-between align-items-center px-2 py-1 filterInputInAllOrders">
            <div className="p-5 filterInput" onClick={(e) => setState(false)}>
              {/* <form className="searchBox" onSubmit={searchSubmitHandler}> */}
              <input
                className="form-control px-4"
                type="text"
                value={keyword}
                aria-label="readonly input example"
                placeholder="Order ID, phone or name..."
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="px-4">
              <div className="d-flex px-4">
                <div className="p2-selection mx-2">
                  <select
                    className="form-select "
                    aria-label="Default select example"
                    onChange={handleSelect}
                  >
                    <option defaultValue=''>Order status </option>
                    <option value="1">Pending</option>
                    <option value="2">Shipped</option>
                    <option value="3">Delivered</option>
                    <option value="4">Cancelled</option>
                  </select>
                </div>
                <div className="p2-selection mx-2 ">
                  <select
                    className="form-select "
                    aria-label="Default select example"
                    onChange={nurseryDropDownHandler}
                  >
                    <option selected value="1">
                      Special filters
                    </option>
                    {nurseries &&
                      nurseries.map((nursery, index) => (
                        <option value={nursery.name} key={index}>
                          {nursery?.name + " " + nursery?.address}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="p2-selection mx-2">
                  <select
                    className="form-select "
                    aria-label="Default select example"
                    onChange={daysSelect}
                  >
                    <option defaultValue="Select">All Orders</option>
                    <option value="1">Today</option>
                    <option value="2">This Week</option>
                    <option value="3">This Month</option>
                    <option value="4">Custom</option>
                  </select>
                  <h1>{showDatePicker}</h1>
                  {showDatePicker && (
                    <div>
                      From : <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className='mx-1'/>
                      To : <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}/>
                    </div>
                    // <DatePicker
                    //   selected={selectedDate}
                    //   onChange={(date) => getCustomOrders(date)}
                    //   // onChange={(date)=> (setSelectedDate(date)
                    //   //   )}
                    //   dateFormat="dd-MM-yyyy"
                    // />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="section2-btn d-flex px-5 ">
            <button
              className="s2-btn py-2 px-3 my-2"
              onClick={() => showAll()}
              autoFocus
            >
              All
            </button>
            <button
              className="s2-btn py-2 px-3 my-2"
              onClick={() => showPending()}
            >
              Pending
            </button>
            <button
              className="s2-btn py-2 px-3 my-2"
              onClick={() => showShippied()}
            >
              Shipped
            </button>
            <button
              className="s2-btn py-2 px-3 my-2"
              onClick={() => showDelivered()}
            >
              Delivered
            </button>
            <button
              className="s2-btn py-2 px-3 my-2"
              onClick={() => showCancelled()}
            >
              Cancelled
            </button>
          </div>
          
          <div className="tableForAll s2-table m-5 ">
            <div className="s2-table subTableForAll">
              {loading ? ( 
                <Loader />
              ) : (
                <table
                  className="table table-borderless"
                  style={{
                    overflow: "hidden",
                    width: "100%",
                    borderRadius: ".5rem",
                    backgroundColor: "white",
                  }}
                >
                  <thead style={{ backgroundColor: "#eaeaea" }}>
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Date and Time</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Items</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Status</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Deliverd By</th>
                    </tr>
                  </thead>

                  <tbody className="table-group-divider  my-5">
                    {state === false ? (
                      <Fragment>
                        {orders &&
                          orders
                            .filter((val) => {
                              if (keyword === "") {
                                return val;
                              } else if (
                                val.fullName
                                  ?.toLowerCase()
                                  .includes(keyword?.toLowerCase())
                              ) {
                                return val;
                              }
                            })
                            .map((order, index) => (
                              <tr key={index}>
                                <th
                                  onClick={() => viewDeatils(order._id)}
                                  scope="row"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                >
                                  {order?._id}
                                </th>
                                <td>
                                  <DateFormatter date={order.createdAt} />
                                </td>

                                <td>
                                  {order.user?.name
                                    ? order.user?.name
                                    : order.user?.phone}
                                </td>
                                <td>{order.orderItems?.length}</td>
                                <td>{order.paymentInfo?.method}</td>
                                <td>
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
                                </td>
                                <td>Rs {order?.totalPrice}</td>
                                <td>
                                  {order && order?.deliveredBy ? (
                                    <td>{order?.deliveredBy}</td>
                                  ) : (
                                    <select
                                      className="form-select-sm px-3"
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        setNursery(e.target.value)
                                      }
                                    >
                                      <option selected>Select Nursery </option>
                                      {nurseries &&
                                        nurseries.map((nursery, index) => (
                                          <option
                                            value={nursery.name}
                                            key={index}
                                          >
                                            {nursery?.name +
                                              " " +
                                              nursery?.address}
                                          </option>
                                        ))}
                                    </select>
                                  )}
                                </td>
                              </tr>
                            ))}
                      </Fragment>
                    ) : (
                      <Fragment>
                        {filteredOrders &&
                          filteredOrders
                            .filter((val) => {
                              if (keyword === "") {
                                return val;
                              } else if (
                                val.fullName
                                  ?.toLowerCase()
                                  .includes(keyword?.toLowerCase())
                              ) {
                                return val;
                              }
                            })
                            .map((order, index) => (
                              <tr key={index}>
                                <th
                                  onClick={() => viewDeatils(order._id)}
                                  scope="row"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                >
                                  {order?._id}
                                </th>
                                <td>
                                  {" "}
                                  <DateFormatter date={order.createdAt} />{" "}
                                  {/* {order.createdAt.slice(0, 10)}
                              {console.log((order.createdAt).slice(0, 10),'Date')};  */}
                                </td>

                                <td>
                                  {order.user?.name
                                    ? order.user?.name
                                    : order.user?.phone}
                                </td>
                                <td>{order.orderItems?.length}</td>
                                <td>{order.paymentInfo?.method}</td>
                                <td>
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
                                </td>
                                <td>Rs {order?.totalPrice}</td>
                                <td>
                                  {order && order?.deliveredBy ? (
                                    <td>{order?.deliveredBy}</td>
                                  ) : (
                                    <select
                                      className="form-select-sm px-3"
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        setNursery(e.target.value)
                                      }
                                    >
                                      <option selected>Select Nursery </option>
                                      {nurseries &&
                                        nurseries.map((nursery, index) => (
                                          <option
                                            value={nursery.name}
                                            key={index}
                                          >
                                            {nursery?.name +
                                              " " +
                                              nursery?.address}
                                          </option>
                                        ))}
                                    </select>
                                  )}
                                </td>
                              </tr>
                            ))}
                      </Fragment>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllOrders;
