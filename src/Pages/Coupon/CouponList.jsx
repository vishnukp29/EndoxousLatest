import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrors,
  deleteCoupon,
  getAllCoupons,
} from "../../redux/actions/couponAction";
import { DELETE_COUPON_RESET } from "../../constants/couponConstants";
import DateFormatter from "../../utils/DateFormatter";
import Loader from "../../Components/SideBar/Loader/Loader";

const CouponList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, coupons, loading } = useSelector((state) => state.allCoupons);
  const {
    error: deleteError,
    isDeleted,
    message,
    loading:deleteLoading
  } = useSelector((state) => state.deleteCoupon);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success(message);
      dispatch({ type: DELETE_COUPON_RESET });
    }

    dispatch(getAllCoupons());
  }, [dispatch, error, navigate, deleteError, isDeleted, message]);

  const deleteHandler = (id) => {
    console.log(id, "========== id");
    dispatch(deleteCoupon(id));
  };

  const AddCouponHandler = () => {
    navigate("/coupon");
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
                Alll Coupons
              </NavLink>
              <button
                className="btn btn-outline-success btnround"
                type="submit"
              ></button>
            </div>
            <hr />
          </nav>

          <div className=" mt-4 mx-5">
            <button
              type="button"
              className="btn-page4 btn btn-success addNewNursery btn-md"
              onClick={AddCouponHandler}
            >
              + Add New Coupon
            </button>
          </div>

          <div className="s2-table px-5 m-3 ">
            <div className="s2-table py-4">
              {loading || deleteLoading ? ( 
                <Loader/>
              ):(
                <table className="table table-borderless table-sm ">
                <thead className="s2-table-nava">
                  <tr>
                    <th scope="col">Coupon Name</th>
                    <th scope="col">Coupon Code</th>
                    <th scope="col">Limit</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Expiration Date</th>
                    <th scope="col">Message</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider my-5">
                  {coupons &&
                    coupons.map((coupon, key) => (
                      <tr key={key}>
                        <th scope="row">{coupon?.couponName}</th>
                        <td>{coupon?.couponCode}</td>
                        <td>{coupon?.limit}</td>
                        <td>{coupon?.discount}</td>
                        <td>
                          <DateFormatter date={coupon?.expirationTime} />{" "}
                        </td>
                        <td>{coupon?.message}</td>
                        <td>
                          <button
                            class="btn btn-danger"
                            onClick={() => deleteHandler(coupon?._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponList;
