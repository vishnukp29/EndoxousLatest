import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
} from "chart.js";
import {
  clearErrors,
  getOrderChart,
  getSalesOrdders,
  getSalesperDay,
} from "../../redux/actions/chartAction";
import { getperDayOders } from "../../redux/actions/chartAction";
import { toast } from "react-toastify";
import { getAllUsers, getReturningUsers } from "../../redux/actions/userAction";
import Loader from "../../Components/SideBar/Loader/Loader";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
);

const Analytics = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, dateOrder, totalOrder } = useSelector(
    (state) => state.chart
  );
  const {
    error: totalSalesError,
    dateSales,
    totalSales,
  } = useSelector((state) => state.chartSales);

  const {
    error: ordersPerDayError,
    loading: ordersPerDayLoading,
    dateSales: ordersPerDayDate,
    totalSales: ordersPerDayTotal,
    ordersReport,
  } = useSelector((state) => state.ordersPerDay);

  const {
    error: salesError,
    loading: salesLoading,
    dateSales: salesDate,
    totalSales: salesTotal,
    salesReport: salesSalseReport,
  } = useSelector((state) => state.salePerDay);

  const { users } = useSelector((state) => state.allUsers);
  const { users: customers } = useSelector((state) => state.returningUsers);
  const userShppedMorethanOne = customers.length;
  const noOfCustomers = users.length;
  const returningCustomers = (userShppedMorethanOne / noOfCustomers) * 100;
  console.log(returningCustomers);

  const totalOrderCount = totalOrder?.reduce((a, b) => a + b, 0);
  console.log(totalOrderCount);
  const totalsalesAmount = totalSales?.reduce((a, b) => a + b, 0);

  const orderReport = {
    labels: dateOrder && dateOrder,
    datasets: [
      {
        label: "TOTAL ORDERS",
        backgroundColor: ["#0f390f"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: totalOrder && totalOrder,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const salesReport = {
    labels: dateSales && dateSales,
    datasets: [
      {
        label: "SALES REPORT",
        backgroundColor: ["#0f390f"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: totalSales && totalSales,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const averageOrderValue = totalsalesAmount / totalOrderCount;
  console.log(totalsalesAmount);
  console.log(totalOrderCount);
  console.log(averageOrderValue);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (totalSalesError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    dispatch(getOrderChart());
    dispatch(getSalesOrdders());
    dispatch(getperDayOders());
    dispatch(getSalesperDay());
    dispatch(getAllUsers());
    dispatch(getReturningUsers());
  }, [dispatch, error, totalSalesError]);

  const [orderDate, setOrderDate] = useState(1);

  const [orders, setOrders] = useState("");
  const [totalOrders, setTotalOrders] = useState();

  const [sales, setSales] = useState("");
  const [totalSale, setTotalSale] = useState();

  console.log(totalOrders);
  console.log(totalSale);

  useEffect(() => {
    setTotalOrders(
      ordersPerDayTotal && ordersPerDayTotal.reduce((a, b) => a + b, 0)
    );
    setTotalSale(salesTotal && salesTotal.reduce((a, b) => a + b, 0));
  }, [orders, sales]);

  // Orders
  const days = ordersPerDayDate && ordersPerDayDate.length;
  console.log(days);

  const avg = Math.floor(totalOrders / days);
  console.log(avg);

  // Sales
  const numOfDays = salesDate && salesDate.length;
  console.log(numOfDays);

  const avgSale = Math.floor(totalSale / numOfDays);
  console.log(avgSale);

  // Today
  let currentDate = new Date().toJSON().slice(0, 10);
  console.log(currentDate, "current Date");

  // Yesterday
  const getYesterdayDate = () => {
    const now = new Date();
    return new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
      .toJSON()
      .slice(0, 10);
  };
  const yesterday = getYesterdayDate();
  console.log(typeof yesterday, "Yesterday");

  // Filtering
  const todayOrders =
    ordersReport &&
    ordersReport &&
    ordersReport.filter((order) => order.date === currentDate);
  const todayCount =
    todayOrders && todayOrders.reduce((acc, item) => acc + item.count, 0);
  const todaySales =
    todayOrders && todayOrders.reduce((acc, item) => acc + item.total, 0);
  console.log(
    todayCount && todayCount,
    todaySales && todaySales,
    "========= count"
  );

  const yesterdayOrders =
    ordersReport && ordersReport.filter((order) => order.date === yesterday);
  const yesterdayCount =
    yesterdayOrders &&
    yesterdayOrders.reduce((acc, item) => acc + item.count, 0);
  const yesterdaySales =
    yesterdayOrders &&
    yesterdayOrders.reduce((acc, item) => acc + item.total, 0);
  console.log(yesterdayCount && yesterdayCount, "========= Order");
  console.log(yesterdaySales && yesterdaySales, "=====Sales");

  const analyticSelect = (e) => {
    let item = parseInt(e.target.value);
    if (item === 1) {
      setOrders(totalOrderCount);
      setSales(totalsalesAmount);
    } else if (item === 2) {
      setOrders(todayCount);
      setSales(todaySales);
    } else if (item === 3) {
      setOrders(yesterdayCount);
      setSales(yesterdaySales);
    }
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
            Analytics
          </NavLink>
          <button
            className="btn btn-outline-success btnround"
            type="submit"
          ></button>
        </div>
        <hr />
      </nav>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center py-1">
            <div className="p-5">
              <h4>Overview</h4>
            </div>
            <div>
              <div className="d-flex align-items-center px-4 ">
                {/* <button type="button" className="btn btn-sm btn-link me-5">
              Reorder Catagory
            </button> */}
                <div className="p2-selection mx-2">
                  <select
                    className="form-select "
                    aria-label="Default select example"
                  >
                    <option selected>All nurseries</option>
                    <option value="1">Greens Calicut</option>
                  </select>
                </div>
                <div className="p2-selection mx-2">
                  <select
                    selected={orderDate}
                    className="form-select "
                    aria-label="Default select example"
                    onChange={analyticSelect}
                  >
                    <option value="1">Lifetime</option>
                    <option value="2">Today</option>
                    <option value="3">Yesterday</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="container d-flex justify-content-between w-100 px-5">
            <div className="card" style={{ width: "24%" }}>
              <div className="card-body">
                <h6 className="card-title">AVG ORDERS PER DAY</h6>
                <h2 className="card-subtitle mb-2 text-muted">{avg}</h2>
              </div>
            </div>
            <div className="card" style={{ width: "24%" }}>
              <div className="card-body">
                <h6 className="card-title">AVG ORDER VALUE</h6>
                {/* <h2 className="card-subtitle mb-2 text-muted">{Math.round(averageOrderValue)}</h2> */}
                <h2 className="card-subtitle mb-2 text-muted">
                  {averageOrderValue.toFixed(2)}
                </h2>
              </div>
            </div>
            <div className="card" style={{ width: "24%" }}>
              <div className="card-body">
                <h6 className="card-title">AVG SALES PER DAY</h6>
                <h2 className="card-subtitle mb-2 text-muted">
                  Rs {avgSale.toFixed(2)}
                </h2>
              </div>
            </div>
            <div className="card" style={{ width: "24%" }}>
              <div className="card-body">
                <h6 className="card-title">RETURNING CUSTOMERS</h6>
                <h2 className="card-subtitle mb-2 text-muted">
                  {returningCustomers.toFixed(2)} %
                </h2>
              </div>
            </div>
          </div>

          <div className="container d-flex justify-content-between w-100 px-5 py-4">
            <div className="card" style={{ width: "30.5rem" }}>
              <div className="card-body">
                <h5 className="card-title">TOTAL ORDERS</h5>
                <h2 className="card-subtitle mb-2 text-muted">{orders}</h2>
              </div>
            </div>
            <div className="card" style={{ width: "30.5rem" }}>
              <div className="card-body">
                <h5 className="card-title">TOTAL SALES</h5>
                <h2 className="card-subtitle mb-2 text-muted">{sales}</h2>
              </div>
            </div>
          </div>

          <hr style={{ width: "95%", margin: "1rem auto" }} />
          <div className="linechart">
            <Line data={orderReport} />
          </div>
          <hr style={{ width: "95%", margin: "1rem auto" }} />
          <div className="linechart">
            <Line data={salesReport} />
          </div>
          <hr style={{ width: "95%", margin: "1rem auto" }} />

          <div className="container d-flex justify-content-between w-100 px-5 py-4">
            <div className="card" style={{ width: "30.5rem" }}>
              <div className="card-body">
                <h2 className="card-title mb-4">SALES BY TOP NURSERIES</h2>
                <h6 className="card-subtitle text-muted mt-2">
                  1.Nursery Name
                </h6>
                <div className="progress my-3">
                  <div
                    className="progress-bar w-50"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    50%
                  </div>
                </div>
                <h6 className="card-subtitle text-muted mt-2">
                  1.Nursery Name
                </h6>
                <div className="progress my-3">
                  <div
                    className="progress-bar w-50"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    50%
                  </div>
                </div>
                <h6 className="card-subtitle text-muted mt-2">
                  1.Nursery Name
                </h6>
                <div className="progress my-3">
                  <div
                    className="progress-bar w-50"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    50%
                  </div>
                </div>
                <h6 className="card-subtitle text-muted mt-2">
                  1.Nursery Name
                </h6>
                <div className="progress my-3">
                  <div
                    className="progress-bar w-50"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    50%
                  </div>
                </div>
                <h6 className="card-subtitle text-muted mt-2">
                  1.Nursery Name
                </h6>
                <div className="progress my-3">
                  <div
                    className="progress-bar w-50"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    50%
                  </div>
                </div>
                <h6 className="card-subtitle text-muted mt-2">
                  1.Nursery Name
                </h6>
                <div className="progress my-3">
                  <div
                    className="progress-bar w-50"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    50%
                  </div>
                </div>
              </div>
            </div>
            <div className="card" style={{ width: "30.5rem" }}>
              <div className="card-body">
                <h2 className="card-title mb-4">SALES BY TOP REGIONS</h2>
                <h6 className="card-subtitle text-muted mt-2">
                  1.Nursery Name
                </h6>
                <div className="progress my-3">
                  <div
                    className="progress-bar w-50"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    50%
                  </div>
                </div>
                <h6 className="card-subtitle text-muted mt-2">
                  1.Nursery Name
                </h6>
                <div className="progress my-3">
                  <div
                    className="progress-bar w-50"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    50%
                  </div>
                </div>
                <h6 className="card-subtitle text-muted mt-2">
                  1.Nursery Name
                </h6>
                <div className="progress my-3">
                  <div
                    className="progress-bar w-50"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    50%
                  </div>
                </div>
                <h6 className="card-subtitle text-muted mt-2">
                  1.Nursery Name
                </h6>
                <div className="progress my-3">
                  <div
                    className="progress-bar w-50"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    50%
                  </div>
                </div>
                <h6 className="card-subtitle text-muted mt-2">
                  1.Nursery Name
                </h6>
                <div className="progress my-3">
                  <div
                    className="progress-bar w-50"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    50%
                  </div>
                </div>
                <h6 className="card-subtitle text-muted mt-2">
                  1.Nursery Name
                </h6>
                <div className="progress my-3">
                  <div
                    className="progress-bar w-50"
                    role="progressbar"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    50%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;