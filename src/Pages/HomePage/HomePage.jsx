import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../Components/SideBar/Loader/Loader";
import { MdDelete } from "react-icons/md";
import {
  addBanner,
  clearErrors,
  deleteBanner,
  getAllBanners,
} from "../../redux/actions/bannerAction";
import { toast } from "react-toastify";
import {
  ADD_BANNER_RESET,
  DELETE_BANNER_RESET,
} from "../../constants/bannerConstants";
import { getAllOrders } from "../../redux/actions/orderAction";
import { getAllNurseries } from "../../redux/actions/nurseryAction";

const HomePage = ({ toggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  // -------------------------------- Selctors --------------------------------
  const { error, loading, banners } = useSelector((state) => state.banners);

  const {error: addBannerError,message,success, 
    } = useSelector((state) => state.addBanner);

  const {error: deleteBannerError, message: deleteMessge,isDeleted,
    } = useSelector((state) => state.deleteBanner);

  const { error: ordersError, orders } = useSelector((state) => state.allOrders);
  
  const { error: nurseriesError, nurseries } = useSelector((state) => state.allNurseries);
  
  // ----------------------------------------------------------------//

  const pendingOrders =
    orders && orders.filter((order) => order.orderStatus === "pending");

  const pendingOrdersWorth =
    pendingOrders &&pendingOrders.reduce((acc, item) => acc + item.totalPrice, 0);

  const ordersToShip =orders &&orders.filter((order) =>
    order.orderStatus !== "Shipped" &&
    order.orderStatus !== "Cancelled" &&
    order.orderStatus !== "Delivered"
  );

  const top5Nuseries = nurseries && nurseries.slice(0, 5);

  // -------------------------------- UseEffect --------------------------------

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (addBannerError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (deleteBannerError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (ordersError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (nurseriesError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success(message);
      setAvatarPreview("");
      setAvatar("");
      dispatch({ type: ADD_BANNER_RESET });
    }
    if (isDeleted) {
      toast.success(deleteMessge);
      dispatch({ type: DELETE_BANNER_RESET });
    }
    dispatch(getAllBanners());
    dispatch(getAllOrders());
    dispatch(getAllNurseries());
  }, [
    dispatch,
    error,
    addBannerError,
    message,
    success,
    navigate,
    deleteBannerError,
    deleteMessge,
    isDeleted,
    ordersError,
    nurseriesError,
  ]);

  const bannerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const createBannerSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("avatar", avatar);
    dispatch(addBanner(myForm));
  };

  // Delete Banner
  const bannerDeleteHandler = (id) => {
    dispatch(deleteBanner(id));
  };
  
  const [sales, setSales] = useState(orders);
  const [totalSales, setTotalSales] = useState();

  useEffect(() => {
    setTotalSales(sales.reduce((acc, item) => acc + item.totalPrice, 0));
  }, [sales]);

  // -------------------------------- Calculating Date --------------------------------

   // Today
   let currentDate = new Date().toJSON().slice(0, 10)
 
   // Yesterday 
   const getYesterdayDate=()=> {
     const now = new Date();
     return new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toJSON().slice(0,10);
   }
   const yesterday= getYesterdayDate()
 
// -------------------------------- Filtering --------------------------------
  const todayOrders =
    orders && orders.filter((order) => (order.createdAt).slice(0, 10) === currentDate);

  const yesterdayOrders =
    orders &&orders.filter((order) => order.createdAt.slice(0, 10) === yesterday);

  const daySelect = (e) => {
    let item = parseInt(e.target.value);
    if (item === 1) {
      setSales(orders);
    } else if (item === 2) {
      setSales(todayOrders);
    } else if (item === 3) {
      setSales(yesterdayOrders);
    }
  };

  return (
    <div className="section2 ">
      <nav
        className="s2-navabar navbar navbar-expand-lg "
        style={{ backgroundColor: "white" }}
      >
        <div className="container-fluid px-5">
          <button
            onClick={() => toggle()}
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
            Home
          </NavLink>
          <button
            className="btn btn-outline-success btnround"
            type="submit"
          ></button>
        </div>
        <hr />
      </nav>
      <div className="d-flex justify-content-between align-items-center px-2 py-1">
        <div
          className="d-flex justify-content-between px-5 pt-2"
          style={{ width: "24rem" }}
        >
          <p>Overview</p>
          <p>View all</p>
        </div>
        <div>
          <div className="d-flex px-4 ">
            <div className="p2-selection mx-2">
              <select
                // selected={saleDate}
                className="form-select "
                aria-label="Default select example"
                onChange={daySelect}
              >
                <option value="1">Lifetime</option>
                <option value="2">Today</option>
                <option value="3">Yesterday</option>
              </select>
            </div>
          </div>
        </div>
      </div>{" "}
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div
            className="container-lg d-flex justify-content-between px-5 py-2"
            style={{ width: "100%" }}
          >
            <table
              className="table table-borderless me-5"
              style={{
                width: "29rem",
                height: "14rem",
                borderRadius: ".5rem",
                backgroundColor: "white",
              }}
            >
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">TOP NURSERIES</th>
                  <th scope="col">SALES</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {top5Nuseries &&
                    top5Nuseries.map((nursery, index) => (
                      <>
                        <th scope="row" key={index}>{index + 1}.</th>
                        <td>{nursery.name}</td>
                        <td>60,000</td>
                      </>
                    ))}
                </tr>
              </tbody>
            </table>
            <div
              className="container-sm p-2"
              style={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: ".5rem",
                height: "14rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p style={{ fontWeight: 500 }}>TOTAL SALES</p>
                <h2 style={{ fontWeight: 700, fontSize: "2rem" }}>
                  Rs {Math.round(totalSales)}
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <p style={{ fontWeight: 500 }}>Orders</p>
                <h2 style={{ fontWeight: 700, fontSize: "2rem" }}>
                  {sales && sales.length}
                </h2>
              </div>
            </div>
          </div>
          <div className="container-lg d-flex flex-wrap justify-content-between px-5 py-2">
            <div className="container-md p-0" style={{ width: "60%" }}>
              <div className="d-flex justify-content-between align-items-center">
                <h4>Banners</h4>
                {/* <button type="file" className="btn btn py-0">
              + Add new
            </button> */}
                <form
                  action=""
                  className="createproductForm"
                  encType="multipart/form-data"
                  onSubmit={createBannerSubmitHandler}
                >
                  <div>
                    <input
                      className="d-none"
                      id="file"
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={bannerDataChange}
                    />
                    {avatar !=="" ? (
                      <Fragment>
                        <button type="submit">Save</button>
                        
                      </Fragment>
                    ) : (
                      <Fragment>
                        <label htmlFor="file" className="btn btn py-0">
                      + Add new
                    </label>
                      </Fragment>
                      
                    )}

                  </div>
                 
                </form>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: ".5rem",
                  overflow: "auto",
                }}
                className="container-sm d-flex w-100 justify-content-between py-2"
              >
                {avatarPreview ? (
                  <div
                    className="card mx-1"
                    style={{ width: "10rem", height: "5rem" }}
                  >
                    <img
                      src={avatarPreview}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                ) : (
                  ""
                )}

                {banners &&
                  banners?.map((banner, index) => (
                    <div key={index}>
                      <MdDelete
                        style={{
                          color: "#dc3545",
                          cursor: "pointer",
                        }}
                        onClick={() => bannerDeleteHandler(banner._id)}
                      />
                      <div
                        className="card mx-1"
                        style={{
                          width: "10rem",
                          height: "5rem",
                          overflow: "hidden",
                          borderRadius: ".4rem",
                        }}
                      >
                        <img
                          style={{ borderRadius: ".4rem" }}
                          src={banner.url}
                          className="bg-primary img-fluid rounded-start h-100"
                          alt="..."
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <div
                className="container-md px-0 py-2 mt-3"
                style={{ width: "100%" }}
              >
                <div className="d-flex justify-content-between align-items-center container-md p-0">
                  <h4>Notifications</h4>
                  <button type="button" className="btn btn py-0">
                    Push new notification
                  </button>
                </div>
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
                      <th scope="col">S.no</th>
                      <th scope="col">Title</th>
                      <th scope="col">Message</th>
                      <th scope="col">Sent to</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>MEGA OFFER</td>
                      <td className="text-wrap w-50">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit.
                      </td>
                      <td>Vendor</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>MEGA OFFER</td>
                      <td className="text-wrap w-50">
                        Lorem ipsum dolor, sit amet.
                      </td>
                      <td>Clients</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>MEGA OFFER</td>
                      <td className="text-wrap w-50">
                        Lorem ipsum dolor, sit amet.
                      </td>
                      <td>Clients</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>MEGA OFFER</td>
                      <td className="text-wrap w-50">
                        Lorem ipsum dolor, sit amet.
                      </td>
                      <td>Clients</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className="container d-flex flex-column justify-content-center px-2"
              style={{ width: "40%" }}
            >
              <div className="pt-1">
                <h4>Orders</h4>
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: ".5rem",
                  width: "100%",
                  height: "5.6rem",
                }}
                className="container-sm d-flex justify-content-between mt-1"
              >
                <p className="d-flex align-items-end">
                  {pendingOrders && pendingOrders.length} Pending orders
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: ".5rem",
                  width: "100%",
                  height: "5.6rem",
                }}
                className="container-sm d-flex justify-content-between mt-4"
              >
                <p className="d-flex align-items-end">
                  {pendingOrders && pendingOrders.length} Pending order worth Rs{" "}
                  {pendingOrdersWorth && pendingOrdersWorth}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: ".5rem",
                  width: "100%",
                  height: "5.6rem",
                }}
                className="container-sm d-flex justify-content-between mt-4"
              >
                <p className="d-flex align-items-end">
                  {ordersToShip && ordersToShip.length} order to ship
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: ".5rem",
                  width: "100%",
                  height: "5.6rem",
                }}
                className="container-sm d-flex justify-content-between mt-4"
              >
                <p className="d-flex align-items-end">
                  {pendingOrders && pendingOrders.length} Pending orders
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;