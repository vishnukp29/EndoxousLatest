import React, { useEffect, useState, Fragment } from "react";
import "./Page7.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getSalesperDay } from "../../redux/actions/chartAction";
import { getAllNurseries } from "../../redux/actions/nurseryAction";
import { getAllOrders } from "../../redux/actions/orderAction";
import Loader from "../../Components/SideBar/Loader/Loader";

function SalesReport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    error: orderError,
    orders,
    loading: ordresLoading,
  } = useSelector((state) => state.allOrders);
  
  const { error, loading, dateSales, totalSales, salesReport } = useSelector(
    (state) => state.salePerDay
  );

  const sorted= salesReport&&salesReport.sort((a,b)=>a.date - b.date) 
  console.log(sorted,'=================sorted');
  
  console.log(
    dateSales && dateSales,
    "============",
    totalSales && totalSales,
    salesReport && salesReport,
    "========== sale perday"
  );

  const totalSalesAmount = totalSales && totalSales.reduce((a, b) => a + b, 0);

  const { error: nurseriesError, nurseries } = useSelector(
    (state) => state.allNurseries
  );

  const [state, setState] = useState(false);
  const [filteredOrders, setFilterOrders] = useState([]);

  

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    dispatch(getSalesperDay());
    dispatch(getAllOrders());
    dispatch(getAllNurseries());
  }, [dispatch, error]);

  const nurseryDropDownHandler = (e) => {
    const nursery = e.target.value;
    const nuserysOrders =
      salesReport && salesReport.filter((sale) => sale.deliveredBy === nursery);
    setFilterOrders(nuserysOrders);
    if (nursery === 1) {
      setFilterOrders(AllOrdders);
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

  // Filtering
  const AllOrdders = salesReport && salesReport.filter((sale) => sale);
  const todayOrders =
    salesReport && salesReport.filter((sale) => sale.date === currentDate);

  const weekOrders =
    salesReport && salesReport.filter((sale) => sale.date >= weekend);

  const monthOrders =
    salesReport && salesReport.filter((sale) => sale.date >= monthend);

  const salesSelect = (e) => {
    let item = parseInt(e.target.value);
    if (item === 1) {
      setFilterOrders(AllOrdders);
      setState(true);
    } else if (item === 2) {
      setFilterOrders(todayOrders);
      setState(true);
    } else if (item === 3) {
      setFilterOrders(weekOrders);
      setState(true);
    } else {
      setFilterOrders(monthOrders);
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

              <NavLink className="fw-bold navbar-brand " to="/">
                Sales Report
              </NavLink>
              <button
                className="btn btn-outline-success btnround"
                type="submit"
              ></button>
            </div>
            <hr />
          </nav>
          <div className="d-flex justify-content-between  align-items-center px-2 py-1">
            <div className="p-5">
              <p>TOTAL SALES</p>
              <h4>Rs {totalSalesAmount && totalSalesAmount}</h4>
            </div>
            <div>
              <div className="d-flex px-4 ">
                <div className="p2-selection mx-2"></div>
                <div className="p2-selection mx-2 ">
                  <select
                    className="form-select "
                    aria-label="Default select example"
                    onChange={nurseryDropDownHandler}
                  >
                    <option selected>All nurseries</option>
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
                    onChange={salesSelect}
                  >
                    <option value="1">Lifetime</option>
                    <option value="2">Today</option>
                    <option value="3">This Week</option>
                    <option value="4">This Month</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="s2-table px-5 m-3 ">
            <div className="s2-table py-4">
              {loading ? (
                <Loader />
              ):(
                <table className="table table-borderless table-sm ">
                <thead className="s2-table-nava">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Orders</th>
                    <th scope="col">Sales</th>
                    <th scope="col">Nursery Name</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider my-5">
                  {state == false ? (
                    <Fragment>
                      {salesReport &&
                        salesReport.map((sale, index) => (
                          <tr>
                            <th scope="row">{sale.date}</th>
                            <td>{sale.count}</td>
                            <td>{sale.total}</td>
                            <td>Area/Locality</td>
                          </tr>
                        ))}
                    </Fragment>
                  ) : (
                    <Fragment>
                      {filteredOrders &&
                        filteredOrders.map((sale, index) => (
                          <tr>
                            <th scope="row">{sale.date}</th>
                            <td>{sale.count}</td>
                            <td>{sale.total}</td>
                            <td>Area/Locality</td>
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

export default SalesReport;
