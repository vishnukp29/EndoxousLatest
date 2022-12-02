import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getperDayOders, getSalesperDay } from "../../redux/actions/chartAction";
import { clearErrors, getAllOrders } from "../../redux/actions/orderAction";
import { getAllNurseries } from "../../redux/actions/nurseryAction";
import "./Page6.css";
// import logo from "../../Assets/Images/logo3.png";
import Loader from "../../Components/SideBar/Loader/Loader";

function OrderReports() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders, loading } = useSelector((state) => state.allOrders);
  const {
    error: salesPerDayError,
    loading: salesLoading,
    dateSales,
    totalSales,
    salesReport,
  } = useSelector((state) => state.salePerDay);

 const sorted= salesReport&&salesReport.sort((a,b)=>a.date - b.date) 
  console.log(sorted,'=================sorted');

  const {totalSales:orderTotalSales,} = useSelector((state) => state.ordersPerDay);

  const toatlOrdersCount = orderTotalSales && orderTotalSales.reduce((a, b) => a + b, 0);
  const days = dateSales && dateSales.length;
  console.log(days,"===d",dateSales&&dateSales);
  const avg = Math.floor(toatlOrdersCount / days);

  const { error: nurseriesError, nurseries } = useSelector(
    (state) => state.allNurseries
  );

  const [nursery, setNursery] = useState("");
  const [state, setState] = useState(false);
  const [filteredOrders, setFilterOrders] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    dispatch(getSalesperDay());
    dispatch(getperDayOders());
    dispatch(getAllOrders());
    dispatch(getAllNurseries());
  }, [dispatch, error]);

  const nurseryDropDownHandler = (e) => {
    const nursery = e.target.value;
    const nuserysOrders =
    salesReport &&
    salesReport.filter((sale) => sale.deliveredBy === nursery);
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
  console.log(AllOrdders,'AllOrdders');
  const todayOrders =
  salesReport && salesReport.filter((sale) => sale.date === currentDate);
    console.log(todayOrders,'TodayOrders');


  const weekOrders =
  salesReport && salesReport.filter((sale) => sale.date >= weekend);
    console.log(weekOrders,'WeekendOrders');

  const monthOrders =
  salesReport && salesReport.filter((sale) => sale.date >= monthend);
    console.log(monthOrders,'MonthendOrders');

  const ordersSelect = (e) => {
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
        <div className="section2" style={{ height: "100vh" }}>
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
                Orders Report
              </NavLink>
              <button
                className="btn btn-outline-success btnround"
                type="submit"
              ></button>
            </div>
            <hr />
          </nav>
          <div className="d-flex justify-content-between align-items-center flex-wrap px-2 py-1">
            <div className="pt-4 px-5">
              <p>AVG ORDERS PER DAY</p>
              <h4>{avg}</h4>
            </div>
            <div>
              <div className="d-flex px-4 ">
                <div className="p2-selection mx-2 ">
                  <select
                    className="form-select w-100"
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

                <div className="p2-selection mx-4">
                  <select
                    className="form-select w-100"
                    aria-label="Default select example"
                    onChange={ordersSelect}
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
          <div className="tableForAll s2-table m-5 ">
            <div className="s2-table subTableForAll">
              {salesLoading ? (
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
                      <th scope="col">Date</th>
                      <th scope="col">Orders</th>
                      <th scope="col">Sales</th>
                      <th scope="col">Nursery Name</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider my-5">
                    {state === false ? (
                      <Fragment>
                        {salesReport &&
                          salesReport.map((sale, index) => (
                            <tr key={index}>
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

export default OrderReports;
